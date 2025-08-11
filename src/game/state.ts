import { Move } from "./move"

export type Location = 'Court' | 'Delay' | 'Bribe' | 'Influence'

export type Agent = {
    agentID: string,
    maxValue: number,
    curValue: number
}

export type State = {
    agentLocations: Map<Agent, Location>
}

export function getInitialState(date: Date) : State {
    // TODO: create all agents and assign them initial values
    return {
        agentLocations: new Map<Agent, Location>()
    }
}

export function isMoveValid(curState: State, move: Move) : boolean {
    /*
        TODO: apply actual logic below
        Only agents from Court were moved
        At most one agent moved to Delay
        At most one agent moved to Bribe
        The number of moved agents is less than or equal to the bribe agent’s value + 1 (or no moved agents, if no bribe agent)
        New Delay agent has higher value than old state Delay agent
    */
   return true;
}

export function getNextState(curState: State, move: Move) : State {
    // TODO: Validate move and apply to current state to get next state, or throw error
    if(isMoveValid(curState, move)){
        /*
        TODO: Implement end of turn side effects
        Move Delay and Bribe agents from previous state to Court
        Reroll values for all agents in Court
        */
        return {
            agentLocations: new Map<Agent, Location>()
        }
    }
    else throw new Error("Invalid Move");
}

export function getScore(curState: State) : number {
    // TODO: Calculate score by adding up values of agents assigned to Influence
    return 0;
}

export function hasGameEnded(curState: State) : boolean {
    // TODO: actual condition is not initial state and (no delay agent OR <= 1 court agents)
    return true;
}