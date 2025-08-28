'use client'

import * as EG from '@/logic/empress'
import {
    createContext,
    startTransition,
    useActionState,
    useLayoutEffect,
    useState
} from 'react'
import Court from './locations/Court'
import Bribe from './locations/Bribe'
import Delay from './locations/Delay'
import Influence from './locations/Influence'
import Footer from './Footer'
import Chariot from '@/svg/tarot/Chariot'
import Button from '@/ui/Button'
import { dateOnlyString } from 'app/util'
import { SubmissionState, submitScore } from 'app/scores/actions'
import Hourglass from '@/svg/Hourglass'

interface GameProps {
    readonly date: Date
}

interface AnimationContextProps {
    readonly lastEndTurnAt: Date | undefined
}

export const AnimationContext = createContext<AnimationContextProps>({
    lastEndTurnAt: new Date(0)
})

export default function Game({ date }: GameProps) {
    const [curSession, setSession] = useState<EG.Session>(() => {
        return { seed: dateOnlyString(date), turnHistory: [] }
    })
    const [plannedTurn, setPlannedTurn] = useState<EG.Turn>(EG.getEmptyTurn())
    const [selectedAgentId, setSelectedAgentId] = useState<number | undefined>(
        undefined
    )
    const [lastEndTurnAt, setLastEndTurnAt] = useState<Date>(new Date(0))
    const [submissionState, submitAction, isSubmissionPending] =
        useActionState<SubmissionState>(
            (previousState) => submitScore(previousState, curSession, date),
            'initial'
        )

    useLayoutEffect(() => {
        // For updating animation context
        setLastEndTurnAt(new Date())
    }, [curSession])

    const curState = EG.getCurrentState(curSession)
    const isFirstTurn = curSession.turnHistory.length == 0
    const isGameOver = EG.hasGameEnded(isFirstTurn, curState)

    if (isGameOver) {
        let submitButtonContent
        if (isSubmissionPending)
            submitButtonContent = (
                <Hourglass className="fill-gold size-3 not-motion-reduce:animate-spin" />
            )
        else {
            switch (submissionState) {
                case 'initial':
                    submitButtonContent = 'Submit Score'
                    break
                case 'success':
                    submitButtonContent = 'Success!'
                    break
                case 'failure':
                    submitButtonContent = 'Submission Failed'
            }
        }
        const finalScore = EG.getScore(curState)
        const numTurns = curSession.turnHistory.length
        return (
            <div className="not-motion-reduce:animate-slidefrombottom relative h-screen select-none">
                <div className="fill-gold bg-background absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Chariot />
                </div>
                <div className="absolute top-1/2 left-1/2 w-100 -translate-x-1/2 -translate-y-1/2">
                    <div className="flex flex-col gap-2">
                        <div className="text-foreground text-md m-2 rounded-lg p-2 text-center backdrop-blur-xl">
                            {dateOnlyString(date)}
                        </div>
                        <div className="text-foreground m-2 rounded-lg p-2 text-center text-lg backdrop-blur-xl">
                            {'GAME OVER'}
                        </div>
                        <div className="text-foreground text-md m-2 rounded-lg p-2 text-center backdrop-blur-xl">
                            {`${finalScore} in ${numTurns} turns`}
                        </div>
                        <div className="flex flex-row justify-between gap-2">
                            <Button
                                isDisabled={false}
                                handleButtonPress={handlePlayAgain}
                            >
                                {'Play Again'}
                            </Button>
                            <Button
                                isDisabled={submissionState !== 'initial'}
                                handleButtonPress={() =>
                                    startTransition(submitAction)
                                }
                            >
                                {submitButtonContent}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
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

    function handleAgentClick(id: number) {
        if (lockedAgentIds.includes(id)) return

        if (selectedAgentId === id)
            // clicking selected agent
            setSelectedAgentId(undefined)
        else setSelectedAgentId(id)
    }

    function handleLocationClick(location: EG.Location) {
        if (
            selectedAgentId != undefined &&
            plannedState.agents[selectedAgentId].location != location
        ) {
            setSelectedAgentId(undefined)
            setPlannedTurn(
                EG.updateTurnWithMove(plannedTurn, {
                    agentId: selectedAgentId,
                    location
                })
            )
        }
    }

    function handlePlayAgain() {
        setSession({ seed: dateOnlyString(date), turnHistory: [] })
    }

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

    return (
        <AnimationContext value={{ lastEndTurnAt }}>
            <div className="select-none">
                <div className="flex flex-row flex-wrap justify-between gap-2 sm:h-[91vh] sm:flex-col sm:content-center sm:justify-center">
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
                    />
                    <Delay
                        lockedAgent={prevDelayAgent}
                        agent={nextDelayAgent}
                        isAgentSelected={
                            (nextDelayAgent?.id ?? -1) === selectedAgentId
                        }
                        handleAgentClick={handleAgentClick}
                        handleLocationClick={handleLocationClick}
                    />
                    <Bribe
                        agent={bribeAgent}
                        isAgentSelected={
                            (bribeAgent?.id ?? -1) === selectedAgentId
                        }
                        numAssignments={numAssignments}
                        handleAgentClick={handleAgentClick}
                        handleLocationClick={handleLocationClick}
                    />
                    <Footer
                        isPlannedTurnValid={isPlannedTurnValid}
                        handleResetTurn={handleResetTurn}
                        handleEndTurn={handleEndTurn}
                    />
                </div>
            </div>
        </AnimationContext>
    )
}
