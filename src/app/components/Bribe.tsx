'use client'
import * as EG from '@/game/empress'
import Agent, { NumberBox } from './Agent'

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
            isValid: isValid,
            isInvalid: !isValid
        })
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
            className="basis-[48%] border-2 border-amber-400 p-2"
            onClick={() => handleLocationClick('Bribe')}
        >
            <div className="text-center text-lg font-bold">Bribe</div>
            <div className="m-2 flex flex-col justify-center gap-2">
                <div className="flex flex-col items-center">
                    <div className="text-center text-xs">
                        {'# of Assignments'}
                    </div>
                    {NumberBox({
                        num: numAssignments,
                        isInvalid: false,
                        isValid: false
                    })}
                </div>
                <div className="flex flex-col items-center">
                    <div className="text-center text-xs">
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
