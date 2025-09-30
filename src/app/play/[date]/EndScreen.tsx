import Hourglass from '@/svg/Hourglass'
import Chariot from '@/svg/tarot/Chariot'
import Button from '@/ui/Button'
import { dateOnlyString } from 'lib/util'
import { startTransition, useActionState } from 'react'
import {
    calculateTargetScore,
    getCurrentState,
    getDiceCounts,
    getScore,
    Session
} from '@/logic/empress'
import { SubmissionState, submitScore } from 'lib/actions'
import ButtonLink from '@/ui/ButtonLink'
import DicePreview from '../DicePreview'

const mpSubmissionState_Content = {
    initial: 'Submit Score',
    success: 'Success!',
    failure: 'Submission Failed'
}

interface EndScreenProps {
    readonly session: Session
    readonly date: Date
    readonly handleTryAgain: () => void
}

export default function EndScreen({
    session,
    date,
    handleTryAgain
}: EndScreenProps) {
    const [submissionState, submitAction, isSubmissionPending] =
        useActionState<SubmissionState>(
            (previousState) => submitScore(previousState, session, date),
            'initial'
        )

    const finalScore = getScore(getCurrentState(session))
    const targetScore = calculateTargetScore(getDiceCounts(session))
    const numTurns = session.turnHistory.length
    const dateString = dateOnlyString(date)
    return (
        <div className="not-motion-reduce:animate-slidefromtop relative flex h-full flex-col items-center select-none">
            <div className="fill-gold bg-background w-full sm:h-screen">
                <Chariot />
            </div>
            <div className="absolute flex h-full max-w-120 flex-col items-center justify-center gap-2 p-5">
                <div className="text-foreground w-30 rounded-lg p-2 text-center text-base backdrop-blur-xl sm:w-40 sm:text-xl">
                    {dateString}
                </div>
                <DicePreview date={session.date} />
                <div className="flex flex-col gap-1 rounded-lg p-2 backdrop-blur-xl">
                    <div className="text-foreground text-center text-base sm:text-lg">
                        {'Your Score'}
                    </div>
                    <div className="text-foreground text-center text-sm sm:text-base">
                        {`${finalScore} in ${numTurns} turns`}
                    </div>
                </div>
                <div className="text-foreground m-2 rounded-lg p-2 text-center text-base backdrop-blur-xl">
                    {finalScore >= targetScore ? 'SUCCESS' : 'GAME OVER'}
                </div>
                <div className="flex flex-row justify-between gap-2">
                    <Button
                        isDisabled={submissionState !== 'initial'}
                        handleButtonPress={handleTryAgain}
                    >
                        {'Try Again'}
                    </Button>
                    <Button
                        isDisabled={
                            submissionState !== 'initial' ||
                            finalScore < targetScore
                        }
                        handleButtonPress={() => startTransition(submitAction)}
                    >
                        {isSubmissionPending ? (
                            <Hourglass className="fill-gold size-3 not-motion-reduce:animate-spin" />
                        ) : (
                            mpSubmissionState_Content[submissionState]
                        )}
                    </Button>
                </div>
            </div>
            <div className="absolute bottom-15 left-1/2 z-10 -translate-x-1/2">
                <ButtonLink href={`/play?date=${dateString}`}>
                    {'Back'}
                </ButtonLink>
            </div>
        </div>
    )
}
