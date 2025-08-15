import { hash_cyrb53, random_splitmix32, randomRoll } from '@/externals/random'
import {
    applyTurn,
    isTurnValid,
    Turn,
    State,
    withLocation,
    withValue
} from './state'

export type Session = {
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
const AGENT_MAX_VALUES: DieSize[] = [4, 4, 6, 6, 8, 8, 10, 12, 20]

export function getInitialState(rand: () => number): State {
    // Create all agents and assign them initial values
    return {
        agents: AGENT_MAX_VALUES.map((maxValue, index) => {
            return {
                id: index,
                curValue: randomRoll(maxValue, rand), // should give a roll between 1 and maxValue
                maxValue: maxValue,
                location: 'Court'
            }
        })
    }
}

export function getCurrentState(session: Session): State {
    // TODO: Add tests verifying that the results properly reproduce for the same seed
    const rand = random_splitmix32(hash_cyrb53(session.seed))
    let curState = getInitialState(rand)
    session.turnHistory.forEach((turn) => {
        curState = endTurn(curState, turn, rand)
    })
    return curState
}

export function endTurn(
    curState: State,
    turn: Turn,
    rand: () => number
): State {
    // If turn is valid, execute end of turn effects and return the new state
    if (isTurnValid(curState, turn)) {
        const { agents: prevAgents } = curState
        let nextAgents = applyTurn(curState, turn).agents

        // Move agents previously on Delay or Bribe back to Court
        prevAgents.forEach((agent) => {
            if (agent.location === 'Delay' || agent.location === 'Bribe')
                nextAgents[agent.id] = withLocation(
                    nextAgents[agent.id],
                    'Court'
                )
        })
        // Re-roll values for all agents in Court
        nextAgents = nextAgents.map((agent) => {
            if (agent.location === 'Court')
                return withValue(agent, randomRoll(agent.maxValue, rand))
            else return { ...agent }
        })
        return { agents: nextAgents }
    } else throw new Error('Invalid Move')
}
