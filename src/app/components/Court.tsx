'use client'
import * as EG from '@/game/empress'
import Agent from './Agent'
import Hourglass from './svg/Hourglass'

interface CourtProps {
    readonly selectedAgentId: number | undefined
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
    return (
        <div
            className="border-gold relative min-h-43 basis-full border-2 p-2 pb-7 sm:w-xs sm:basis-[45%]"
            onClick={() => handleLocationClick('Court')}
        >
            <div className="text-foreground text-center text-lg font-bold">
                Court
            </div>
            <div className="text-foreground text-center text-xs">
                {'Unassigned agents'}
            </div>
            <div className="flex flex-row flex-wrap justify-center gap-1 p-1">
                {agents.map((agent, index) =>
                    Agent({
                        agent: agent,
                        state:
                            agent.id === selectedAgentId
                                ? 'selected'
                                : lockedAgentIds.includes(agent.id)
                                  ? 'locked'
                                  : 'default',
                        handleAgentClick: handleAgentClick,
                        animRollOrder: index
                    })
                )}
            </div>
            <div className="absolute bottom-1 left-1/2 flex -translate-x-1/2 flex-row items-center gap-1 opacity-70">
                <div className="fill-gold size-2 -translate-y-0.5">
                    <Hourglass />
                </div>
                <div className="text-foreground text-xs">
                    {'- Agents here will be rerolled'}
                </div>
            </div>
        </div>
    )
}
