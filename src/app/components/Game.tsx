'use client'

import * as EG from '@/game/empress'
import { createContext, useLayoutEffect, useState } from 'react'
import Court from './locations/Court'
import Bribe from './locations/Bribe'
import Delay from './locations/Delay'
import Influence from './locations/Influence'
import Footer from './Footer'

interface GameProps {
    readonly date: Date
}

interface AnimationContextProps {
    readonly lastEndTurnAt: Date | undefined
}

export const AnimationContext = createContext<AnimationContextProps>({
    lastEndTurnAt: new Date(0)
})

export default function Game({ date }: GameProps) {
    const [curSession, setSession] = useState<EG.Session>(() => {
        return { seed: date.toUTCString(), turnHistory: [] }
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
    const plannedState = EG.applyTurn(curState, plannedTurn)
    const isPlannedTurnValid = EG.isTurnValid(curState, plannedTurn)
    let isPlannedTurnGameEnd = false
    if (isPlannedTurnValid) {
        const nextTurnState = EG.getCurrentState(
            EG.appendTurn(curSession, plannedTurn)
        )
        isPlannedTurnGameEnd = EG.hasGameEnded(false, nextTurnState)
    }
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

    function handlePlayAgain() {
        setSession({ seed: date.toUTCString(), turnHistory: [] })
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
                    <Footer
                        isGameOver={isGameOver}
                        isPlannedTurnValid={isPlannedTurnValid}
                        isPlannedTurnGameEnd={isPlannedTurnGameEnd}
                        handlePlayAgain={handlePlayAgain}
                        handleResetTurn={handleResetTurn}
                        handleEndTurn={handleEndTurn}
                    />
                </div>
            </div>
        </AnimationContext>
    )
}
