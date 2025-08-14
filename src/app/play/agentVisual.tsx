import { Agent } from '@/game/state'

export function AgentVisual(agent: Agent) {
    // TODO: Make this prettier for the interaction stage
    return (
        <div key={agent.id}>
            <div>Agent {agent.id}</div>
            <div>
                {agent.curValue} / {agent.maxValue}
            </div>
        </div>
    )
}
