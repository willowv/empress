'use client'
import * as EG from '@/logic/empress'
import Agent from '@/game/Agent'
import Person from '@/svg/Person'
import Hourglass from '@/svg/Hourglass'

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
                            key={agent.id}
                            agent={agent}
                            state={state}
                            handleAgentClick={handleAgentClick}
                        />
                    )
                })}
            </div>
        ) : (
            <div className="fill-foreground m-6 size-6 opacity-15">
                <Person />
            </div>
        )
    return (
        <div
            className="border-gold flex grow flex-col items-center justify-between border-2 p-2"
            onClick={() => handleLocationClick('Influence')}
        >
            <div className="text-foreground text-center text-lg font-bold">
                Influence
            </div>
            <div className="text-foreground text-center text-xs">
                {score == 0 ? 'Assign to score points' : `Score: ${score}`}
            </div>
            {content}
            <div className="flex flex-row items-center gap-0.5 opacity-70">
                <Hourglass className="fill-gold size-3" />
                <div className="text-foreground text-xs text-nowrap">
                    {'- Agents here will be locked'}
                </div>
            </div>
        </div>
    )
}
