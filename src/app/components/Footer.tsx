import 'tailwindcss'
import Button from './ui/Button'
import Hourglass from './svg/Hourglass'

interface FooterProps {
    readonly isGameOver: boolean
    readonly isPlannedTurnValid: boolean
    readonly isPlannedTurnGameEnd: boolean
    readonly handlePlayAgain: () => void
    readonly handleResetTurn: () => void
    readonly handleEndTurn: () => void
}

export default function Footer({
    isGameOver,
    isPlannedTurnValid,
    handlePlayAgain,
    handleResetTurn,
    handleEndTurn
}: FooterProps) {
    // If the game is over, show end state
    if (isGameOver) {
        return (
            <div className="flex basis-[100%] flex-row justify-between gap-2 sm:w-54 sm:basis-[10%]">
                <div className="text-foreground flex h-8 items-center justify-center rounded-xl px-4 text-sm font-medium">
                    Game Over
                </div>
                <Button isDisabled={false} handleButtonPress={handlePlayAgain}>
                    <div className="text-foreground text-xs">
                        {'Play Again'}
                    </div>
                </Button>
            </div>
        )
    } else {
        return (
            <div className="flex basis-[100%] flex-row justify-between gap-2 sm:min-w-54 sm:basis-[10%]">
                <Button handleButtonPress={handleResetTurn} isDisabled={false}>
                    <div className="text-foreground text-xs">
                        {'Reset Turn'}
                    </div>
                </Button>
                <Button
                    isDisabled={!isPlannedTurnValid}
                    handleButtonPress={handleEndTurn}
                >
                    <div className="flex flex-row items-center gap-1">
                        <div className="text-foreground text-xs">
                            {'End Turn ('}
                        </div>
                        <div className="fill-gold size-2 -translate-y-1">
                            <Hourglass />
                        </div>
                        <div className="text-foreground text-xs">{')'}</div>
                    </div>
                </Button>
            </div>
        )
    }
}
