import 'tailwindcss'
import Button from '@/ui/Button'
import Hourglass from '@/svg/Hourglass'

interface FooterProps {
    readonly isPlannedTurnValid: boolean
    readonly handleResetTurn: () => void
    readonly handleEndTurn: () => void
}

export default function Footer({
    isPlannedTurnValid,
    handleResetTurn,
    handleEndTurn
}: FooterProps) {
    // If the game is over, show end state
    return (
        <div className="flex basis-[100%] flex-row justify-between gap-2 sm:min-w-54 sm:basis-[10%]">
            <Button handleButtonPress={handleResetTurn} isDisabled={false}>
                {'Reset Turn'}
            </Button>
            <Button
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
    )
}
