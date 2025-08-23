'use client'
import * as EG from '@/game/empress'
import Agent from './Agent'
import NumberBox from './NumberBox'
import Hourglass from './svg/Hourglass'

interface BribeProps {
    readonly agent: EG.Agent | undefined
    readonly numAssignments: number
    readonly isAgentSelected: boolean
    readonly handleLocationClick: (location: EG.Location) => void
    readonly handleAgentClick: (id: number) => void
}

export default function Bribe({
    agent,
    numAssignments,
    isAgentSelected,
    handleLocationClick,
    handleAgentClick
}: BribeProps) {
    const isValid = (agent?.curValue ?? 0) >= numAssignments
    let assignmentSlot
    if (!agent)
        assignmentSlot = NumberBox({
            state: isValid ? 'accepted' : 'invalid'
        })
    else
        assignmentSlot = (
            <Agent
                agent={agent}
                state={
                    isAgentSelected
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
            className="border-gold relative basis-[48%] border-2 p-2 pb-7 sm:w-54 sm:basis-[20%]"
            onClick={() => handleLocationClick('Bribe')}
        >
            <div className="text-foreground text-center text-lg font-bold">
                Bribe
            </div>
            <div className="m-2 flex flex-col justify-center gap-2 sm:flex-row">
                <div className="flex flex-col items-center">
                    <div className="text-foreground text-center text-xs">
                        {'# of Assignments'}
                    </div>
                    <NumberBox num={numAssignments} />
                </div>
                <div className="flex flex-col items-center">
                    <div className="text-foreground text-center text-xs">
                        {'Assign to increase limit'}
                    </div>
                    {assignmentSlot}
                </div>
            </div>
            <div className="absolute right-1 bottom-1 flex flex-row items-center gap-1 opacity-70">
                <div className="fill-gold size-2 -translate-y-0.5">
                    <Hourglass />
                </div>
                <div className="text-foreground text-xs">
                    {'- Agent will return to Court'}
                </div>
            </div>
        </div>
    )
}
