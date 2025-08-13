export type Location = 'Court' | 'Delay' | 'Bribe' | 'Influence'

export type Agent = {
    // TODO: store Location on agent instead of as a map
    id: number
    maxValue: number
    curValue: number
}

export type State = {
    agentLocations: Map<Agent, Location>
}

export type Move = {
    newAgentLocations: Map<Agent, Location>
}

export function getEmptyMove(): Move {
    return {
        newAgentLocations: new Map<Agent, Location>()
    }
}

export function isMoveValid(curState: State, move: Move): boolean {
    /*
        TODO: apply actual logic below
        Only agents from Court were moved
        At most one agent moved to Delay
        At most one agent moved to Bribe
        The number of moved agents is less than or equal to the bribe agent’s value + 1 (or no moved agents, if no bribe agent)
        New Delay agent has higher value than old state Delay agent
    */
    return true
}

export function applyMove(
    { agentLocations }: State,
    { newAgentLocations }: Move
): State {
    // Aply the changes from the move
    newAgentLocations.forEach((location, agent) => {
        agentLocations.set(agent, location)
    })
    return { agentLocations }
}

export function getScore(agentLocations: Map<Agent, Location>): number {
    // Calculate score by adding up values of agents assigned to Influence
    let score = 0
    agentLocations.forEach((location, agent) => {
        if (location === 'Influence') score += agent.curValue
    })
    return score
}

export function hasGameEnded(curState: State): boolean {
    // TODO: actual condition is not initial state and (no delay agent OR <= 1 court agents)
    return false
}
