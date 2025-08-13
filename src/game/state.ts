export type Location = 'Court' | 'Delay' | 'Bribe' | 'Influence'

export type Agent = {
    id: number,
    maxValue: number,
    curValue: number
}

export type State = {
    agentLocations: Map<Agent, Location>
}

export type Move = {
  newAgentLocations: Map<Agent, Location>
}

export function getEmptyMove() : Move {
  return {
    newAgentLocations: new Map<Agent, Location>
  }
}

export function getScoreIncrease(move: Move) : number {
    let score = 0;
    move.newAgentLocations.forEach((location, agent) => {
        if(location === "Influence")
            score += agent.curValue;
    })
    return score;
}

const AGENT_MAX_VALUES = [4, 4, 6, 6, 8, 8, 10, 12, 20];

export function getInitialState(rand: ()=>number) : State {
    // Create all agents and assign them initial values
    const agentLocations = new Map<Agent, Location>();
    AGENT_MAX_VALUES.forEach((maxValue, index) => {
        const agent : Agent = {
            id: index,
            curValue: Math.floor(rand() * maxValue) + 1, // should give a roll between 1 and maxValue
            maxValue: maxValue
        };
        agentLocations.set(agent, 'Court');
    })
    return { agentLocations: agentLocations };
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

export function endTurn(curState: State, move: Move, rand: ()=>number) : State {
    // If move is valid, execute end of turn effects and return the new state
    if(isMoveValid(curState, move)){
        const {agentLocations: prevAgentLocations} = curState;
        const {agentLocations: nextAgentLocations} = applyMove(curState, move);
        // Move agents previously on Delay or Bribe back to Court
        prevAgentLocations.forEach((location, agent) => {
            if(location === "Delay" || location === "Bribe")
                nextAgentLocations.set(agent, "Court");
        });
        // Re-roll values for all agents in Court
        nextAgentLocations.forEach((location, agent) => {
            if(location === "Court")
                agent.curValue = Math.floor(rand() * agent.maxValue) + 1;
        })
        return {agentLocations: nextAgentLocations};
    }
    else throw new Error("Invalid Move");
}

export function applyMove({agentLocations}: State, {newAgentLocations}: Move) : State {
    // Aply the changes from the move
    newAgentLocations.forEach((location, agent) => {
        agentLocations.set(agent, location);
    })
    return { agentLocations };
}

export function getScore({agentLocations}: State) : number {
    // Calculate score by adding up values of agents assigned to Influence
    let score = 0;
    agentLocations.forEach((location, agent) => {
        if(location === "Influence")
            score += agent.curValue;
    })
    return score;
}

export function hasGameEnded(curState: State) : boolean {
    // TODO: actual condition is not initial state and (no delay agent OR <= 1 court agents)
    return false;
}