'use client'
import * as EG from '@/game/empress'
import Agent from './Agent'
import Person from './svg/Person'
import Hourglass from './svg/Hourglass'

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
                {agents.map((agent) => {
                    const state =
                        agent.id === selectedAgentId
                            ? 'selected'
                            : lockedAgentIds.includes(agent.id)
                              ? 'locked'
                              : 'default'
                    return (
                        <Agent
                            key={agent.id}
                            agent={agent}
                            state={state}
                            handleAgentClick={handleAgentClick}
                        />
                    )
                })}
            </div>
        ) : (
            <div className="fill-foreground absolute top-1/2 left-1/2 size-6 -translate-x-1/2 opacity-15">
                <Person />
            </div>
        )
    return (
        <div
            className="border-gold relative min-h-43 basis-full border-2 p-2 sm:w-xs sm:basis-[45%]"
            onClick={() => handleLocationClick('Influence')}
        >
            <div className="text-foreground text-center text-lg font-bold">
                Influence
            </div>
            <div className="text-foreground text-center text-xs">
                {'Assign to score points'}
            </div>
            {content}
            <div className="text-foreground absolute right-1 bottom-1 text-center text-xs">
                {'Score: ' + score}
            </div>
            <div className="absolute bottom-1 left-1/2 flex -translate-x-1/2 flex-row items-center gap-1 opacity-70">
                <div className="fill-gold size-2 -translate-y-0.5">
                    <Hourglass />
                </div>
                <div className="text-foreground w-37 text-xs">
                    {'- Agents here will be locked'}
                </div>
            </div>
        </div>
    )
}
