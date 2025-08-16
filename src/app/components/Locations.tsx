'use client'
import * as EG from '@/game/empress'
import { useState } from 'react'
import 'tailwindcss'
import Location from './Location'
import Delay from './Delay'

interface LocationsProps {
    readonly state: EG.State
    readonly handleNewMove: (move: EG.Move) => void
    readonly lockedAgentIds: number[]
}

export default function Locations({
    state,
    handleNewMove,
    lockedAgentIds
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
    return (
        <div className="flex flex-col items-start gap-4 sm:flex-row">
            <Location
                location="Court"
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
            <Location
                location="Bribe"
                selectedAgentId={selectedAgentId}
                agents={agents}
                handleAgentClick={handleAgentClick}
                handleLocationClick={handleLocationClick}
                lockedAgentIds={lockedAgentIds}
            />
            <Location
                location="Influence"
                selectedAgentId={selectedAgentId}
                agents={agents}
                handleAgentClick={handleAgentClick}
                handleLocationClick={handleLocationClick}
                lockedAgentIds={lockedAgentIds}
            />
        </div>
    )
}
