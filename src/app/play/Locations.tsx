'use client'
import { State, Agent, Move } from '@/game/state'
import { useState } from 'react'
import { AgentVisual } from './agentVisual'
import 'tailwindcss'

interface LocationsProps {
    readonly state: State
    readonly handleLocationClick: (move: Move) => void
    readonly lockedAgentIds: number[]
}

export function Locations({
    state,
    handleLocationClick,
    lockedAgentIds: lockedAgentIds
}: LocationsProps) {
    const [selectedAgentId, setSelectedAgentId] = useState<number | null>(null)
    const agents: Agent[] = state.agents ?? []
    function handleAgentClick(id: number) {
        if (selectedAgentId === id)
            // clicking selected agent
            setSelectedAgentId(null)
        else setSelectedAgentId(id)
    }

    // Get Agent Locations
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
            <div
                className="min-h-32 w-50 border-2 border-amber-400"
                onClick={() => {
                    if (
                        selectedAgentId != null &&
                        agents[selectedAgentId].location != 'Court'
                    ) {
                        setSelectedAgentId(null)
                        handleLocationClick({
                            agentId: selectedAgentId,
                            location: 'Court'
                        })
                    }
                }}
            >
                <div className="text-center text-lg font-bold">Court</div>
                <div className="mx-auto flex flex-wrap items-start">
                    {courtAgents.map((agent) =>
                        AgentVisual({
                            agent: agent,
                            isSelected: agent.id === selectedAgentId,
                            isLocked: lockedAgentIds.includes(agent.id),
                            setSelected: handleAgentClick
                        })
                    )}
                </div>
            </div>
            <div
                className="min-h-32 w-50 border-2 border-amber-400"
                onClick={() => {
                    if (
                        selectedAgentId != null &&
                        agents[selectedAgentId].location != 'Delay'
                    ) {
                        setSelectedAgentId(null)
                        handleLocationClick({
                            agentId: selectedAgentId,
                            location: 'Delay'
                        })
                    }
                }}
            >
                <div className="text-center text-lg font-bold">Delay</div>
                <div className="mx-auto flex flex-wrap items-start">
                    {delayAgents.map((agent) =>
                        AgentVisual({
                            agent: agent,
                            isSelected: agent.id === selectedAgentId,
                            isLocked: lockedAgentIds.includes(agent.id),
                            setSelected: handleAgentClick
                        })
                    )}
                </div>
            </div>
            <div
                className="min-h-32 w-50 border-2 border-amber-400"
                onClick={() => {
                    if (
                        selectedAgentId != null &&
                        agents[selectedAgentId].location != 'Bribe'
                    ) {
                        setSelectedAgentId(null)
                        handleLocationClick({
                            agentId: selectedAgentId,
                            location: 'Bribe'
                        })
                    }
                }}
            >
                <div className="text-center text-lg font-bold">Bribe</div>
                <div className="mx-auto flex flex-wrap items-start">
                    {bribeAgents.map((agent) =>
                        AgentVisual({
                            agent: agent,
                            isSelected: agent.id === selectedAgentId,
                            isLocked: lockedAgentIds.includes(agent.id),
                            setSelected: handleAgentClick
                        })
                    )}
                </div>
            </div>
            <div
                className="min-h-32 w-50 border-2 border-amber-400"
                onClick={() => {
                    if (
                        selectedAgentId != null &&
                        agents[selectedAgentId].location != 'Influence'
                    ) {
                        setSelectedAgentId(null)
                        handleLocationClick({
                            agentId: selectedAgentId,
                            location: 'Influence'
                        })
                    }
                }}
            >
                <div className="text-center text-lg font-bold">Influence</div>
                <div className="mx-auto flex flex-wrap items-start">
                    {influenceAgents.map((agent) =>
                        AgentVisual({
                            agent: agent,
                            isSelected: agent.id === selectedAgentId,
                            isLocked: lockedAgentIds.includes(agent.id),
                            setSelected: handleAgentClick
                        })
                    )}
                </div>
            </div>
        </div>
    )
}
