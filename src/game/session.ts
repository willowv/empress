import { hash_cyrb53, random_splitmix32 } from '@/externals/random'
import {endTurn, getInitialState, Move, State} from './state'

export type Session = {
    seed: string,
    moveHistory: Move[]
}

export function getCurrentState (session: Session) : State {
    const rand = random_splitmix32(hash_cyrb53(session.seed));
    const initialState = getInitialState(rand);
    let curState = initialState;
    session.moveHistory.forEach((move) => {
        curState = endTurn(curState, move, rand);
    })
    return curState;
}

export function appendMove (session: Session, move: Move) : Session {
    return {
        seed: session.seed,
        moveHistory: [...session.moveHistory, move]
    }
}

export function isSessionValid (session: Session) : boolean {
    // TODO: Check if initial state is correct, then if each move is valid sequentially
    return true;
}