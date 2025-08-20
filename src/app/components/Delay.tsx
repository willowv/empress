'use client'
import * as EG from '@/game/empress'
import Agent from './Agent'

interface DelayProps {
    readonly prevAgent: EG.Agent | null
    readonly nextAgent: EG.Agent | null
    readonly selectedAgentId: number | null
    readonly handleLocationClick: (location: EG.Location) => void
    readonly handleAgentClick: (id: number) => void
}

const PrevSlot = (
    agent: EG.Agent | null,
    handleAgentClick: (id: number) => void
) => {
    if (agent)
        return Agent({
            agent: agent,
            isSelected: false,
            isLocked: true,
            isInvalid: false,
            isValid: false,
            setSelected: handleAgentClick
        })
    else
        return (
            <div className="relative m-2.5 size-11 border-1 border-amber-400 select-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold backdrop-blur-xs">
                    0
                </div>
            </div>
        )
}

const NextSlot = (
    agent: EG.Agent | null,
    prevValue: number,
    isSelected: boolean,
    handleAgentClick: (id: number) => void
) => {
    const isValid = (agent?.curValue ?? 0) > prevValue
    if (!agent)
        return <div className={'m-2.5 size-11 border-1 border-gray-500'} />
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

export default function Delay({
    prevAgent,
    nextAgent,
    selectedAgentId,
    handleLocationClick,
    handleAgentClick
}: DelayProps) {
    // Delay can only display two agents
    // The previous agent and the new one (who might not be assigned yet)
    // Players should be aware that if they end turn without assigning a new agent here, game ends
    // Players should be aware that the new agent needs to have a higher value than the previous one

    // We don't really need 'agents' or 'lockedAgentIds', we just need the two relevant agents
    return (
        <div
            className="border-2 border-amber-400 p-2"
            onClick={() => handleLocationClick('Delay')}
        >
            <div className="text-center text-lg font-bold">
                Delay the Empress
            </div>
            <div className="flex flex-row items-center">
                <div className="flex flex-col items-center">
                    <div className="mx-2 mt-2 text-center text-xs">
                        {'Number to beat'}
                    </div>
                    {PrevSlot(prevAgent, handleAgentClick)}
                </div>
                <div className="flex flex-col items-center">
                    {NextSlot(
                        nextAgent,
                        prevAgent?.curValue ?? 0,
                        nextAgent?.id === selectedAgentId,
                        handleAgentClick
                    )}
                </div>
            </div>
        </div>
    )
}
