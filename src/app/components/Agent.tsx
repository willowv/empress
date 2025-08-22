import * as EG from '@/game/empress'
import 'tailwindcss'
import Die from './svg/Die'
import Lock from './svg/Lock'

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
    return (
        <div
            key={agent.id}
            className={
                'relative size-12 transition-all select-none' +
                mapState_agentCss[state]
            }
            onClick={() => {
                handleAgentClick(agent.id)
            }}
        >
            <div className={mapState_dieColorCss[state]}>
                <Die dieSize={agent.maxValue} />
            </div>
            <div className="text-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold backdrop-blur-xs">
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
