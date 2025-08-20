'use client'

import * as EG from '@/game/empress'
import { useState } from 'react'
import Locations from './Locations'

interface GameProps {
    readonly date: Date
}

export default function Game({ date }: GameProps) {
    // TODO: Consider if session state should be at the level above this, since EndScreen will need it as well.
    const [curSession, setSession] = useState<EG.Session>(() => {
        return { seed: date.toUTCString(), turnHistory: [] }
    })
    const [plannedTurn, setPlannedTurn] = useState<EG.Turn>(EG.getEmptyTurn())

    const curState = EG.getCurrentState(curSession)
    const isGameOver = EG.hasGameEnded(
        curSession.turnHistory.length == 0,
        curState
    )

    function Footer() {
        // If the game is over, show end state
        if (isGameOver) {
            return (
                <div className="flex flex-col items-center gap-4">
                    <p>Final Score: {EG.getScore(curState)}</p>
                    <button
                        className="bg-foreground text-background flex h-10 items-center justify-center gap-2 rounded-full border border-solid border-transparent px-4 text-sm font-medium transition-colors hover:bg-[#383838] sm:h-12 sm:w-auto sm:px-5 sm:text-base dark:hover:bg-[#ccc]"
                        onClick={() => {
                            setSession({
                                seed: date.toUTCString(),
                                turnHistory: []
                            })
                        }}
                    >
                        Play Again
                    </button>
                    <p>{date.toLocaleDateString()}</p>
                </div>
            )
        } else {
            return (
                <div className="m-2 flex flex-row justify-around gap-4">
                    <button
                        className="bg-foreground text-background flex h-10 items-center justify-center gap-2 rounded-full border border-solid border-transparent px-4 text-sm font-medium transition-colors hover:bg-[#383838] disabled:bg-red-400 disabled:hover:bg-red-400 sm:h-12 sm:w-auto sm:px-5 sm:text-base dark:hover:bg-[#ccc]"
                        disabled={!EG.isTurnValid(curState, plannedTurn)}
                        onClick={() => {
                            setSession(EG.appendTurn(curSession, plannedTurn))
                            setPlannedTurn(EG.getEmptyTurn)
                        }}
                    >
                        {EG.hasGameEnded(false, plannedState)
                            ? 'End Game'
                            : 'End Turn'}
                    </button>
                    <button
                        className="bg-foreground text-background flex h-10 items-center justify-center gap-2 rounded-full border border-solid border-transparent px-4 text-sm font-medium transition-colors hover:bg-[#383838] sm:h-12 sm:w-auto sm:px-5 sm:text-base dark:hover:bg-[#ccc]"
                        onClick={() => {
                            setPlannedTurn(EG.getEmptyTurn)
                        }}
                    >
                        Reset Turn
                    </button>
                </div>
            )
        }
    }

    // We want to visualize the player's planned turn
    const plannedState = EG.applyTurn(curState, plannedTurn)

    // Get current score (not accounting for planned turn)
    const curScore = EG.getScore(curState)
    // Let's grab this so we can show the player how much their score will increase with this move
    const plannedScoreIncrease: number = EG.getScore(plannedState) - curScore

    // Which agents are locked?
    // Agents previously assigned to non-Court locations
    const lockedAgentIds = curState.agents
        .filter((agent) => agent.location !== 'Court' || isGameOver)
        .map((agent) => agent.id)

    const numAssignments = EG.numNonBribeAssignments(curState, plannedTurn)

    function handleNewMove(move: EG.Move) {
        setPlannedTurn(EG.updateTurnWithMove(plannedTurn, move))
    }

    return (
        <div className="select-none">
            <Locations
                state={plannedState}
                handleNewMove={handleNewMove}
                lockedAgentIds={lockedAgentIds}
                numAssignments={numAssignments}
            />
            {Footer()}
        </div>
    )
}
