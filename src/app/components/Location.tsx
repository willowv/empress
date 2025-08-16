'use client'
import * as EG from '@/game/empress'
import Agent from './Agent'

interface LocationProps {
    readonly location: EG.Location
    readonly selectedAgentId: number | null
    readonly agents: EG.Agent[]
    readonly handleLocationClick: (location: EG.Location) => void
    readonly handleAgentClick: (id: number) => void
    readonly lockedAgentIds: number[]
}

export default function Location({
    location,
    selectedAgentId,
    agents,
    handleLocationClick,
    handleAgentClick,
    lockedAgentIds
}: LocationProps) {
    const agentsHere: EG.Agent[] = agents.filter(
        (agent) => agent.location === location
    )
    return (
        <div
            className="min-h-32 w-50 border-2 border-amber-400"
            onClick={() => handleLocationClick(location)}
        >
            <div className="text-center text-lg font-bold">{location}</div>
            <div className="mx-auto flex flex-wrap items-start">
                {agentsHere.map((agent) =>
                    Agent({
                        agent: agent,
                        isSelected: agent.id === selectedAgentId,
                        isLocked: lockedAgentIds.includes(agent.id),
                        setSelected: handleAgentClick
                    })
                )}
            </div>
        </div>
    )
}
