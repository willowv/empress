import { expect } from '@jest/globals'
import {
    isTurnValid,
    Turn,
    hasGameEnded,
    Location,
    getCurrentState
} from './empress'
import * as Example from './example'

describe('isTurnValid', () => {
    it('should return true for a valid move', () => {
        expect(isTurnValid(Example.stateInitial, Example.turn1Valid)).toBe(true)
    })
    it('should return false when a non-court agent is moved', () => {
        // try to move agent 5 from midgame state
        const testTurn2: Turn = {
            agentId_location: new Map<number, Location>([[5, 'Bribe']])
        }
        expect(isTurnValid(Example.stateAfterTurn1, testTurn2)).toBe(false)
    })
    it('should return false when too many agents are assigned to Delay', () => {
        // try to assign agents 0 and 1 to Delay from initial state
        const testTurn1: Turn = {
            agentId_location: new Map<number, Location>([
                [0, 'Delay'],
                [1, 'Delay']
            ])
        }
        expect(isTurnValid(Example.stateInitial, testTurn1)).toBe(false)
    })
    it('should return false when too many agents are assigned to Bribe', () => {
        // try to assign agents 0 and 1 to Bribe from initial state
        const testTurn1: Turn = {
            agentId_location: new Map<number, Location>([
                [0, 'Bribe'],
                [1, 'Bribe']
            ])
        }
        expect(isTurnValid(Example.stateInitial, testTurn1)).toBe(false)
    })
    it('should return false when the new Delay agent is lower than the old one', () => {
        // try to assign agent 3 to Bribe and agent 0 to Delay from midgame state
        const testTurn2: Turn = {
            agentId_location: new Map<number, Location>([
                [3, 'Bribe'],
                [0, 'Delay']
            ])
        }
        expect(isTurnValid(Example.stateAfterTurn1, testTurn2)).toBe(false)
    })
    it('should return false when more agents were moved than the value of the new Bribe agent', () => {
        // try to assign agent 0 to Influence from initial state
        const testTurn1: Turn = {
            agentId_location: new Map<number, Location>([[0, 'Influence']])
        }
        expect(isTurnValid(Example.stateInitial, testTurn1)).toBe(false)
    })
})

describe('hasGameEnded', () => {
    it('should return false for initial state', () => {
        expect(hasGameEnded(true, Example.stateInitial)).toBe(false)
    })
    it('should return false for mid game state', () => {
        expect(hasGameEnded(false, Example.stateAfterTurn1)).toBe(false)
    })
    it('should return true if no delay agent is assigned after initial state', () => {
        expect(hasGameEnded(false, Example.stateInitial)).toBe(true)
    })
    it('should return true if there are not enough court agents left', () => {
        expect(hasGameEnded(false, Example.stateEnded)).toBe(true)
    })
})

// test that old agents are moved back to court
// test that it throws an error for an invalid move
describe('endTurn', () => {
    it('should throw an error when an invalid turn is attempted', () => {
        // try to move agent 5 from midgame state
        expect(() => getCurrentState(Example.sessionInvalid)).toThrow(
            'Invalid Move'
        )
    })
    it('should move old agents back to Court', () => {
        const state = getCurrentState(Example.sessionAfterTurn2)
        expect(state.agents[1].location).toBe('Court')
        expect(state.agents[2].location).toBe('Court')
    })
})
