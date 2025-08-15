import { DieSize } from './session'

import _ from 'lodash'

export type Location = 'Court' | 'Delay' | 'Bribe' | 'Influence'

export type Agent = {
    readonly id: number
    readonly maxValue: DieSize
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
    readonly agentId_location: Map<number, Location>
}

export function appendMove({ agentId_location }: Turn, move: Move): Turn {
    // If we are assigning to Delay or Bribe and there is an existing move to Delay or Bribe in this set, we want to remove it
    const updatedTurn = _.cloneDeep(agentId_location)
    if (move.location === 'Delay') {
        const existingDelayMoves = agentId_location
            .entries()
            .filter(([, location]) => location === 'Delay')

        existingDelayMoves.forEach(([agentId]) => updatedTurn.delete(agentId))
    }
    if (move.location === 'Bribe') {
        const existingBribeMoves = agentId_location
            .entries()
            .filter(([, location]) => location === 'Bribe')

        existingBribeMoves.forEach(([agentId]) => updatedTurn.delete(agentId))
    }
    updatedTurn.set(move.agentId, move.location)
    return {
        agentId_location: updatedTurn
    }
}

export function getEmptyTurn(): Turn {
    return {
        agentId_location: new Map<number, Location>()
    }
}

export function isTurnValid(
    { agents: agents }: State,
    { agentId_location: agentId_location }: Turn
): boolean {
    // Only agents from Court were moved
    const isOnlyCourtMoves = agentId_location
        .keys()
        .every((agentId) => agents[agentId].location === 'Court')
    // At most one agent moved to Delay
    const numNewDelayAgents = agentId_location
        .values()
        .reduce(
            (numDelayAgents, location) =>
                location === 'Delay' ? numDelayAgents + 1 : numDelayAgents,
            0
        )
    const hasAtMostOneNewDelayAgent = numNewDelayAgents <= 1
    // At most one agent moved to Bribe
    const numNewBribeAgents = agentId_location
        .values()
        .reduce(
            (numBribeAgents, location) =>
                location === 'Bribe' ? numBribeAgents + 1 : numBribeAgents,
            0
        )
    const hasAtMostOneNewBribeAgent = numNewBribeAgents <= 1
    // Number of moved agents is less than the new bribe agent's value
    const newBribeAgentId: number | undefined = agentId_location
        .entries()
        .find(([, location]) => location === 'Bribe')?.[0]

    const maxMoves: number =
        newBribeAgentId !== undefined ? agents[newBribeAgentId].curValue + 1 : 0
    const isUnderMaxChanges = agentId_location.size <= maxMoves
    // New delay agent has higher value than old one, or zero if there's no previous delay agent
    const oldDelay =
        agents.find((agent) => agent.location === 'Delay')?.curValue ?? 0

    const newDelayAgentId: number | undefined = agentId_location
        .entries()
        .find(([, location]) => location === 'Delay')?.[0]
    const newDelay: number =
        newDelayAgentId !== undefined ? agents[newDelayAgentId].curValue : 0
    const isValidDelay = oldDelay == 0 || newDelay == 0 || newDelay > oldDelay
    return (
        isOnlyCourtMoves &&
        hasAtMostOneNewDelayAgent &&
        hasAtMostOneNewBribeAgent &&
        isUnderMaxChanges &&
        isValidDelay
    )
}

export function applyTurn(
    { agents: agents }: State,
    { agentId_location: agentId_location }: Turn
): State {
    // Aply the changes from the move
    // For each changedAgent, we want to update the corresponding agent in agents
    // The IDs of agents correspond to their index in agents
    return {
        agents: agents.map((agent) => {
            return {
                ...agent,
                location: agentId_location.get(agent.id) ?? agent.location
            }
        })
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
