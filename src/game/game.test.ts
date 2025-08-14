import { expect } from '@jest/globals'
import { isTurnValid, Turn, hasGameEnded } from './state'
import { getCurrentState } from './session'
import {
    testInitialState,
    testValidTurn,
    testMidGameState,
    testEndGameState,
    testInvalidSession,
    testMidGameSession2
} from './exampleObjects'

describe('isTurnValid', () => {
    it('should return true for a valid move', () => {
        expect(isTurnValid(testInitialState, testValidTurn)).toBe(true)
    })
    it('should return false when a non-court agent is moved', () => {
        // try to move agent 5 from midgame state
        const testTurn: Turn = { moves: [{ agentId: 5, location: 'Bribe' }] }
        expect(isTurnValid(testMidGameState, testTurn)).toBe(false)
    })
    it('should return false when too many agents are assigned to Delay', () => {
        // try to assign agents 0 and 1 to Delay from initial state
        const testTurn: Turn = {
            moves: [
                { agentId: 0, location: 'Delay' },
                { agentId: 1, location: 'Delay' }
            ]
        }
        expect(isTurnValid(testInitialState, testTurn)).toBe(false)
    })
    it('should return false when too many agents are assigned to Bribe', () => {
        // try to assign agents 0 and 1 to Bribe from initial state
        const testTurn: Turn = {
            moves: [
                { agentId: 0, location: 'Bribe' },
                { agentId: 1, location: 'Bribe' }
            ]
        }
        expect(isTurnValid(testInitialState, testTurn)).toBe(false)
    })
    it('should return false when the new Delay agent is lower than the old one', () => {
        // try to assign agent 3 to Bribe and agent 0 to Delay from midgame state
        const testTurn: Turn = {
            moves: [
                { agentId: 3, location: 'Bribe' },
                { agentId: 0, location: 'Delay' }
            ]
        }
        expect(isTurnValid(testMidGameState, testTurn)).toBe(false)
    })
    it('should return false when more agents were moved than the value of the new Bribe agent', () => {
        // try to assign agent 0 to Influence from initial state
        const testTurn: Turn = {
            moves: [{ agentId: 0, location: 'Influence' }]
        }
        expect(isTurnValid(testInitialState, testTurn)).toBe(false)
    })
})

describe('hasGameEnded', () => {
    it('should return false for initial state', () => {
        expect(hasGameEnded(true, testInitialState)).toBe(false)
    })
    it('should return false for mid game state', () => {
        expect(hasGameEnded(false, testMidGameState)).toBe(false)
    })
    it('should return true if no delay agent is assigned after initial state', () => {
        expect(hasGameEnded(false, testInitialState)).toBe(true)
    })
    it('should return true if there are not enough court agents left', () => {
        expect(hasGameEnded(false, testEndGameState)).toBe(true)
    })
})

// test that old agents are moved back to court
// test that it throws an error for an invalid move
describe('endTurn', () => {
    it('should throw an error when an invalid turn is attempted', () => {
        // try to move agent 5 from midgame state
        expect(() => getCurrentState(testInvalidSession)).toThrow(
            'Invalid Move'
        )
    })
    it('should move old agents back to Court', () => {
        const state = getCurrentState(testMidGameSession2)
        expect(state.agents[1].location).toBe('Court')
        expect(state.agents[2].location).toBe('Court')
    })
})
