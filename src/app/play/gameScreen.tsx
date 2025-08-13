'use client'

import { Session, appendTurn, getCurrentState } from '@/game/session'
import {
    Agent,
    applyTurn,
    getEmptyTurn,
    getScore,
    isTurnValid,
    Turn,
    State
} from '@/game/state'
import { Dispatch, SetStateAction, useState } from 'react'

export interface GameScreenProps {
    readonly date: Date
}

export function GameScreen({ date }: GameScreenProps) {
    // TODO: Consider if session state should be at the level above this, since EndScreen will need it as well.
    const [curSession, setSession] = useState<Session>(() => {
        return { seed: date.toUTCString(), turnHistory: [] }
    })
    const [plannedTurn, setPlannedTurn] = useState<Turn>(getEmptyTurn())

    // We want to visualize the player's planned turn
    const curState = getCurrentState(curSession)
    const plannedState = applyTurn(curState, plannedTurn)

    // Get current score (not accounting for planned turn)
    const curScore = getScore(curState)
    // Let's grab this so we can show the player how much their score will increase with this move
    const plannedScoreIncrease: number = getScore(plannedState) - curScore

    return (
        <div>
            <p>Today&apos;s Date: {date.toLocaleDateString()}</p>
            <Locations state={plannedState} setPlannedTurn={setPlannedTurn} />
            <div className="flex flex-col items-center gap-4">
                <p>
                    Current Score: {curScore} + {plannedScoreIncrease}
                </p>
                <button
                    className="bg-foreground text-background flex h-10 items-center justify-center gap-2 rounded-full border border-solid border-transparent px-4 text-sm font-medium transition-colors hover:bg-[#383838] sm:h-12 sm:w-auto sm:px-5 sm:text-base dark:hover:bg-[#ccc]"
                    disabled={!isTurnValid(curState, plannedTurn)}
                    onClick={() => {
                        setSession(appendTurn(curSession, plannedTurn))
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

interface LocationsProps {
    readonly state: State
    readonly setPlannedTurn: Dispatch<SetStateAction<Turn>>
}

function Locations({ state, setPlannedTurn }: LocationsProps) {
    // Get Agent Locations
    const courtAgents: Agent[] = state.agents.filter(
        (agent) => agent.location === 'Court'
    )
    const delayAgents: Agent[] = state.agents.filter(
        (agent) => agent.location === 'Delay'
    )
    const bribeAgents: Agent[] = state.agents.filter(
        (agent) => agent.location === 'Bribe'
    )
    const influenceAgents: Agent[] = state.agents.filter(
        (agent) => agent.location === 'Influence'
    )
    return (
        <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div>
                <div>Court</div>
                {courtAgents.map((agent) => AgentVisual(agent))}
            </div>
            <div>
                <div>Delay</div>
                {delayAgents.map((agent) => AgentVisual(agent))}
            </div>
            <div>
                <div>Bribe</div>
                {bribeAgents.map((agent) => AgentVisual(agent))}
            </div>
            <div>
                <div>Influence</div>
                {influenceAgents.map((agent) => AgentVisual(agent))}
            </div>
        </div>
    )
}

function AgentVisual(agent: Agent) {
    // TODO: Make this prettier for the interaction stage
    return (
        <div key={agent.id}>
            <div>Agent {agent.id}</div>
            <div>
                {agent.curValue} / {agent.maxValue}
            </div>
        </div>
    )
}
