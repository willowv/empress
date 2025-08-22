'use client'
import * as EG from '@/game/empress'
import Agent from './Agent'
import Person from './svg/Person'

interface InfluenceProps {
    readonly selectedAgentId: number | undefined
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
    const score = EG.getScore({ agents })
    const content =
        agents.length > 0 ? (
            <div className="flex flex-row flex-wrap justify-center gap-1 p-1">
                {agents.map((agent) =>
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
        ) : (
            <div className="fill-foreground absolute top-1/2 left-1/2 size-6 -translate-x-1/2 opacity-15">
                <Person />
            </div>
        )
    return (
        <div
            className="border-gold relative basis-full border-2 p-2 sm:w-xs sm:basis-[45%]"
            onClick={() => handleLocationClick('Influence')}
        >
            <div className="text-foreground text-center text-lg font-bold">
                Influence
            </div>
            <div className="text-foreground text-center text-xs">
                {'Assign to score points'}
            </div>
            {content}
            <div className="text-foreground absolute bottom-1 text-center text-xs">
                {'Score: ' + score}
            </div>
        </div>
    )
}
