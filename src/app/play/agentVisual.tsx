import { Agent } from '@/game/state'
import Image from 'next/image'
import 'tailwindcss'

const dieMapping = {
    4: '/D4.svg',
    6: '/D6.svg',
    8: '/D8.svg',
    10: '/D10.svg',
    12: '/D12.svg',
    20: '/D20.svg'
}

export function AgentVisual(agent: Agent) {
    return (
        <div key={agent.id} className="relative h-16 w-16">
            <Image
                key={agent.id}
                src={dieMapping[agent.maxValue]}
                width={1000}
                height={1000}
                alt={'A ' + agent.maxValue + '-sided die'}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 invert"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop-blur-xs">
                {agent.curValue}
            </div>
        </div>
    )
}
