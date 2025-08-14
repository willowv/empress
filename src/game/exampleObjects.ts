import { Session, getCurrentState } from './session'
import { State, Turn } from './state'

const testSeed: string = 'test'
const testInitialSession: Session = { seed: testSeed, turnHistory: [] }
export const testInitialState: State = getCurrentState(testInitialSession)
export const testValidTurn: Turn = {
    moves: [
        { agentId: 2, location: 'Bribe' },
        { agentId: 1, location: 'Delay' },
        { agentId: 5, location: 'Influence' },
        { agentId: 8, location: 'Influence' }
    ]
}
const testMidGameSession: Session = {
    seed: testSeed,
    turnHistory: [testValidTurn]
}
export const testMidGameState: State = getCurrentState(testMidGameSession)
const testEndGameTurn: Turn = {
    moves: [
        { agentId: 0, location: 'Influence' },
        { agentId: 1, location: 'Delay' },
        { agentId: 2, location: 'Influence' },
        { agentId: 3, location: 'Influence' },
        { agentId: 4, location: 'Influence' },
        { agentId: 5, location: 'Influence' },
        { agentId: 6, location: 'Influence' },
        { agentId: 7, location: 'Influence' },
        { agentId: 8, location: 'Bribe' }
    ]
}
const testEndGameSession: Session = {
    seed: testSeed,
    turnHistory: [testEndGameTurn]
}
export const testEndGameState: State = getCurrentState(testEndGameSession)
const testInvalidTurn: Turn = { moves: [{ agentId: 5, location: 'Bribe' }] }
export const testInvalidSession: Session = {
    seed: testSeed,
    turnHistory: [testValidTurn, testInvalidTurn]
}
const testValidTurn2: Turn = {
    moves: [
        { agentId: 4, location: 'Delay' },
        { agentId: 3, location: 'Bribe' },
        { agentId: 6, location: 'Influence' },
        { agentId: 7, location: 'Influence' }
    ]
}
export const testMidGameSession2: Session = {
    seed: testSeed,
    turnHistory: [testValidTurn, testValidTurn2]
}
export const testMidGameState2: State = getCurrentState(testMidGameSession2)
