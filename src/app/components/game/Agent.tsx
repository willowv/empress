import * as EG from '@/logic/empress'
import 'tailwindcss'
import Die from '@/svg/Die'
import Lock from '@/svg/Lock'
import { AnimationContext } from 'app/play/[date]/GameScreen'
import { useContext } from 'react'
import clsx from 'clsx'
import { useDraggable } from '@dnd-kit/core'

type State = 'default' | 'locked' | 'invalid' | 'accepted' | 'selected'

interface AgentProps {
    readonly agent: EG.Agent
    readonly state?: State
    readonly handleAgentClick: (id: number) => void
    readonly animRollOrder?: number
}

export default function Agent({
    agent,
    state = 'default',
    handleAgentClick,
    animRollOrder
}: AgentProps) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: `agent-${agent.id}`
    })

    // If the last end turn was within 1.5 seconds, add the animation class
    const { lastEndTurnAt } = useContext(AnimationContext)
    const timeSinceLastEndTurn = Date.now() - (lastEndTurnAt?.valueOf() ?? 0)
    const shouldDoRollAnimation =
        agent.location === 'Court' && timeSinceLastEndTurn < 1500 // milliseconds

    const animDelay = 100 * (animRollOrder ?? 0) // milliseconds
    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            id={`agent-${agent.id}`}
            className={clsx(
                'fill-foreground transition-color relative size-12 select-none',
                {
                    'not-motion-reduce:animate-diebounce':
                        shouldDoRollAnimation,
                    'animate-none': !shouldDoRollAnimation,
                    'fill-purple scale-110': state === 'selected',
                    'fill-gold': state === 'locked',
                    'fill-green': state === 'accepted',
                    'fill-red': state === 'invalid',
                    invisible: transform
                }
            )}
            style={{
                animationDuration: '1s',
                animationDelay: `${animDelay}ms`
            }}
            onClick={(e) => {
                handleAgentClick(agent.id)
                e.stopPropagation()
            }}
        >
            <div
                className={clsx('', {
                    'not-motion-reduce:animate-dieroll': shouldDoRollAnimation,
                    'animate-none': !shouldDoRollAnimation
                })}
                style={{
                    animationDuration: '1s',
                    animationDelay: `${animDelay}ms`
                }}
            >
                <Die dieSize={agent.maxValue} />
            </div>
            <div
                className={clsx(
                    'absolute top-1/2 left-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-4xl backdrop-blur-xs',
                    {
                        'animate-numberbackdropfadein': shouldDoRollAnimation,
                        'animate-none': !shouldDoRollAnimation
                    }
                )}
                style={{ animationDuration: 1000 + animDelay + 'ms' }}
            >
                <div
                    className={clsx(
                        'text-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold' +
                            {
                                'animate-numberblur': shouldDoRollAnimation,
                                'animate-none': !shouldDoRollAnimation
                            }
                    )}
                    style={{
                        animationDuration: 1000 + animDelay + 'ms'
                    }}
                >
                    {agent.curValue}
                </div>
            </div>
            {state === 'locked' && (
                <div className="text-foreground fill-gold absolute right-0 bottom-1 size-3">
                    <Lock />
                </div>
            )}
        </div>
    )
}
