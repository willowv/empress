'use client'

import * as EG from '@/game/empress'
import { useState } from 'react'
import Button from './Button'
import Court from './Court'
import Bribe from './Bribe'
import Delay from './Delay'
import Influence from './Influence'

interface GameProps {
    readonly date: Date
}

export default function Game({ date }: GameProps) {
    const [curSession, setSession] = useState<EG.Session>(() => {
        return { seed: date.toUTCString(), turnHistory: [] }
    })
    const [plannedTurn, setPlannedTurn] = useState<EG.Turn>(EG.getEmptyTurn())
    const [selectedAgentId, setSelectedAgentId] = useState<number | null>(null)

    const curState = EG.getCurrentState(curSession)
    const isGameOver = EG.hasGameEnded(
        curSession.turnHistory.length == 0,
        curState
    )
    const plannedState = EG.applyTurn(curState, plannedTurn)
    const isPlannedTurnGameEnd = EG.hasGameEnded(false, plannedState)

    // Which agents are locked?
    // Agents previously assigned to non-Court locations
    const lockedAgentIds = curState.agents
        .filter((agent) => agent.location !== 'Court' || isGameOver)
        .map((agent) => agent.id)

    const numAssignments = EG.numNonBribeAssignments(curState, plannedTurn)

    function handleAgentClick(id: number) {
        if (selectedAgentId === id)
            // clicking selected agent
            setSelectedAgentId(null)
        else setSelectedAgentId(id)
    }

    function handleLocationClick(location: EG.Location) {
        if (
            selectedAgentId != null &&
            plannedState.agents[selectedAgentId].location != location
        ) {
            setSelectedAgentId(null)
            setPlannedTurn(
                EG.updateTurnWithMove(plannedTurn, {
                    agentId: selectedAgentId,
                    location
                })
            )
        }
    }

    const prevDelayAgent =
        plannedState.agents.find(
            (agent) =>
                agent.location == 'Delay' && lockedAgentIds.includes(agent.id)
        ) ?? null
    const nextDelayAgent =
        plannedState.agents.find(
            (agent) =>
                agent.location == 'Delay' && !lockedAgentIds.includes(agent.id)
        ) ?? null

    const bribeAgent =
        plannedState.agents.find((agent) => agent.location == 'Bribe') ?? null

    function Footer() {
        // If the game is over, show end state
        if (isGameOver) {
            return (
                <div className="flex basis-[100%] flex-row justify-between gap-2 sm:w-54 sm:basis-[10%]">
                    <div className="text-foreground flex h-8 items-center justify-center rounded-xl px-4 text-sm font-medium">
                        Game Over
                    </div>
                    <Button
                        text="Play Again"
                        isDisabled={false}
                        handleButtonPress={() => {
                            setSession({
                                seed: date.toUTCString(),
                                turnHistory: []
                            })
                        }}
                    />
                </div>
            )
        } else {
            return (
                <div className="flex basis-[100%] flex-row justify-between gap-2 sm:w-54 sm:basis-[10%]">
                    <Button
                        handleButtonPress={() =>
                            setPlannedTurn(EG.getEmptyTurn)
                        }
                        text="Reset Turn"
                        isDisabled={false}
                    />
                    <Button
                        isDisabled={!EG.isTurnValid(curState, plannedTurn)}
                        handleButtonPress={() => {
                            setSession(EG.appendTurn(curSession, plannedTurn))
                            setPlannedTurn(EG.getEmptyTurn)
                        }}
                        text={isPlannedTurnGameEnd ? 'End Game' : 'End Turn'}
                    />
                </div>
            )
        }
    }

    return (
        <div className="select-none">
            <div className="flex flex-row flex-wrap justify-between gap-2 sm:h-[91vh] sm:flex-col sm:content-center sm:justify-center">
                <Court
                    selectedAgentId={selectedAgentId}
                    agents={plannedState.agents}
                    handleAgentClick={handleAgentClick}
                    handleLocationClick={handleLocationClick}
                    lockedAgentIds={lockedAgentIds}
                />
                <Influence
                    selectedAgentId={selectedAgentId}
                    agents={plannedState.agents}
                    handleAgentClick={handleAgentClick}
                    handleLocationClick={handleLocationClick}
                    lockedAgentIds={lockedAgentIds}
                />
                <Delay
                    prevAgent={prevDelayAgent}
                    nextAgent={nextDelayAgent}
                    selectedAgentId={selectedAgentId}
                    handleAgentClick={handleAgentClick}
                    handleLocationClick={handleLocationClick}
                />
                <Bribe
                    agent={bribeAgent}
                    selectedAgentId={selectedAgentId}
                    numAssignments={numAssignments}
                    handleAgentClick={handleAgentClick}
                    handleLocationClick={handleLocationClick}
                />
                {Footer()}
            </div>
        </div>
    )
}
