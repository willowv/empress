'use client'
import { State, Turn, Agent } from '@/game/state'
import { Dispatch, SetStateAction } from 'react'
import { AgentVisual } from './agentVisual'

interface LocationsProps {
    readonly state: State
    readonly setPlannedTurn: Dispatch<SetStateAction<Turn>>
}

export function Locations({ state, setPlannedTurn }: LocationsProps) {
    // Get Agent Locations
    const agents: Agent[] = state.agents ?? []
    const courtAgents: Agent[] = agents.filter(
        (agent) => agent.location === 'Court'
    )
    const delayAgents: Agent[] = agents.filter(
        (agent) => agent.location === 'Delay'
    )
    const bribeAgents: Agent[] = agents.filter(
        (agent) => agent.location === 'Bribe'
    )
    const influenceAgents: Agent[] = agents.filter(
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
