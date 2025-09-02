'use client'
import * as EG from '@/logic/empress'
import Agent from '@/game/Agent'
import NumberBox from '@/game/NumberBox'
import Hourglass from '@/svg/Hourglass'
import AssignTarget from '../AssignTarget'
import { useDroppable } from '@dnd-kit/core'

interface BribeProps {
    readonly agent: EG.Agent | undefined
    readonly numAssignments: number
    readonly selectedAgent: EG.Agent | undefined
    readonly handleLocationClick: (location: EG.Location) => void
    readonly handleAgentClick: (id: number) => void
}

export default function Bribe({
    agent,
    numAssignments,
    selectedAgent,
    handleLocationClick,
    handleAgentClick
}: BribeProps) {
    const { setNodeRef } = useDroppable({ id: 'location-bribe' })
    const isValid =
        (agent?.curValue ?? selectedAgent?.curValue ?? 0) >= numAssignments
    let assignmentSlot
    if (!agent)
        assignmentSlot = (
            <AssignTarget
                state={
                    !selectedAgent ? 'default' : isValid ? 'valid' : 'invalid'
                }
                onClick={() => handleLocationClick('Bribe')}
            />
        )
    else
        assignmentSlot = (
            <Agent
                agent={agent}
                state={
                    agent === selectedAgent
                        ? 'selected'
                        : isValid
                          ? 'accepted'
                          : 'invalid'
                }
                handleAgentClick={handleAgentClick}
            />
        )

    return (
        <div
            ref={setNodeRef}
            id="location-bribe"
            className="border-gold flex grow flex-col items-center justify-between rounded-br-2xl border-2 p-2"
            onClick={() => handleLocationClick('Bribe')}
        >
            <div className="text-foreground text-center text-lg font-bold">
                Bribe
            </div>
            <div className="m-2 flex flex-col justify-center gap-2 sm:flex-row">
                <div className="flex flex-col items-center gap-1">
                    <div className="text-foreground text-center text-xs">
                        {'Assigned'}
                    </div>
                    <NumberBox num={numAssignments} />
                </div>
                <div className="flex flex-col items-center gap-1">
                    <div className="text-foreground text-center text-xs">
                        {'Increase limit'}
                    </div>
                    {assignmentSlot}
                </div>
            </div>
            <div className="flex flex-row items-center gap-0.5 opacity-70">
                <Hourglass className="fill-gold size-3" />
                <div className="text-foreground text-xs text-nowrap">
                    {'- Agent will return to Court'}
                </div>
            </div>
        </div>
    )
}
