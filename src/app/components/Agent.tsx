import * as EG from '@/game/empress'
import 'tailwindcss'
import Die from './die'

export interface AgentProps {
    readonly agent: EG.Agent
    readonly isSelected: boolean
    readonly isLocked: boolean
    readonly setSelected: (id: number) => void
}

export default function Agent({
    agent,
    isSelected,
    isLocked,
    setSelected
}: AgentProps) {
    return (
        <div
            key={agent.id}
            className="relative h-16 w-16 select-none"
            onClick={() => {
                if (!isLocked) setSelected(agent.id)
            }}
        >
            <div
                className={
                    isLocked
                        ? 'fill-amber-400'
                        : isSelected
                          ? 'fill-purple-500'
                          : 'invert'
                }
            >
                <Die dieSize={agent.maxValue} />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold backdrop-blur-xs">
                {agent.curValue}
            </div>
        </div>
    )
}
