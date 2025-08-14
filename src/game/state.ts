export type Location = 'Court' | 'Delay' | 'Bribe' | 'Influence'

export type Agent = {
    readonly id: number
    readonly maxValue: 4 | 6 | 8 | 10 | 12 | 20
    readonly curValue: number
    readonly location: Location
}

export function withLocation(agent: Agent, location: Location): Agent {
    return {
        ...agent,
        location: location
    }
}

export function withValue(agent: Agent, value: number): Agent {
    return {
        ...agent,
        curValue: value
    }
}

export type State = {
    readonly agents: Agent[]
}

export type Move = {
    readonly agentId: number
    readonly location: Location
}

export type Turn = {
    readonly moves: Move[]
}

export function appendMove({ moves }: Turn, move: Move): Turn {
    return {
        moves: [...moves, move]
    }
}

export function getEmptyTurn(): Turn {
    return {
        moves: []
    }
}

export function isTurnValid(
    { agents: agents }: State,
    { moves: moves }: Turn
): boolean {
    // Only agents from Court were moved
    const isOnlyCourtMoves = moves.every(
        (move) => agents[move.agentId].location === 'Court'
    )
    // At most one agent moved to Delay
    const newDelayAgents = moves.filter((move) => move.location === 'Delay')
    const hasAtMostOneDelayAgent = newDelayAgents.length <= 1
    // At most one agent moved to Bribe
    const newBribeAgents = moves.filter((move) => move.location === 'Bribe')
    const hasAtMostOneBribeAgent = newBribeAgents.length <= 1
    // Number of moved agents is less than the new bribe agent's value
    const maxChanges =
        newBribeAgents.length > 0
            ? agents[newBribeAgents[0].agentId].curValue + 1
            : 0
    const isUnderMaxChanges = moves.length <= maxChanges
    // New delay agent has higher value than old one, or zero if there's no previous delay agent
    const oldDelay =
        agents.find((agent) => agent.location === 'Delay')?.curValue ?? 0
    const isValidDelay =
        newDelayAgents.length == 0 ||
        agents[newDelayAgents[0].agentId].curValue > oldDelay
    return (
        isOnlyCourtMoves &&
        hasAtMostOneDelayAgent &&
        hasAtMostOneBribeAgent &&
        isUnderMaxChanges &&
        isValidDelay
    )
}

export function applyTurn(
    { agents: agents }: State,
    { moves: moves }: Turn
): State {
    // Aply the changes from the move
    // For each changedAgent, we want to update the corresponding agent in agents
    // The IDs of agents correspond to their index in agents
    const updatedAgents = agents.map((agent) => {
        return { ...agent }
    })
    moves.forEach((move) => {
        updatedAgents[move.agentId].location = move.location
    })
    return {
        agents: updatedAgents
    }
}

export function getScore({ agents }: State): number {
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
        agents.find((agent) => agent.location === 'Delay') !== undefined
    const hasEnoughCourtAgents =
        agents.filter((agent) => agent.location === 'Court').length > 1
    return !isInitialState && (!hasDelayAgent || !hasEnoughCourtAgents)
}
