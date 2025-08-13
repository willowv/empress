import { hash_cyrb53, random_splitmix32, randomRoll } from '@/externals/random'
import { Agent, applyMove, isMoveValid, Location, Move, State } from './state'

export type Session = {
    seed: string
    moveHistory: Move[]
}

export function appendMove(session: Session, move: Move): Session {
    return {
        seed: session.seed,
        moveHistory: [...session.moveHistory, move]
    }
}

const AGENT_MAX_VALUES = [4, 4, 6, 6, 8, 8, 10, 12, 20]

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
    session.moveHistory.forEach((move) => {
        curState = endTurn(curState, move, rand)
    })
    return curState
}

export function endTurn(
    curState: State,
    move: Move,
    rand: () => number
): State {
    // If move is valid, execute end of turn effects and return the new state
    if (isMoveValid(curState, move)) {
        const { agents: prevAgents } = curState
        const { agents: nextAgents } = applyMove(curState, move)
        // Move agents previously on Delay or Bribe back to Court
        prevAgents.forEach((agent) => {
            if (agent.location === 'Delay' || agent.location === 'Bribe')
                nextAgents[agent.id].location = 'Court'
        })
        // Re-roll values for all agents in Court
        nextAgents.forEach((agent) => {
            if (agent.location === 'Court')
                agent.curValue = randomRoll(agent.maxValue, rand)
        })
        return { agents: nextAgents }
    } else throw new Error('Invalid Move')
}
