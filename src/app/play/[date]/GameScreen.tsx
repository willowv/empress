'use client'

import * as EG from '@/logic/empress'
import { useLayoutEffect, useState } from 'react'
import Court from '@/game/locations/Court'
import Bribe from '@/game/locations/Bribe'
import Delay from '@/game/locations/Delay'
import Influence from '@/game/locations/Influence'
import Button from '@/ui/Button'
import { dateOnlyString } from 'lib/util'
import Hourglass from '@/svg/Hourglass'
import EndScreen from './EndScreen'
import { useNextStep } from 'nextstepjs'
import {
    DndContext,
    DragOverlay,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core'
import Agent from '@/game/Agent'
import ButtonLink from '@/ui/ButtonLink'
import { AnimationContext } from '@/ui/AnimationContext'
import _ from 'lodash'

interface GameProps {
    readonly date: Date
}

function getSeed(date: Date): number {
    const currentDateTime = new Date()
    const seedDate = _.cloneDeep(date)
    seedDate.setHours(currentDateTime.getUTCHours())
    seedDate.setMinutes(currentDateTime.getUTCMinutes())
    seedDate.setSeconds(currentDateTime.getUTCSeconds())
    seedDate.setMilliseconds(currentDateTime.getUTCMilliseconds())
    return seedDate.valueOf()
}

export default function GameScreen({ date }: GameProps) {
    const dateString = dateOnlyString(date)
    const { startNextStep } = useNextStep()
    const [curSession, setSession] = useState<EG.Session>(() => {
        return {
            date: date,
            seed: getSeed(date).toString(),
            turnHistory: []
        }
    })
    const [plannedTurn, setPlannedTurn] = useState<EG.Turn>(EG.getEmptyTurn())
    const [selectedAgentId, setSelectedAgentId] = useState<number | undefined>(
        undefined
    )
    const [lastEndTurnAt, setLastEndTurnAt] = useState<Date>(new Date(0))

    useLayoutEffect(() => {
        // For updating animation context
        setLastEndTurnAt(new Date())
    }, [curSession])

    const mouseSensor = useSensor(MouseSensor, {
        // Require the mouse to move by 10 pixels before activating
        activationConstraint: {
            distance: 10
        }
    })
    const touchSensor = useSensor(TouchSensor, {
        // Press delay of 250ms, with tolerance of 5px of movement
        activationConstraint: {
            delay: 250,
            tolerance: 5
        }
    })
    const sensors = useSensors(mouseSensor, touchSensor)

    const targetScore = EG.calculateTargetScore(EG.getDiceCounts(curSession))
    const curState = EG.getCurrentState(curSession)
    const isFirstTurn = curSession.turnHistory.length == 0
    const isGameOver = EG.hasGameEnded(isFirstTurn, curState)

    if (isGameOver) {
        return (
            <EndScreen
                session={curSession}
                date={date}
                handleTryAgain={() =>
                    setSession({ ...curSession, turnHistory: [] })
                }
            />
        )
    }

    const plannedState = EG.applyTurn(curState, plannedTurn)
    const isPlannedTurnValid = EG.isTurnValid(curState, plannedTurn)

    // Which agents are locked?
    // Agents previously assigned to non-Court locations
    const lockedAgentIds = curState.agents
        .filter((agent) => agent.location !== 'Court' || isGameOver)
        .map((agent) => agent.id)

    const numAssignments = EG.numNonBribeAssignments(curState, plannedTurn)

    function handleEndTurn() {
        setSession(EG.appendTurn(curSession, plannedTurn))
        setPlannedTurn(EG.getEmptyTurn)
    }

    function handleResetTurn() {
        setPlannedTurn(EG.getEmptyTurn)
    }

    const prevDelayAgent = plannedState.agents.find(
        (agent) =>
            agent.location == 'Delay' && lockedAgentIds.includes(agent.id)
    )
    const nextDelayAgent = plannedState.agents.find(
        (agent) =>
            agent.location == 'Delay' && !lockedAgentIds.includes(agent.id)
    )
    const bribeAgent = plannedState.agents.find(
        (agent) => agent.location == 'Bribe'
    )
    const courtAgents = plannedState.agents.filter(
        (agent) => agent.location === 'Court'
    )
    const influenceAgents = plannedState.agents.filter(
        (agent) => agent.location === 'Influence'
    )

    const selectedAgent =
        selectedAgentId == undefined
            ? undefined
            : plannedState.agents[selectedAgentId]

    function handleAgentClick(id: number) {
        if (lockedAgentIds.includes(id)) return

        if (selectedAgentId === id)
            // clicking selected agent
            setSelectedAgentId(undefined)
        else if (selectedAgent === undefined) setSelectedAgentId(id)
        // Tapping another assigned agent should swap them
        else {
            const targetAgent = plannedState.agents[id]
            // If they're in the same location, change selection
            if (selectedAgent.location === targetAgent.location)
                setSelectedAgentId(id)
            // If the target location is Delay, check whether a swap is a valid move
            else if (
                (targetAgent.location === 'Delay' &&
                    (prevDelayAgent?.curValue ?? 0) >=
                        selectedAgent.curValue) ||
                (selectedAgent.location === 'Delay' &&
                    (prevDelayAgent?.curValue ?? 0) >= targetAgent.curValue)
            ) {
                //TODO: trigger a red shaking animation to show it can't go there
                return
            } else {
                const move1 = {
                    agentId: selectedAgent.id,
                    location: targetAgent.location
                }
                const move2 = {
                    agentId: targetAgent.id,
                    location: selectedAgent.location
                }
                const updatedTurn = EG.updateTurnWithMove(
                    EG.updateTurnWithMove(plannedTurn, move1),
                    move2
                )
                setSelectedAgentId(undefined)
                setPlannedTurn(updatedTurn)
            }
        }
    }

    function handleLocationClick(location: EG.Location) {
        if (selectedAgent == undefined) return
        if (selectedAgent.location === location) {
            setSelectedAgentId(undefined)
            return
        }
        if (
            location === 'Delay' &&
            (prevDelayAgent?.curValue ?? 0) >= selectedAgent.curValue
        ) {
            //TODO: trigger a red shaking animation to show it can't go there
            return
        }

        setSelectedAgentId(undefined)
        setPlannedTurn(
            EG.updateTurnWithMove(plannedTurn, {
                agentId: selectedAgent.id,
                location
            })
        )
    }

    const mpId_Location: Record<string, EG.Location> = {
        'location-bribe': 'Bribe',
        'location-court': 'Court',
        'location-delay': 'Delay',
        'location-influence': 'Influence'
    }
    return (
        <DndContext
            sensors={sensors}
            onDragStart={(e) => {
                const agentId = e.active.id.toString().split('-')[1]
                setSelectedAgentId(parseInt(agentId))
            }}
            onDragEnd={(e) => {
                if (!e.over) return
                handleLocationClick(mpId_Location[e.over.id])
            }}
        >
            <DragOverlay>
                {selectedAgent && (
                    <Agent
                        agent={selectedAgent}
                        handleAgentClick={() => {}}
                        state="selected"
                    />
                )}
            </DragOverlay>
            <AnimationContext value={{ lastEndTurnAt }}>
                <div className="not-motion-reduce:animate-slidefrombottom flex h-full flex-col justify-center gap-0.5 pt-5 sm:gap-2 sm:pt-0">
                    <div className="flex flex-col justify-between gap-0.5 sm:flex-row sm:gap-2">
                        <Court
                            selectedAgentId={selectedAgentId}
                            agents={courtAgents}
                            handleAgentClick={handleAgentClick}
                            handleLocationClick={handleLocationClick}
                            lockedAgentIds={lockedAgentIds}
                        />
                        <Influence
                            selectedAgentId={selectedAgentId}
                            agents={influenceAgents}
                            handleAgentClick={handleAgentClick}
                            handleLocationClick={handleLocationClick}
                            lockedAgentIds={lockedAgentIds}
                            targetScore={targetScore}
                        />
                    </div>
                    <div className="flex flex-row gap-0.5 sm:gap-2">
                        <Delay
                            lockedAgent={prevDelayAgent}
                            agent={nextDelayAgent}
                            selectedAgent={selectedAgent}
                            handleAgentClick={handleAgentClick}
                            handleLocationClick={handleLocationClick}
                        />
                        <Bribe
                            agent={bribeAgent}
                            selectedAgent={selectedAgent}
                            numAssignments={numAssignments}
                            handleAgentClick={handleAgentClick}
                            handleLocationClick={handleLocationClick}
                        />
                    </div>
                    <div className="flex flex-row flex-wrap items-center justify-center gap-2">
                        <div className="order-1">
                            <Button
                                id="button-reset-turn"
                                handleButtonPress={handleResetTurn}
                            >
                                {'Reset Turn'}
                            </Button>
                        </div>
                        <div className="order-2">
                            <ButtonLink href={`/play?date=${dateString}`}>
                                {'Quit'}
                            </ButtonLink>
                        </div>
                        <div className="order-3 sm:order-4">
                            <Button
                                id="button-end-turn"
                                isDisabled={!isPlannedTurnValid}
                                handleButtonPress={handleEndTurn}
                            >
                                <div className="flex flex-row items-center gap-1">
                                    <div>{'End Turn ('}</div>
                                    <div className="fill-gold size-2 -translate-y-1">
                                        <Hourglass />
                                    </div>
                                    <div>{')'}</div>
                                </div>
                            </Button>
                        </div>
                        <div className="order-4 sm:order-3">
                            <Button
                                handleButtonPress={() =>
                                    startNextStep('game-tutorial')
                                }
                            >
                                {'How to Play'}
                            </Button>
                        </div>
                    </div>
                </div>
            </AnimationContext>
        </DndContext>
    )
}
