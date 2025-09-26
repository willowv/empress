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
        <div className="border-gold bg-background text-foreground relative flex max-w-100 min-w-75 grow flex-col items-center gap-1 rounded-2xl border-2 p-2">
            <div className="text-left text-sm font-bold sm:text-base">
                {step.title}
            </div>
            <div className="absolute top-2 right-2 flex flex-row gap-2">
                <div className="text-right text-xs sm:text-sm">
                    {currentStep + 1} of {totalSteps}
                </div>
                <div
                    className="hover:text-gold text-right text-xs font-bold select-none sm:text-sm"
                    onClick={closeNextStep}
                >
                    {'x'}
                </div>
            </div>
            <div className="text-xs sm:text-sm">{step.content}</div>
            <div className="mt-2 flex flex-row flex-wrap justify-between gap-1">
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
            </div>
        </div>
    )
}
