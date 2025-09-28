'use client'
import * as EG from '@/logic/empress'
import Agent from '@/game/Agent'
import Hourglass from '@/svg/Hourglass'
import { useDroppable } from '@dnd-kit/core'

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
    const { setNodeRef } = useDroppable({ id: 'location-court' })
    return (
        <div
            ref={setNodeRef}
            id="location-court"
            className="border-gold flex flex-col items-center justify-between rounded-t-2xl border-2 p-2 sm:rounded-tr-none"
            onClick={() => handleLocationClick('Court')}
        >
            <div className="text-foreground text-center text-lg font-bold">
                Court
            </div>
            <div className="text-foreground text-center text-xs">
                {'Unassigned agents'}
            </div>
            <div className="m-2 flex flex-row flex-wrap justify-center gap-1 p-1">
                {agents.map((agent, index) => {
                    const state =
                        agent.id === selectedAgentId
                            ? 'selected'
                            : lockedAgentIds.includes(agent.id)
                              ? 'locked'
                              : 'default'

                    return (
                        <Agent
                            key={`agent-${agent.id}`}
                            agent={agent}
                            state={state}
                            handleAgentClick={handleAgentClick}
                            animRollOrder={index}
                        />
                    )
                })}
            </div>
            <div className="flex flex-row items-center gap-0.5 opacity-70">
                <Hourglass className="fill-gold size-3" />
                <div className="text-foreground text-xs text-nowrap">
                    {'- Agents here will be rerolled'}
                </div>
            </div>
        </div>
    )
}
