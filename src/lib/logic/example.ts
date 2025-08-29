import { State, Turn, Location, Session, getCurrentState } from './empress'

const seed: string = 'test'
const date: Date = new Date(0)
const sessionInitial: Session = { date, seed, turnHistory: [] }
export const stateInitial: State = getCurrentState(sessionInitial)
export const turn1Valid: Turn = {
    agentId_location: new Map<number, Location>([
        [2, 'Bribe'],
        [1, 'Delay'],
        [5, 'Influence'],
        [8, 'Influence']
    ])
}
const sessionAfterTurn1: Session = {
    date,
    seed,
    turnHistory: [turn1Valid]
}
export const stateAfterTurn1: State = getCurrentState(sessionAfterTurn1)
const turn1Endgame: Turn = {
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
const sessionEnded: Session = {
    date,
    seed,
    turnHistory: [turn1Endgame]
}
export const stateEnded: State = getCurrentState(sessionEnded)
const turn2Invalid: Turn = {
    agentId_location: new Map<number, Location>([[5, 'Bribe']])
}
export const sessionInvalid: Session = {
    date,
    seed,
    turnHistory: [turn1Valid, turn2Invalid]
}
const turn2Valid: Turn = {
    agentId_location: new Map<number, Location>([
        [4, 'Delay'],
        [3, 'Bribe'],
        [6, 'Influence'],
        [7, 'Influence']
    ])
}
export const sessionAfterTurn2: Session = {
    date,
    seed,
    turnHistory: [turn1Valid, turn2Valid]
}
export const stateAfterTurn2: State = getCurrentState(sessionAfterTurn2)
