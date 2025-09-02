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
import { useNextStep } from 'nextstepjs'

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
    const { startNextStep } = useNextStep()
    const [curSession, setSession] = useState<EG.Session>(() => {
        return { date: date, seed: dateOnlyString(date), turnHistory: [] }
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
        else if (selectedAgentId === undefined) setSelectedAgentId(id)
        // Tapping another assigned agent should swap them
        else {
            const selectedAgent = plannedState.agents[selectedAgentId]
            const targetAgent = plannedState.agents[id]
            const move1 = {
                agentId: selectedAgentId,
                location: targetAgent.location
            }
            const move2 = {
                agentId: targetAgent.id,
                location: selectedAgent.location
            }
            const updatedTurn = EG.updateTurnWithMove(
                EG.updateTurnWithMove(plannedTurn, move1),
                move2
            )
            setSelectedAgentId(undefined)
            setPlannedTurn(updatedTurn)
        }
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
            <div className="flex flex-col justify-between gap-0.5 sm:gap-2">
                <div className="flex flex-col justify-between gap-0.5 sm:flex-row sm:gap-2">
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
                </div>
                <div className="flex flex-row gap-0.5 sm:gap-2">
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
                </div>
                <div className="flex flex-row justify-between">
                    <Button
                        id="button-reset-turn"
                        handleButtonPress={handleResetTurn}
                    >
                        {'Reset Turn'}
                    </Button>
                    <Button
                        handleButtonPress={() => startNextStep('game-tutorial')}
                    >
                        {'How to Play'}
                    </Button>
                    <Button
                        id="button-end-turn"
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
        </AnimationContext>
    )
}
