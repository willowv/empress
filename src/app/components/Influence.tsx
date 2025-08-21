'use client'
import * as EG from '@/game/empress'
import Agent from './Agent'

interface InfluenceProps {
    readonly selectedAgentId: number | null
    readonly agents: EG.Agent[]
    readonly handleLocationClick: (location: EG.Location) => void
    readonly handleAgentClick: (id: number) => void
    readonly lockedAgentIds: number[]
}

export default function Influence({
    selectedAgentId,
    agents,
    handleLocationClick,
    handleAgentClick,
    lockedAgentIds
}: InfluenceProps) {
    const agentsHere: EG.Agent[] = agents.filter(
        (agent) => agent.location === 'Influence'
    )
    const score = EG.getScore({ agents: agentsHere })
    return (
        <div
            className="basis-full border-2 border-amber-400 p-2 sm:w-xs sm:basis-[45%]"
            onClick={() => handleLocationClick('Influence')}
        >
            <div className="text-foreground text-center text-lg font-bold">
                Influence
            </div>
            <div className="text-foreground text-center text-xs">
                {'Assign to score points'}
            </div>
            <div className="flex flex-row flex-wrap justify-center gap-1 p-1">
                {agentsHere.map((agent) =>
                    Agent({
                        agent: agent,
                        isSelected: agent.id === selectedAgentId,
                        isLocked: lockedAgentIds.includes(agent.id),
                        isInvalid: false,
                        isValid: false,
                        setSelected: handleAgentClick
                    })
                )}
            </div>
            <div className="text-foreground text-center text-xs">
                {'Score: ' + score}
            </div>
        </div>
    )
}
