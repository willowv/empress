'use client'
import * as EG from '@/game/empress'
import { useState } from 'react'
import 'tailwindcss'
import Influence from './Influence'
import Delay from './Delay'
import Bribe from './Bribe'
import Court from './Court'

interface LocationsProps {
    readonly state: EG.State
    readonly handleNewMove: (move: EG.Move) => void
    readonly lockedAgentIds: number[]
    readonly numAssignments: number
}

export default function Locations({
    state,
    handleNewMove,
    lockedAgentIds,
    numAssignments
}: LocationsProps) {
    const [selectedAgentId, setSelectedAgentId] = useState<number | null>(null)
    const agents: EG.Agent[] = state.agents ?? []
    function handleAgentClick(id: number) {
        if (selectedAgentId === id)
            // clicking selected agent
            setSelectedAgentId(null)
        else setSelectedAgentId(id)
    }

    function handleLocationClick(location: EG.Location) {
        if (
            selectedAgentId != null &&
            agents[selectedAgentId].location != location
        ) {
            setSelectedAgentId(null)
            handleNewMove({
                agentId: selectedAgentId,
                location: location
            })
        }
    }

    const prevDelayAgent =
        agents.find(
            (agent) =>
                agent.location == 'Delay' && lockedAgentIds.includes(agent.id)
        ) ?? null
    const nextDelayAgent =
        agents.find(
            (agent) =>
                agent.location == 'Delay' && !lockedAgentIds.includes(agent.id)
        ) ?? null

    const bribeAgent = agents.find((agent) => agent.location == 'Bribe') ?? null
    return (
        <div>
            <div className="flex flex-row flex-wrap justify-center gap-2 sm:flex-row">
                <Court
                    selectedAgentId={selectedAgentId}
                    agents={agents}
                    handleAgentClick={handleAgentClick}
                    handleLocationClick={handleLocationClick}
                    lockedAgentIds={lockedAgentIds}
                />
                <Influence
                    selectedAgentId={selectedAgentId}
                    agents={agents}
                    handleAgentClick={handleAgentClick}
                    handleLocationClick={handleLocationClick}
                    lockedAgentIds={lockedAgentIds}
                />
                <Delay
                    prevAgent={prevDelayAgent}
                    nextAgent={nextDelayAgent}
                    selectedAgentId={selectedAgentId}
                    handleAgentClick={handleAgentClick}
                    handleLocationClick={handleLocationClick}
                />
                <Bribe
                    agent={bribeAgent}
                    selectedAgentId={selectedAgentId}
                    numAssignments={numAssignments}
                    handleAgentClick={handleAgentClick}
                    handleLocationClick={handleLocationClick}
                />
            </div>
        </div>
    )
}
