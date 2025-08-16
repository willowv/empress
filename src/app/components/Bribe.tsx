'use client'
import * as EG from '@/game/empress'
import Agent from './Agent'

interface BribeProps {
    readonly selectedAgentId: number | null
    readonly agents: EG.Agent[]
    readonly setSelectedAgentId: (agentId: number | null) => void
    readonly handleLocationClick: (move: EG.Move) => void
    readonly handleAgentClick: (id: number) => void
    readonly lockedAgentIds: number[]
}

export default function Bribe({
    selectedAgentId,
    agents,
    setSelectedAgentId,
    handleLocationClick,
    handleAgentClick,
    lockedAgentIds
}: BribeProps) {
    const agentsHere: EG.Agent[] = agents.filter(
        (agent) => agent.location === 'Bribe'
    )
    return (
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
