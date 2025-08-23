import * as EG from '@/game/empress'
import 'tailwindcss'
import Die from '../svg/Die'
import Lock from '../svg/Lock'
import { AnimationContext } from '../Game'
import { useContext } from 'react'

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
            className={
                'relative size-12 transition-all select-none' +
                mapState_agentCss[state] +
                (shouldDoRollAnimation ? ' animate-diebounce' : ' animate-none')
            }
            style={{
                animationDuration: '1s',
                animationDelay: `${animDelay}ms`
            }}
            onClick={() => {
                handleAgentClick(agent.id)
            }}
        >
            <div
                className={
                    mapState_dieColorCss[state] +
                    (shouldDoRollAnimation
                        ? ' animate-dieroll'
                        : ' animate-none')
                }
                style={{
                    animationDuration: '1s',
                    animationDelay: `${animDelay}ms`
                }}
            >
                <Die dieSize={agent.maxValue} />
            </div>
            <div className="absolute top-1/2 left-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-4xl backdrop-blur-xs">
                <div
                    className={
                        'text-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold' +
                        (shouldDoRollAnimation
                            ? ' animate-numberblur'
                            : ' animate-none')
                    }
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
