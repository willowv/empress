'use client'

import * as EG from '@/logic/empress'
import { createContext, useLayoutEffect, useState } from 'react'
import Court from '@/game/locations/Court'
import Bribe from '@/game/locations/Bribe'
import Delay from '@/game/locations/Delay'
import Influence from '@/game/locations/Influence'
import Button from '@/ui/Button'
import { dateOnlyString } from 'lib/util'
import Hourglass from '@/svg/Hourglass'
import EndScreen from './EndScreen'

interface GameProps {
    readonly date: Date
}

interface AnimationContextProps {
    readonly lastEndTurnAt: Date | undefined
}

export const AnimationContext = createContext<AnimationContextProps>({
    lastEndTurnAt: new Date(0)
})

export default function GameScreen({ date }: GameProps) {
    const [curSession, setSession] = useState<EG.Session>(() => {
        return { seed: dateOnlyString(date), turnHistory: [] }
    })
    const [plannedTurn, setPlannedTurn] = useState<EG.Turn>(EG.getEmptyTurn())
    const [selectedAgentId, setSelectedAgentId] = useState<number | undefined>(
        undefined
    )
    const [lastEndTurnAt, setLastEndTurnAt] = useState<Date>(new Date(0))

    useLayoutEffect(() => {
        // For updating animation context
        setLastEndTurnAt(new Date())
    }, [curSession])

    const curState = EG.getCurrentState(curSession)
    const isFirstTurn = curSession.turnHistory.length == 0
    const isGameOver = EG.hasGameEnded(isFirstTurn, curState)

    if (isGameOver) {
        return <EndScreen session={curSession} date={date} />
    }

    const plannedState = EG.applyTurn(curState, plannedTurn)
    const isPlannedTurnValid = EG.isTurnValid(curState, plannedTurn)

    // Which agents are locked?
    // Agents previously assigned to non-Court locations
    const lockedAgentIds = curState.agents
        .filter((agent) => agent.location !== 'Court' || isGameOver)
        .map((agent) => agent.id)

    const numAssignments = EG.numNonBribeAssignments(curState, plannedTurn)

    function handleAgentClick(id: number) {
        if (lockedAgentIds.includes(id)) return

        if (selectedAgentId === id)
            // clicking selected agent
            setSelectedAgentId(undefined)
        else setSelectedAgentId(id)
    }

    function handleLocationClick(location: EG.Location) {
        if (
            selectedAgentId != undefined &&
            plannedState.agents[selectedAgentId].location != location
        ) {
            setSelectedAgentId(undefined)
            setPlannedTurn(
                EG.updateTurnWithMove(plannedTurn, {
                    agentId: selectedAgentId,
                    location
                })
            )
        }
    }

    function handleEndTurn() {
        setSession(EG.appendTurn(curSession, plannedTurn))
        setPlannedTurn(EG.getEmptyTurn)
    }

    function handleResetTurn() {
        setPlannedTurn(EG.getEmptyTurn)
    }

    const prevDelayAgent = plannedState.agents.find(
        (agent) =>
            agent.location == 'Delay' && lockedAgentIds.includes(agent.id)
    )
    const nextDelayAgent = plannedState.agents.find(
        (agent) =>
            agent.location == 'Delay' && !lockedAgentIds.includes(agent.id)
    )
    const bribeAgent = plannedState.agents.find(
        (agent) => agent.location == 'Bribe'
    )
    const courtAgents = plannedState.agents.filter(
        (agent) => agent.location === 'Court'
    )
    const influenceAgents = plannedState.agents.filter(
        (agent) => agent.location === 'Influence'
    )

    return (
        <AnimationContext value={{ lastEndTurnAt }}>
            <div className="select-none">
                <div className="flex flex-row flex-wrap justify-between gap-2 sm:h-[91vh] sm:flex-col sm:content-center sm:justify-center">
                    <Court
                        selectedAgentId={selectedAgentId}
                        agents={courtAgents}
                        handleAgentClick={handleAgentClick}
                        handleLocationClick={handleLocationClick}
                        lockedAgentIds={lockedAgentIds}
                    />
                    <Influence
                        selectedAgentId={selectedAgentId}
                        agents={influenceAgents}
                        handleAgentClick={handleAgentClick}
                        handleLocationClick={handleLocationClick}
                        lockedAgentIds={lockedAgentIds}
                    />
                    <Delay
                        lockedAgent={prevDelayAgent}
                        agent={nextDelayAgent}
                        isAgentSelected={
                            (nextDelayAgent?.id ?? -1) === selectedAgentId
                        }
                        handleAgentClick={handleAgentClick}
                        handleLocationClick={handleLocationClick}
                    />
                    <Bribe
                        agent={bribeAgent}
                        isAgentSelected={
                            (bribeAgent?.id ?? -1) === selectedAgentId
                        }
                        numAssignments={numAssignments}
                        handleAgentClick={handleAgentClick}
                        handleLocationClick={handleLocationClick}
                    />
                    <div className="flex basis-[100%] flex-row justify-between gap-2 sm:min-w-54 sm:basis-[10%]">
                        <Button
                            handleButtonPress={handleResetTurn}
                            isDisabled={false}
                        >
                            {'Reset Turn'}
                        </Button>
                        <Button
                            isDisabled={!isPlannedTurnValid}
                            handleButtonPress={handleEndTurn}
                        >
                            <div className="flex flex-row items-center gap-1">
                                <div>{'End Turn ('}</div>
                                <div className="fill-gold size-2 -translate-y-1">
                                    <Hourglass />
                                </div>
                                <div>{')'}</div>
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
        </AnimationContext>
    )
}
