'use client'
import * as EG from '@/game/empress'
import { useState } from 'react'
import 'tailwindcss'
import Location from './Location'

interface LocationsProps {
    readonly state: EG.State
    readonly handleLocationClick: (move: EG.Move) => void
    readonly lockedAgentIds: number[]
}

export default function Locations({
    state,
    handleLocationClick,
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

    return (
        <div className="flex flex-col items-start gap-4 sm:flex-row">
            <Location
                location="Court"
                selectedAgentId={selectedAgentId}
                agents={agents}
                setSelectedAgentId={setSelectedAgentId}
                handleAgentClick={handleAgentClick}
                handleLocationClick={handleLocationClick}
                lockedAgentIds={lockedAgentIds}
            />
            <Location
                location="Delay"
                selectedAgentId={selectedAgentId}
                agents={agents}
                setSelectedAgentId={setSelectedAgentId}
                handleAgentClick={handleAgentClick}
                handleLocationClick={handleLocationClick}
                lockedAgentIds={lockedAgentIds}
            />
            <Location
                location="Bribe"
                selectedAgentId={selectedAgentId}
                agents={agents}
                setSelectedAgentId={setSelectedAgentId}
                handleAgentClick={handleAgentClick}
                handleLocationClick={handleLocationClick}
                lockedAgentIds={lockedAgentIds}
            />
            <Location
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
