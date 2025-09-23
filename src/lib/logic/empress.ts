import _ from 'lodash'
import {
    hash_cyrb53,
    random_splitmix32,
    randomNum,
    randomRoll,
    weightedSelect
} from 'lib/random'
import { dateOnlyString } from 'lib/util'

export type Session = {
    date: Date
    seed: string
    turnHistory: Turn[]
}

export function appendTurn(session: Session, turn: Turn): Session {
    return {
        ...session,
        turnHistory: [...session.turnHistory, turn]
    }
}

export type DieSize = 4 | 6 | 8 | 10 | 12 | 20
const DIE_SIZES: DieSize[] = [4, 6, 8, 10, 12, 20]

interface EmpressConfig {
    readonly dieBaseWeights: number[]
    readonly minDiceCount: number
    readonly maxDiceCount: number
    readonly minWeightChange: number
    readonly maxWeightChange: number
}

const ORIGINAL_CONFIG = {
    dieBaseWeights: [12, 12, 12, 6, 6, 6],
    minDiceCount: 9,
    maxDiceCount: 14,
    minWeightChange: -5,
    maxWeightChange: 5
}

const CONFIG_HISTORY = new Map<Date, EmpressConfig>([
    [new Date(0), ORIGINAL_CONFIG]
])

function getConfig(date: Date): EmpressConfig {
    let config
    CONFIG_HISTORY.forEach((historicalConfig, historicalDate) => {
        if (date >= historicalDate) config = historicalConfig
    })
    return config ?? ORIGINAL_CONFIG
}

export function getDiceCounts(session: Session): Map<DieSize, number> {
    // Dice counts are based just on the date, whereas the rolls are based on the session's full seed.
    const rand = random_splitmix32(hash_cyrb53(dateOnlyString(session.date)))
    const {
        dieBaseWeights,
        minDiceCount,
        maxDiceCount,
        minWeightChange,
        maxWeightChange
    } = getConfig(session.date)
    const total = randomNum(minDiceCount, maxDiceCount, rand)
    const finalWeights = dieBaseWeights.map(
        (weight) => weight + randomNum(minWeightChange, maxWeightChange, rand)
    )

    const mpDieSize_Count = new Map<DieSize, number>([
        [4, 0],
        [6, 0],
        [8, 0],
        [10, 0],
        [12, 0],
        [20, 0]
    ])
    for (let i = 0; i < total; i++) {
        // For each die in our total, randomly select from our weight table
        const dieSize = DIE_SIZES[weightedSelect(finalWeights, rand)]
        mpDieSize_Count.set(dieSize, (mpDieSize_Count.get(dieSize) ?? 0) + 1)
    }

    return mpDieSize_Count
}

// We need the date for this game so we know which config to use
function getInitialState(session: Session): [State, () => number] {
    const rand = random_splitmix32(hash_cyrb53(session.seed))
    const mpDieSize_Count = getDiceCounts(session)
    const agents: Agent[] = []
    mpDieSize_Count.entries().forEach(([dieSize, count]) => {
        for (let i = 0; i < count; i++) {
            agents.push({
                id: agents.length,
                curValue: randomRoll(dieSize, rand),
                maxValue: dieSize,
                location: 'Court'
            })
        }
    })
    return [{ agents }, rand]
}

export function getCurrentState(session: Session): State {
    const [initialState, rand] = getInitialState(session)
    let curState = _.cloneDeep(initialState)
    session.turnHistory.forEach((turn) => {
        curState = endTurn(curState, turn, rand)
    })
    return curState
}

function endTurn(curState: State, turn: Turn, rand: () => number): State {
    // If turn is valid, execute end of turn effects and return the new state
    if (isTurnValid(curState, turn)) {
        const { agents: prevAgents } = curState
        let nextAgents = applyTurn(curState, turn).agents

        // Move agent previously on Delay back to Court
        prevAgents.forEach((agent) => {
            if (agent.location === 'Delay')
                nextAgents[agent.id] = withLocation(
                    nextAgents[agent.id],
                    'Court'
                )
        })

        //Move Bribe agent back to court and re-roll values for all agents in Court
        nextAgents = nextAgents.map((agent) => {
            if (agent.location === 'Bribe')
                return withValue(
                    withLocation(agent, 'Court'),
                    randomRoll(agent.maxValue, rand)
                )
            if (agent.location === 'Court')
                return withValue(agent, randomRoll(agent.maxValue, rand))
            else return { ...agent }
        })
        return { agents: nextAgents }
    } else throw new Error('Invalid Move')
}
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

export function numNonBribeAssignments(
    { agents: agents }: State,
    { agentId_location: agentId_location }: Turn
): number {
    return agentId_location.entries().reduce<number>(
        (count: number, [agentId, location]) =>
            // agents only count if they have actually moved
            location === 'Bribe' || agents[agentId].location === location
                ? count
                : count + 1,
        0
    )
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
    // Number of other moved agents is less than the new bribe agent's value
    const maxMoves: number = getValueOfAgentAssignedTo('Bribe')
    const isUnderMaxChanges =
        numNonBribeAssignments({ agents }, { agentId_location }) <= maxMoves

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
