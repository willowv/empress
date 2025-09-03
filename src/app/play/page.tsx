import {
    addYears,
    dateOnlyString,
    ensureValidDate,
    getTodayWithoutTime
} from 'lib/util'
import SwipeNavigation from '@/ui/SwipeNavigation'
import ButtonLink from '@/ui/ButtonLink'
import { getDiceCounts } from '@/logic/empress'
import Scores from 'app/play/Scores'
import QueryParamDateSelector from '@/ui/QueryParamDateSelector'
import AgentPreview from '@/game/AgentPreview'
import Fortune from '@/svg/tarot/Fortune'

export default async function Page(props: {
    searchParams?: Promise<{
        date?: string
    }>
}) {
    const searchParams = await props.searchParams
    const dateString = searchParams?.date
    const selectedDate = ensureValidDate(dateString, getTodayWithoutTime())
    const oneYearAgo = addYears(getTodayWithoutTime(), -1)
    const [mpDieSize_Count] = getDiceCounts({
        date: selectedDate,
        seed: dateOnlyString(selectedDate),
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
    return (
        <div
            id="play-screen"
            className="not-motion-reduce:animate-slidefromright relative flex flex-col items-center select-none"
        >
            <div className="fill-gold bg-background max-h-screen">
                <SwipeNavigation>
                    <Fortune />
                </SwipeNavigation>
            </div>
            <div className="absolute top-15 left-1/2 -translate-x-1/2">
                <div className="flex flex-col items-center gap-2">
                    <QueryParamDateSelector
                        max={getTodayWithoutTime()}
                        min={oneYearAgo}
                    />
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
                    </div>
                    <div id="scores">
                        <Scores date={selectedDate} />
                    </div>
                </div>
            </div>
            <div
                id="button-play"
                className="absolute bottom-15 left-1/2 -translate-x-1/2"
            >
                <ButtonLink href={`/play/${dateOnlyString(selectedDate)}`}>
                    {'Play'}
                </ButtonLink>
            </div>
        </div>
    )
}
