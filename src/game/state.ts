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

export function updateTurnWithMove(
    { agentId_location }: Turn,
    move: Move
): Turn {
    // If we are assigning to Delay or Bribe and there is an existing move to Delay or Bribe in this set, we want to remove it
    const updatedTurn = _.cloneDeep(agentId_location)
    function removeExistingMoves(targetLocation: Location): void {
        const existingMovesToTarget = agentId_location
            .entries()
            .filter(([, location]) => location === targetLocation)

        existingMovesToTarget.forEach(([agentId]) =>
            updatedTurn.delete(agentId)
        )
    }
    if (move.location === 'Delay') {
        removeExistingMoves('Delay')
    }
    if (move.location === 'Bribe') {
        removeExistingMoves('Bribe')
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

    function numAgentsAssignedTo(targetLocation: Location): number {
        return agentId_location
            .values()
            .reduce(
                (numDelayAgents, location) =>
                    location === targetLocation
                        ? numDelayAgents + 1
                        : numDelayAgents,
                0
            )
    }
    const hasAtMostOneNewDelayAgent = numAgentsAssignedTo('Delay') <= 1
    const hasAtMostOneNewBribeAgent = numAgentsAssignedTo('Bribe') <= 1

    function getValueOfAgentAssignedTo(targetLocation: Location): number {
        const agentId = agentId_location
            .entries()
            .find(([, location]) => location === targetLocation)?.[0]
        return agentId !== undefined ? agents[agentId].curValue : 0
    }
    // Number of moved agents is less than the new bribe agent's value
    const maxMoves: number = getValueOfAgentAssignedTo('Bribe') + 1
    const isUnderMaxChanges = agentId_location.size <= maxMoves

    // New delay agent has higher value than old one, or zero if there's no previous delay agent
    const oldDelay =
        agents.find((agent) => agent.location === 'Delay')?.curValue ?? 0
    const newDelay: number = getValueOfAgentAssignedTo('Delay')
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
