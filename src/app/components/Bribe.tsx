'use client'
import * as EG from '@/game/empress'
import Agent from './Agent'

interface BribeProps {
    readonly agent: EG.Agent | null
    readonly numAssignments: number
    readonly selectedAgentId: number | null
    readonly handleLocationClick: (location: EG.Location) => void
    readonly handleAgentClick: (id: number) => void
}

function AssignmentsCount(count: number) {
    return (
        <div className="relative m-2.5 size-11 border-1 border-amber-400 select-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold backdrop-blur-xs">
                {count}
            </div>
        </div>
    )
}

function AssignedAgent(
    agent: EG.Agent | null,
    numAssignments: number,
    isSelected: boolean,
    handleAgentClick: (id: number) => void
) {
    const isValid = (agent?.curValue ?? 0) >= numAssignments
    if (!agent)
        return (
            <div
                className={
                    'm-2.5 size-11 border-1 ' +
                    (isValid ? 'border-green-700' : 'border-red-700')
                }
            />
        )
    else
        return (
            <Agent
                agent={agent}
                isSelected={isSelected}
                isLocked={false}
                isInvalid={!isValid}
                isValid={isValid}
                setSelected={handleAgentClick}
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
            className="min-h-32 w-60 border-2 border-amber-400"
            onClick={() => handleLocationClick('Bribe')}
        >
            <div className="text-center text-lg font-bold">
                Bribe the Officials
            </div>
            <div className="mx-auto flex flex-row items-center">
                <div className="flex w-30 flex-col items-center">
                    <div className="mx-2 mt-2 text-center text-sm">
                        {'Other Assignments'}
                    </div>
                    {AssignmentsCount(numAssignments)}
                </div>
                <div className="flex w-30 flex-col items-center">
                    <div className="mx-2 mt-2 text-center text-sm">
                        {'Limit'}
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
