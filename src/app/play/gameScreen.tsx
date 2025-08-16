'use client'

import { Session, appendTurn, getCurrentState } from '@/game/session'
import {
    updateTurnWithMove,
    applyTurn,
    getEmptyTurn,
    getScore,
    isTurnValid,
    Move,
    Turn,
    hasGameEnded
} from '@/game/state'
import { useState } from 'react'
import { Locations } from './Locations'

export interface GameScreenProps {
    readonly date: Date
}

export function GameScreen({ date }: GameScreenProps) {
    // TODO: Consider if session state should be at the level above this, since EndScreen will need it as well.
    const [curSession, setSession] = useState<Session>(() => {
        return { seed: date.toUTCString(), turnHistory: [] }
    })
    const [plannedTurn, setPlannedTurn] = useState<Turn>(getEmptyTurn())

    const curState = getCurrentState(curSession)

    // If the game is over, show end state
    if (hasGameEnded(curSession.turnHistory.length == 0, curState)) {
        return (
            <div className="flex flex-col items-center gap-4">
                <p>Final Score: {getScore(curState)}</p>
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
            </div>
        )
    }

    // We want to visualize the player's planned turn
    const plannedState = applyTurn(curState, plannedTurn)

    // Get current score (not accounting for planned turn)
    const curScore = getScore(curState)
    // Let's grab this so we can show the player how much their score will increase with this move
    const plannedScoreIncrease: number = getScore(plannedState) - curScore

    // Which agents are locked?
    // Agents previously assigned to non-Court locations
    const lockedAgentIds = curState.agents
        .filter((agent) => agent.location !== 'Court')
        .map((agent) => agent.id)

    function handleLocationClick(move: Move) {
        setPlannedTurn(updateTurnWithMove(plannedTurn, move))
    }

    return (
        <div className="select-none">
            <p>Today&apos;s Date: {date.toLocaleDateString()}</p>
            <Locations
                state={plannedState}
                handleLocationClick={handleLocationClick}
                lockedAgentIds={lockedAgentIds}
            />
            <div className="flex flex-col items-center gap-4">
                <p>
                    Current Score: {curScore} + {plannedScoreIncrease}
                </p>
                <button
                    className="bg-foreground text-background flex h-10 items-center justify-center gap-2 rounded-full border border-solid border-transparent px-4 text-sm font-medium transition-colors hover:bg-[#383838] disabled:bg-red-400 disabled:hover:bg-red-400 sm:h-12 sm:w-auto sm:px-5 sm:text-base dark:hover:bg-[#ccc]"
                    disabled={!isTurnValid(curState, plannedTurn)}
                    onClick={() => {
                        setSession(appendTurn(curSession, plannedTurn))
                        setPlannedTurn(getEmptyTurn)
                    }}
                >
                    End Turn
                </button>
                <button
                    className="bg-foreground text-background flex h-10 items-center justify-center gap-2 rounded-full border border-solid border-transparent px-4 text-sm font-medium transition-colors hover:bg-[#383838] sm:h-12 sm:w-auto sm:px-5 sm:text-base dark:hover:bg-[#ccc]"
                    onClick={() => {
                        setPlannedTurn(getEmptyTurn)
                    }}
                >
                    Reset Turn
                </button>
            </div>
        </div>
    )
}
