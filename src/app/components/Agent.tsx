import * as EG from '@/game/empress'
import 'tailwindcss'
import Die from './Die'

type State = 'default' | 'locked' | 'invalid' | 'accepted' | 'selected'

interface AgentProps {
    readonly agent: EG.Agent
    readonly state?: State
    readonly handleAgentClick: (id: number) => void
}

export default function Agent({
    agent,
    state = 'default',
    handleAgentClick
}: AgentProps) {
    const mapState_css = {
        default: 'fill-foreground',
        locked: 'fill-gold',
        selected: 'fill-purple',
        accepted: 'fill-green',
        invalid: 'fill-red'
    }
    return (
        <div
            key={agent.id}
            className="relative size-12 select-none"
            onClick={() => {
                handleAgentClick(agent.id)
            }}
        >
            <div className={mapState_css[state]}>
                <Die dieSize={agent.maxValue} />
            </div>
            <div className="text-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold backdrop-blur-xs">
                {agent.curValue}
            </div>
        </div>
    )
}

type NumberBoxState = 'default' | 'invalid' | 'accepted'

interface NumberBoxProps {
    readonly num: number | undefined
    readonly state?: NumberBoxState
}

export function NumberBox({ num, state = 'default' }: NumberBoxProps) {
    const mapState_css = {
        default: 'border-foreground',
        accepted: 'border-green',
        invalid: 'border-red'
    }
    return (
        <div
            className={
                'relative size-12 border-1 select-none ' + mapState_css[state]
            }
        >
            <div className="text-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold backdrop-blur-xs">
                {num}
            </div>
        </div>
    )
}
