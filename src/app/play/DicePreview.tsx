import AgentPreview from '@/game/AgentPreview'
import { calculateTargetScore, getDiceCounts } from '@/logic/empress'
import { dateOnlyString } from 'lib/util'

interface DicePreviewProps {
    readonly date: Date
}

export default function DicePreview({ date }: DicePreviewProps) {
    const mpDieSize_Count = getDiceCounts({
        date: date,
        seed: dateOnlyString(date),
        turnHistory: []
    })
    const previewDice = mpDieSize_Count
        .entries()
        .map(([dieSize, count], index) => {
            if (count == 0) return
            return (
                <div
                    key={`preview-${index}`}
                    className="flex flex-row items-center gap-1"
                >
                    <div className="text-foreground text-base">{`${count} x`}</div>
                    <AgentPreview dieSize={dieSize} />
                </div>
            )
        })
    const targetScore = calculateTargetScore(mpDieSize_Count)
    return (
        <div
            id="dice-preview"
            className="flex flex-col items-center gap-2 rounded-lg p-2 backdrop-blur-xl sm:gap-4"
        >
            <div className="text-foreground text-center text-base sm:text-lg">
                {'Dice Preview'}
            </div>
            <div className="flex w-60 flex-row flex-wrap items-center justify-center gap-2 sm:w-80">
                {[...previewDice]}
            </div>
            <div className="text-foreground text-center text-sm sm:text-base">{`Success | ${targetScore}+`}</div>
        </div>
    )
}
