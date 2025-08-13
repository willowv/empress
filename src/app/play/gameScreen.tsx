'use client'

import { Session, appendMove, getCurrentState } from '@/game/session';
import { Agent, applyMove, getEmptyMove, getScore, isMoveValid, Move, State } from '@/game/state';
import { Dispatch, SetStateAction, useState } from 'react';

export interface GameScreenProps {
  date: Date;
}

export function GameScreen({ date }: GameScreenProps) {
    // TODO: Consider if session state should be at the level above this, since EndScreen will need it as well.
    const [curSession, setSession] = useState<Session>(()=>{
        return { seed: date.toUTCString(), moveHistory: []}
    })
    const [plannedMove, setPlannedMove] = useState<Move>(getEmptyMove());

    // We want to visualize the player's planned turn
    const curState = getCurrentState(curSession);
    const plannedState = applyMove(curState, plannedMove);
    
    // Get current score (not accounting for planned move)
    const curScore = getScore(curState.agentLocations);
    // Let's grab this so we can show the player how much their score will increase with this move
    const plannedScoreIncrease : number = getScore(plannedMove.newAgentLocations);

  return (
    <div>
        <p>Today&apos;s Date: {date.toLocaleDateString()}</p>
        <Locations
            state = {plannedState}
            setMove = {setPlannedMove}
        />
        <div className="flex gap-4 items-center flex-col">
        <p>Current Score: { curScore } + { plannedScoreIncrease }</p>
        <button
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            disabled={!isMoveValid(curState, plannedMove)}
            onClick={()=>{
                setSession(appendMove(curSession, plannedMove))
            }}
        >
            End Turn
        </button>
        <button
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            onClick={()=>{setPlannedMove(getEmptyMove)}}
        >
            Reset Turn
        </button>
        </div>
    </div>
  );
}

interface LocationsProps {
    state : State;
    setMove : Dispatch<SetStateAction<Move>>;
}

function Locations({state, setMove}:LocationsProps) {
    // Get Agent Locations
    let courtAgents : Agent[] = [];
    let delayAgents : Agent[] = [];
    let bribeAgents : Agent[] = [];
    let influenceAgents : Agent[] = [];
    state.agentLocations.forEach((location, agent) => {
        switch(location) {
            case 'Delay':
                delayAgents = [...delayAgents, agent];
                break;
            case 'Bribe':
                bribeAgents = [...bribeAgents, agent];
                break;
            case 'Influence':
                influenceAgents = [...influenceAgents, agent];
                break;
            case 'Court':
            default:
                courtAgents = [...courtAgents, agent];
        }
    })
    return (
        <div className="flex gap-4 items-center flex-col sm:flex-row">
            <div>
                <div>Court</div>
                {courtAgents.map((agent)=>AgentVisual(agent))}
            </div>
            <div>
                <div>Delay</div>
                {delayAgents.map((agent)=>AgentVisual(agent))}
            </div>
            <div>
                <div>Bribe</div>
                {bribeAgents.map((agent)=>AgentVisual(agent))}
            </div>
            <div>
                <div>Influence</div>
                {influenceAgents.map((agent)=>AgentVisual(agent))}
            </div>
        </div>
    );
}

function AgentVisual(agent: Agent) {
    // TODO: Make this prettier for the interaction stage
    return (
        <div key={agent.id}>
            <div>Agent {agent.id}</div>
            <div>{agent.curValue} / {agent.maxValue}</div>
        </div>
    );
}