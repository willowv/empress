'use client'

import { useNextStep, type CardComponentProps } from 'nextstepjs'
import 'tailwindcss'
import Button from './Button'

export default function TutorialCard({
    step,
    currentStep,
    totalSteps,
    nextStep,
    prevStep
}: CardComponentProps) {
    // Onborda hooks
    const { closeNextStep } = useNextStep()
    return (
        <div className="border-gold bg-background text-foreground relative flex grow flex-col items-center gap-1 rounded-2xl border-2 p-2">
            <div className="text-left text-sm font-bold">{step.title}</div>
            <div className="absolute top-2 right-2 text-right text-xs">
                {currentStep + 1} of {totalSteps}
            </div>

            <div className="text-xs">{step.content}</div>
            <div className="mt-2 flex flex-row justify-between gap-1">
                {currentStep !== 0 && (
                    <Button handleButtonPress={() => prevStep()}>
                        Previous
                    </Button>
                )}
                {currentStep + 1 !== totalSteps && (
                    <Button handleButtonPress={() => nextStep()}>Next</Button>
                )}
                {currentStep + 1 === totalSteps && (
                    <Button handleButtonPress={closeNextStep}>
                        🎉 Finish!
                    </Button>
                )}
                {currentStep + 1 !== totalSteps && (
                    <Button handleButtonPress={closeNextStep}>Close</Button>
                )}
            </div>
        </div>
    )
}
