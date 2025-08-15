'use client'
import { State, Agent, Move } from '@/game/state'
import { useState } from 'react'
import 'tailwindcss'
import { LocationVisual } from './LocationVisual'

interface LocationsProps {
    readonly state: State
    readonly handleLocationClick: (move: Move) => void
    readonly lockedAgentIds: number[]
}

export function Locations({
    state,
    handleLocationClick,
    lockedAgentIds
}: LocationsProps) {
    const [selectedAgentId, setSelectedAgentId] = useState<number | null>(null)
    const agents: Agent[] = state.agents ?? []
    function handleAgentClick(id: number) {
        if (selectedAgentId === id)
            // clicking selected agent
            setSelectedAgentId(null)
        else setSelectedAgentId(id)
    }

    return (
        <div className="flex flex-col items-start gap-4 sm:flex-row">
            <LocationVisual
                location="Court"
                selectedAgentId={selectedAgentId}
                agents={agents}
                setSelectedAgentId={setSelectedAgentId}
                handleAgentClick={handleAgentClick}
                handleLocationClick={handleLocationClick}
                lockedAgentIds={lockedAgentIds}
            />
            <LocationVisual
                location="Delay"
                selectedAgentId={selectedAgentId}
                agents={agents}
                setSelectedAgentId={setSelectedAgentId}
                handleAgentClick={handleAgentClick}
                handleLocationClick={handleLocationClick}
                lockedAgentIds={lockedAgentIds}
            />
            <LocationVisual
                location="Bribe"
                selectedAgentId={selectedAgentId}
                agents={agents}
                setSelectedAgentId={setSelectedAgentId}
                handleAgentClick={handleAgentClick}
                handleLocationClick={handleLocationClick}
                lockedAgentIds={lockedAgentIds}
            />
            <LocationVisual
                location="Influence"
                selectedAgentId={selectedAgentId}
                agents={agents}
                setSelectedAgentId={setSelectedAgentId}
                handleAgentClick={handleAgentClick}
                handleLocationClick={handleLocationClick}
                lockedAgentIds={lockedAgentIds}
            />
        </div>
    )
}
