import * as EG from '@/game/empress'
import 'tailwindcss'
import Die from './svg/Die'
import Lock from './svg/Lock'
import { AnimationContext } from './Game'
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
    const { lastEndTurnAt } = useContext(AnimationContext)
    // If the last end turn was within 1.5 seconds, add the animation class
    const isLastEndTurnRecent =
        Date.now() - (lastEndTurnAt?.valueOf() ?? 0) < 1500 //milliseconds
    const shouldDoRollAnimation =
        agent.location === 'Court' && isLastEndTurnRecent

    const animDelay = 100 * (animRollOrder ?? 0) // milliseconds
    return (
        <div
            key={agent.id}
            className={
                'relative size-12 transition-all select-none' +
                mapState_agentCss[state]
            }
            style={{
                animationName: shouldDoRollAnimation ? 'diebounce' : 'none',
                animationDuration: '1s',
                animationDelay: `${animDelay}ms`
            }}
            onClick={() => {
                handleAgentClick(agent.id)
            }}
        >
            <div
                className={mapState_dieColorCss[state]}
                style={{
                    animationName: shouldDoRollAnimation ? 'dieroll' : 'none',
                    animationDuration: '1s',
                    animationDelay: `${animDelay}ms`
                }}
            >
                <Die dieSize={agent.maxValue} />
            </div>
            <div
                className="text-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold backdrop-blur-xs"
                style={{
                    animationName: shouldDoRollAnimation
                        ? 'numberblur'
                        : 'none',
                    animationDuration: '1s',
                    animationDelay: `${animDelay}ms`
                }}
            >
                {agent.curValue}
            </div>
            {state === 'locked' && (
                <div className="text-foreground fill-gold absolute right-0 bottom-1 size-3">
                    <Lock />
                </div>
            )}
        </div>
    )
}
