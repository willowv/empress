import * as EG from '@/game/empress'
import 'tailwindcss'
import Die from './Die'

type Color = 'default' | 'gold' | 'purple' | 'green' | 'red'

const colorSettings = {
    default: 'fill-color-foreground',
    gold: 'fill-amber-400',
    purple: 'fill-purple-500',
    green: 'fill-green-700',
    red: 'fill-red-700'
}

export interface AgentProps {
    readonly agent: EG.Agent
    readonly isSelected: boolean
    readonly isLocked: boolean
    readonly isInvalid: boolean
    readonly isValid: boolean
    readonly setSelected: (id: number) => void
}

export default function Agent({
    agent,
    isSelected,
    isLocked,
    isInvalid,
    isValid,
    setSelected
}: AgentProps) {
    let color: Color = 'default'
    if (isInvalid) color = 'red'
    if (isValid) color = 'green'
    if (isLocked) color = 'gold'
    if (isSelected) color = 'purple'
    return (
        <div
            key={agent.id}
            className="relative size-12 select-none"
            onClick={() => {
                if (!isLocked) setSelected(agent.id)
            }}
        >
            <div className={colorSettings[color]}>
                <Die dieSize={agent.maxValue} />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold backdrop-blur-xs">
                {agent.curValue}
            </div>
        </div>
    )
}

interface NumberBoxProps {
    readonly num: number | undefined
    readonly isValid: boolean
    readonly isInvalid: boolean
}

export function NumberBox({ num, isValid, isInvalid }: NumberBoxProps) {
    let color: string = 'border-amber-400'
    if (isInvalid) color = 'border-red-700'
    if (isValid) color = 'border-green-700'
    return (
        <div className={'relative size-12 border-1 select-none ' + color}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold backdrop-blur-xs">
                {num}
            </div>
        </div>
    )
}
