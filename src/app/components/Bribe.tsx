'use client'
import * as EG from '@/game/empress'
import Agent from './Agent'
import NumberBox from './NumberBox'

interface BribeProps {
    readonly agent: EG.Agent | null
    readonly numAssignments: number
    readonly selectedAgentId: number | null
    readonly handleLocationClick: (location: EG.Location) => void
    readonly handleAgentClick: (id: number) => void
}

function AssignedAgent(
    agent: EG.Agent | null,
    numAssignments: number,
    isSelected: boolean,
    handleAgentClick: (id: number) => void
) {
    const isValid = (agent?.curValue ?? 0) >= numAssignments
    if (!agent)
        return NumberBox({
            num: 0,
            state: isValid ? 'accepted' : 'invalid'
        })
    else
        return (
            <Agent
                agent={agent}
                state={
                    isSelected ? 'selected' : isValid ? 'accepted' : 'invalid'
                }
                handleAgentClick={handleAgentClick}
            />
        )
}

export default function Bribe({
    agent,
    numAssignments,
    selectedAgentId,
    handleLocationClick,
    handleAgentClick
}: BribeProps) {
    return (
        <div
            className="border-gold basis-[48%] border-2 p-2 sm:w-54 sm:basis-[20%]"
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
                    {AssignedAgent(
                        agent,
                        numAssignments,
                        agent?.id === selectedAgentId,
                        handleAgentClick
                    )}
                </div>
            </div>
        </div>
    )
}
