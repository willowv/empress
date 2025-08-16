'use client'
import * as EG from '@/game/empress'
import Agent from './Agent'

interface DelayProps {
    readonly selectedAgentId: number | null
    readonly agents: EG.Agent[]
    readonly setSelectedAgentId: (agentId: number | null) => void
    readonly handleLocationClick: (move: EG.Move) => void
    readonly handleAgentClick: (id: number) => void
    readonly lockedAgentIds: number[]
}

export default function Delay({
    selectedAgentId,
    agents,
    setSelectedAgentId,
    handleLocationClick,
    handleAgentClick,
    lockedAgentIds
}: DelayProps) {
    const agentsHere: EG.Agent[] = agents.filter(
        (agent) => agent.location === 'Delay'
    )
    return (
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
