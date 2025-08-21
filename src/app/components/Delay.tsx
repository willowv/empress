'use client'
import * as EG from '@/game/empress'
import Agent from './Agent'
import NumberBox from './NumberBox'

interface DelayProps {
    readonly lockedAgent: EG.Agent | undefined
    readonly agent: EG.Agent | undefined
    readonly isAgentSelected: boolean
    readonly handleLocationClick: (location: EG.Location) => void
    readonly handleAgentClick: (id: number) => void
}

export default function Delay({
    lockedAgent,
    agent,
    isAgentSelected,
    handleLocationClick,
    handleAgentClick
}: DelayProps) {
    // Delay can only display two agents
    // The previous agent and the new one (who might not be assigned yet)
    // Players should be aware that if they end turn without assigning a new agent here, game ends
    // Players should be aware that the new agent needs to have a higher value than the previous one

    // We don't really need 'agents' or 'lockedAgentIds', we just need the two relevant agents
    let prevSlot
    if (lockedAgent)
        prevSlot = Agent({
            agent: lockedAgent,
            state: 'locked',
            handleAgentClick: handleAgentClick
        })
    else prevSlot = NumberBox({ num: 0 })

    let nextSlot
    const isValid = (agent?.curValue ?? 0) > (lockedAgent?.curValue ?? 0)
    if (!agent) nextSlot = NumberBox({ num: undefined })
    else
        nextSlot = (
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
                    {prevSlot}
                </div>
                <div className="flex flex-col items-center">
                    <div className="text-foreground text-center text-xs">
                        {'Assign to continue play'}
                    </div>
                    {nextSlot}
                </div>
            </div>
        </div>
    )
}
