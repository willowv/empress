'use client'
import * as EG from '@/logic/empress'
import Agent from '@/game/Agent'
import Hourglass from '@/svg/Hourglass'
import AssignTarget from '../AssignTarget'
import { useDroppable } from '@dnd-kit/core'

interface InfluenceProps {
    readonly selectedAgentId: number | undefined
    readonly agents: EG.Agent[]
    readonly handleLocationClick: (location: EG.Location) => void
    readonly handleAgentClick: (id: number) => void
    readonly lockedAgentIds: number[]
    readonly targetScore: number
}

export default function Influence({
    selectedAgentId,
    agents,
    handleLocationClick,
    handleAgentClick,
    lockedAgentIds,
    targetScore
}: InfluenceProps) {
    const { setNodeRef } = useDroppable({ id: 'location-influence' })
    const score = EG.getScore({ agents })
    return (
        <div
            ref={setNodeRef}
            id="location-influence"
            className="border-gold flex flex-col items-center justify-between border-2 p-2 sm:rounded-tr-2xl"
            onClick={() => handleLocationClick('Influence')}
        >
            <div className="text-foreground text-center text-lg font-bold">
                Influence
            </div>
            <div className="text-foreground text-center text-xs">
                {score == 0
                    ? 'Score points'
                    : `Score: ${score} (target ${targetScore})`}
            </div>
            <div className="m-2 flex flex-row flex-wrap justify-center gap-1 p-1">
                {agents.map((agent) => {
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
                        />
                    )
                })}
                <div className="mx-2">
                    <AssignTarget
                        onClick={() => handleLocationClick('Influence')}
                    />
                </div>
            </div>
            <div className="flex flex-row items-center gap-0.5 opacity-70">
                <Hourglass className="fill-gold size-3" />
                <div className="text-foreground text-xs text-nowrap">
                    {'- Agents here will be locked'}
                </div>
            </div>
        </div>
    )
}
