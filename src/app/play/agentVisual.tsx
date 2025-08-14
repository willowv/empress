import { Agent } from '@/game/state'
import 'tailwindcss'
import Die from './die'

export interface AgentVisualProps {
    readonly agent: Agent
    readonly isSelected: boolean
    readonly setSelected: (id: number) => void
}

export function AgentVisual({
    agent,
    isSelected,
    setSelected
}: AgentVisualProps) {
    return (
        <div key={agent.id} className="relative h-16 w-16">
            <div className={isSelected ? 'fill-purple-500' : 'invert'}>
                <Die dieSize={agent.maxValue} />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold backdrop-blur-xs">
                {agent.curValue}
            </div>
        </div>
    )
}
