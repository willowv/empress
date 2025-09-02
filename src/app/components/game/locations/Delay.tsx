'use client'
import * as EG from '@/logic/empress'
import Agent from '@/game/Agent'
import NumberBox from '@/game/NumberBox'
import Hourglass from '@/svg/Hourglass'
import clsx from 'clsx'
import AssignTarget from '../AssignTarget'

interface DelayProps {
    readonly lockedAgent: EG.Agent | undefined
    readonly agent: EG.Agent | undefined
    readonly selectedAgent: EG.Agent | undefined
    readonly handleLocationClick: (location: EG.Location) => void
    readonly handleAgentClick: (id: number) => void
}

export default function Delay({
    lockedAgent,
    agent,
    selectedAgent,
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
        prevSlot = (
            <Agent
                agent={lockedAgent}
                state={'locked'}
                handleAgentClick={handleAgentClick}
            />
        )
    else prevSlot = <NumberBox num={0} />

    let nextSlot
    const isValid =
        (selectedAgent?.curValue ?? 0) > (lockedAgent?.curValue ?? 0)
    if (!agent)
        nextSlot = (
            <AssignTarget
                state={
                    !selectedAgent ? 'default' : isValid ? 'valid' : 'invalid'
                }
                onClick={() => handleLocationClick('Delay')}
            />
        )
    else
        nextSlot = (
            <Agent
                agent={agent}
                state={agent === selectedAgent ? 'selected' : 'accepted'}
                handleAgentClick={handleAgentClick}
            />
        )

    return (
        <div
            id="location-delay"
            className="border-gold flex grow flex-col items-center justify-between rounded-bl-2xl border-2 p-2"
            onClick={() => handleLocationClick('Delay')}
        >
            <div className="text-foreground text-center text-lg font-bold">
                Delay
            </div>
            <div className="m-2 flex flex-col gap-2 sm:flex-row sm:gap-2">
                <div className="flex flex-col items-center gap-1">
                    <div className="text-foreground text-center text-xs">
                        {'Previous Delay'}
                    </div>
                    {prevSlot}
                </div>
                <div className="flex flex-col items-center gap-1">
                    <div className="text-foreground text-center text-xs">
                        {'Add a Turn'}
                    </div>
                    <div id="assign-target">{nextSlot}</div>
                </div>
            </div>
            <div className="flex flex-row items-center gap-0.5 opacity-70">
                <Hourglass className="fill-gold size-3" />
                <div className="text-foreground text-xs text-nowrap">
                    {'- The game '}
                </div>
                <div
                    className={clsx('ml-0.5 text-xs text-nowrap', {
                        'text-green': agent,
                        'text-red': !agent && !isValid,
                        'text-purple': !agent && isValid
                    })}
                >
                    {agent
                        ? 'will continue'
                        : isValid
                          ? 'would continue'
                          : 'will END'}
                </div>
            </div>
        </div>
    )
}
