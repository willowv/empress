import 'tailwindcss'
import Button from './Button'

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
    isPlannedTurnGameEnd,
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
                <Button
                    text="Play Again"
                    isDisabled={false}
                    handleButtonPress={handlePlayAgain}
                />
            </div>
        )
    } else {
        return (
            <div className="flex basis-[100%] flex-row justify-between gap-2 sm:w-54 sm:basis-[10%]">
                <Button
                    handleButtonPress={handleResetTurn}
                    text="Reset Turn"
                    isDisabled={false}
                />
                <Button
                    isDisabled={!isPlannedTurnValid}
                    handleButtonPress={handleEndTurn}
                    text={isPlannedTurnGameEnd ? 'End Game' : 'End Turn'}
                />
            </div>
        )
    }
}
