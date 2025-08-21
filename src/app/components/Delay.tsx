'use client'
import * as EG from '@/game/empress'
import Agent from './Agent'
import NumberBox from './NumberBox'

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
            state: 'locked',
            handleAgentClick: handleAgentClick
        })
    else return NumberBox({ num: 0 })
}

const NextSlot = (
    agent: EG.Agent | null,
    prevValue: number,
    isSelected: boolean,
    handleAgentClick: (id: number) => void
) => {
    const isValid = (agent?.curValue ?? 0) > prevValue
    if (!agent) return NumberBox({ num: undefined })
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
            className="border-gold basis-[48%] border-2 p-2 sm:w-54 sm:basis-[20%]"
            onClick={() => handleLocationClick('Delay')}
        >
            <div className="text-foreground text-center text-lg font-bold">
                Delay
            </div>
            <div className="m-2 flex flex-col justify-center gap-2 sm:flex-row">
                <div className="flex flex-col items-center">
                    <div className="text-foreground text-center text-xs">
                        {'Number to beat'}
                    </div>
                    {PrevSlot(prevAgent, handleAgentClick)}
                </div>
                <div className="flex flex-col items-center">
                    <div className="text-foreground text-center text-xs">
                        {'Assign to continue play'}
                    </div>
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
