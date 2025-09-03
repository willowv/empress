import Hourglass from '@/svg/Hourglass'
import Chariot from '@/svg/tarot/Chariot'
import Button from '@/ui/Button'
import SwipeNavigation from '@/ui/SwipeNavigation'
import { dateOnlyString } from 'lib/util'
import { startTransition, useActionState } from 'react'
import { getCurrentState, getScore, Session } from '@/logic/empress'
import { SubmissionState, submitScore } from 'lib/actions'

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
    const numTurns = session.turnHistory.length
    return (
        <div className="not-motion-reduce:animate-slidefromtop relative flex flex-col items-center select-none">
            <div className="fill-gold bg-background max-h-screen">
                <SwipeNavigation>
                    <Chariot />
                </SwipeNavigation>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="flex flex-col gap-2">
                    <div className="text-foreground text-md m-2 rounded-lg p-2 text-center backdrop-blur-xl">
                        {dateOnlyString(date)}
                    </div>
                    <div className="text-foreground text-md m-2 rounded-lg p-2 text-center backdrop-blur-xl">
                        {'GAME OVER'}
                    </div>
                    <div className="text-foreground text-md m-2 rounded-lg p-2 text-center backdrop-blur-xl">
                        {`${finalScore} in ${numTurns} turns`}
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
                                submissionState !== 'initial' || finalScore == 0
                            }
                            handleButtonPress={() =>
                                startTransition(submitAction)
                            }
                        >
                            {isSubmissionPending ? (
                                <Hourglass className="fill-gold size-3 not-motion-reduce:animate-spin" />
                            ) : (
                                mpSubmissionState_Content[submissionState]
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
