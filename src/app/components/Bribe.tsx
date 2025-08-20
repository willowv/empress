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
            num: undefined,
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
            className="border-2 border-amber-400 p-2"
            onClick={() => handleLocationClick('Bribe')}
        >
            <div className="text-center text-lg font-bold">
                Bribe the Officials
            </div>
            <div className="flex flex-row items-center">
                <div className="flex flex-col items-center">
                    <div className="mx-2 mt-2 text-center text-xs">
                        {'Other Assignments'}
                    </div>
                    {NumberBox({
                        num: numAssignments,
                        isInvalid: false,
                        isValid: false
                    })}
                </div>
                <div className="flex flex-col items-center">
                    <div className="mx-2 mt-2 text-center text-xs">
                        {'Assignment Limit'}
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
