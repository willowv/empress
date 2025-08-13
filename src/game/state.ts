export type Location = 'Court' | 'Delay' | 'Bribe' | 'Influence'

export type Agent = {
    id: number
    maxValue: number
    curValue: number
    location: Location
}

export type State = {
    agents: Agent[]
}

export type Move = {
    changedAgents: Agent[]
}

export function getEmptyMove(): Move {
    return {
        changedAgents: []
    }
}

export function isMoveValid(
    { agents: agents }: State,
    { changedAgents: changedAgents }: Move
): boolean {
    // Only agents from Court were moved
    const isOnlyCourtMoves = changedAgents.every(
        (changedAgent) => agents[changedAgent.id].location === 'Court'
    )
    // At most one agent moved to Delay
    const newDelayAgents = changedAgents.filter(
        (changedAgent) => changedAgent.location === 'Delay'
    )
    const hasAtMostOneDelayAgent = newDelayAgents.length <= 1
    // At most one agent moved to Bribe
    const newBribeAgents = changedAgents.filter(
        (changedAgent) => changedAgent.location === 'Bribe'
    )
    const hasAtMostOneBribeAgent = newBribeAgents.length <= 1
    // Number of moved agents is less than the new bribe agent's value
    const maxChanges =
        newBribeAgents.length > 0 ? newBribeAgents[0].curValue + 1 : 0
    const isUnderMaxChanges = changedAgents.length <= maxChanges
    // New delay agent has higher value than old one, or zero if there's no previous delay agent
    const oldDelay =
        agents.find((agent) => agent.location === 'Delay')?.curValue ?? 0
    const isValidDelay =
        newDelayAgents.length == 0 || newDelayAgents[0].curValue > oldDelay
    return (
        isOnlyCourtMoves &&
        hasAtMostOneDelayAgent &&
        hasAtMostOneBribeAgent &&
        isUnderMaxChanges &&
        isValidDelay
    )
}

export function applyMove(
    { agents: agents }: State,
    { changedAgents: changedAgents }: Move
): State {
    // Aply the changes from the move
    // For each changedAgent, we want to update the corresponding agent in agents
    // The IDs of agents correspond to their index in agents
    changedAgents.forEach((changedAgent) => {
        agents[changedAgent.id].location = changedAgent.location
    })
    return {
        agents: agents
    }
}

export function getScore(agents: Agent[]): number {
    // Calculate score by adding up values of agents assigned to Influence
    return agents.reduce(
        (score, agent) =>
            agent.location === 'Influence' ? score + agent.curValue : score,
        0
    )
}

export function hasGameEnded(
    isInitialState: boolean,
    { agents }: State
): boolean {
    // (no delay agent OR <= 1 court agents)
    const hasDelayAgent =
        agents.find((agent) => agent.location === 'Delay') !== null
    const hasEnoughCourtAgents =
        agents.filter((agent) => agent.location === 'Court').length > 1
    return !isInitialState && (!hasDelayAgent || !hasEnoughCourtAgents)
}
