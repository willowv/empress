'use client'
import * as EG from '@/game/empress'
import Agent from './Agent'

interface CourtProps {
    readonly selectedAgentId: number | null
    readonly agents: EG.Agent[]
    readonly handleLocationClick: (location: EG.Location) => void
    readonly handleAgentClick: (id: number) => void
    readonly lockedAgentIds: number[]
}

export default function Court({
    selectedAgentId,
    agents,
    handleLocationClick,
    handleAgentClick,
    lockedAgentIds
}: CourtProps) {
    const agentsHere: EG.Agent[] = agents.filter(
        (agent) => agent.location === 'Court'
    )
    return (
        <div
            className="basis-full border-2 border-amber-400 p-2 sm:w-xs sm:basis-[45%]"
            onClick={() => handleLocationClick('Court')}
        >
            <div className="text-foreground text-center text-lg font-bold">
                Court
            </div>
            <div className="text-foreground text-center text-xs">
                {'Unassigned agents'}
            </div>
            <div className="flex flex-row flex-wrap justify-center gap-1 p-1">
                {agentsHere.map((agent) =>
                    Agent({
                        agent: agent,
                        state:
                            agent.id === selectedAgentId
                                ? 'selected'
                                : lockedAgentIds.includes(agent.id)
                                  ? 'locked'
                                  : 'default',
                        handleAgentClick: handleAgentClick
                    })
                )}
            </div>
        </div>
    )
}
