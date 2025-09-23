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
                    <div className="text-foreground text-md">{`${count} x`}</div>
                    <AgentPreview dieSize={dieSize} />
                </div>
            )
        })
    const targetScore = calculateTargetScore(mpDieSize_Count)
    return (
        <div
            id="dice-preview"
            className="flex flex-col items-center gap-2 rounded-lg p-2 backdrop-blur-xl"
        >
            <div className="text-foreground text-md text-center">
                {'Dice Preview'}
            </div>
            <div className="flex min-w-64 flex-row flex-wrap items-center justify-center gap-2">
                {[...previewDice]}
            </div>
            <div className="text-foreground text-center text-sm">{`Success: ${targetScore}`}</div>
        </div>
    )
}
