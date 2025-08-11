import { Move } from './move'
import {getInitialState, State} from './state'

export type Session = {
    date: Date,
    initialState: State
    moveHistory: Move[]
}

export function createSession (date : Date) : Session {
    return {
        date: date,
        initialState: getInitialState(date),
        moveHistory: []
    }
}

export function getLastState (session: Session) : State {
    // TODO: Process move history against initial state and return the result
    return session.initialState;
}

export function isSessionValid (session: Session) : boolean {
    // TODO: Check if initial state is correct, then if each move is valid sequentially
    return true;
}