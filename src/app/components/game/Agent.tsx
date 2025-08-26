import * as EG from '@/logic/empress'
import 'tailwindcss'
import Die from '@/svg/Die'
import Lock from '@/svg/Lock'
import { AnimationContext } from '@/game/Game'
import { useContext } from 'react'
import clsx from 'clsx'

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
    const mapState_dieColorCss = {
        default: 'fill-foreground',
        locked: 'fill-gold',
        selected: 'fill-purple',
        accepted: 'fill-green',
        invalid: 'fill-red'
    }
    const mapState_agentCss = {
        default: '',
        locked: '',
        selected: ' scale-110',
        accepted: '',
        invalid: ''
    }

    // If the last end turn was within 1.5 seconds, add the animation class
    const { lastEndTurnAt } = useContext(AnimationContext)
    const timeSinceLastEndTurn = Date.now() - (lastEndTurnAt?.valueOf() ?? 0)
    const shouldDoRollAnimation =
        agent.location === 'Court' && timeSinceLastEndTurn < 1500 // milliseconds

    const animDelay = 100 * (animRollOrder ?? 0) // milliseconds
    return (
        <div
            key={agent.id}
            className={clsx(
                'relative size-12 transition-all select-none' +
                    mapState_agentCss[state],
                {
                    'not-motion-reduce:animate-diebounce':
                        shouldDoRollAnimation,
                    'animate-none': !shouldDoRollAnimation
                }
            )}
            style={{
                animationDuration: '1s',
                animationDelay: `${animDelay}ms`
            }}
            onClick={() => {
                handleAgentClick(agent.id)
            }}
        >
            <div
                className={clsx(mapState_dieColorCss[state], {
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
