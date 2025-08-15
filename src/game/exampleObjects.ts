import { Session, getCurrentState } from './session'
import { State, Turn, Location } from './state'

const testSeed: string = 'test'
const testInitialSession: Session = { seed: testSeed, turnHistory: [] }
export const testInitialState: State = getCurrentState(testInitialSession)
export const testValidTurn: Turn = {
    agentId_location: new Map<number, Location>([
        [2, 'Bribe'],
        [1, 'Delay'],
        [5, 'Influence'],
        [8, 'Influence']
    ])
}
const testMidGameSession: Session = {
    seed: testSeed,
    turnHistory: [testValidTurn]
}
export const testMidGameState: State = getCurrentState(testMidGameSession)
const testEndGameTurn: Turn = {
    agentId_location: new Map<number, Location>([
        [0, 'Influence'],
        [1, 'Delay'],
        [2, 'Influence'],
        [3, 'Influence'],
        [4, 'Influence'],
        [5, 'Influence'],
        [6, 'Influence'],
        [7, 'Influence'],
        [8, 'Bribe']
    ])
}
const testEndGameSession: Session = {
    seed: testSeed,
    turnHistory: [testEndGameTurn]
}
export const testEndGameState: State = getCurrentState(testEndGameSession)
const testInvalidTurn: Turn = {
    agentId_location: new Map<number, Location>([[5, 'Bribe']])
}
export const testInvalidSession: Session = {
    seed: testSeed,
    turnHistory: [testValidTurn, testInvalidTurn]
}
const testValidTurn2: Turn = {
    agentId_location: new Map<number, Location>([
        [4, 'Delay'],
        [3, 'Bribe'],
        [6, 'Influence'],
        [7, 'Influence']
    ])
}
export const testMidGameSession2: Session = {
    seed: testSeed,
    turnHistory: [testValidTurn, testValidTurn2]
}
export const testMidGameState2: State = getCurrentState(testMidGameSession2)
