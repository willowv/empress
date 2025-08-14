'use client'
import { State, Turn, Agent } from '@/game/state'
import { Dispatch, SetStateAction, useState } from 'react'
import { AgentVisual } from './agentVisual'
import 'tailwindcss'

interface LocationsProps {
    readonly state: State
    readonly setPlannedTurn: Dispatch<SetStateAction<Turn>>
}

export function Locations({ state, setPlannedTurn }: LocationsProps) {
    const [selectedAgentId, setSelectedAgentId] = useState<number | null>(null)

    function handleAgentClick(id: number) {
        if (selectedAgentId === id)
            // clicking selected agent
            setSelectedAgentId(null)
        else setSelectedAgentId(id)
    }

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
        <div className="flex flex-col items-start gap-4 sm:flex-row">
            <div className="w-48">
                <div className="text-center text-lg font-bold">Court</div>
                <div className="mx-auto flex flex-wrap items-start">
                    {courtAgents.map((agent) =>
                        AgentVisual({
                            agent: agent,
                            isSelected: agent.id === selectedAgentId,
                            setSelected: handleAgentClick
                        })
                    )}
                </div>
            </div>
            <div className="w-48">
                <div className="text-center text-lg font-bold">Delay</div>
                <div className="mx-auto flex flex-wrap items-start">
                    {delayAgents.map((agent) =>
                        AgentVisual({
                            agent: agent,
                            isSelected: agent.id === selectedAgentId,
                            setSelected: handleAgentClick
                        })
                    )}
                </div>
            </div>
            <div className="w-48">
                <div className="text-center text-lg font-bold">Bribe</div>
                <div className="mx-auto flex flex-wrap items-start">
                    {bribeAgents.map((agent) =>
                        AgentVisual({
                            agent: agent,
                            isSelected: agent.id === selectedAgentId,
                            setSelected: handleAgentClick
                        })
                    )}
                </div>
            </div>
            <div className="w-48">
                <div className="text-center text-lg font-bold">Influence</div>
                <div className="mx-auto flex flex-wrap items-start">
                    {influenceAgents.map((agent) =>
                        AgentVisual({
                            agent: agent,
                            isSelected: agent.id === selectedAgentId,
                            setSelected: handleAgentClick
                        })
                    )}
                </div>
            </div>
        </div>
    )
}
