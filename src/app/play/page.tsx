import {
    addYears,
    dateOnlyString,
    ensureValidDate,
    getTodayWithoutTime
} from 'lib/util'
import ButtonLink from '@/ui/ButtonLink'
import Scores from 'app/play/Scores'
import QueryParamDateSelector from '@/ui/QueryParamDateSelector'
import Fortune from '@/svg/tarot/Fortune'
import DicePreview from './DicePreview'
import NavAnimator from 'app/components/navigation/NavAnimator'

export default async function Page(props: {
    searchParams?: Promise<{
        date?: string
    }>
}) {
    const searchParams = await props.searchParams
    const dateString = searchParams?.date
    const selectedDate = ensureValidDate(dateString, getTodayWithoutTime())
    const oneYearAgo = addYears(getTodayWithoutTime(), -1)
    return (
        <NavAnimator thisPage="/play">
            <div
                id="play-screen"
                className="relative flex flex-col items-center select-none"
            >
                <div className="fill-gold bg-background max-h-screen">
                    <Fortune />
                </div>
                <div className="absolute top-15 left-1/2 -translate-x-1/2">
                    <div className="flex flex-col items-center gap-2">
                        <QueryParamDateSelector
                            max={getTodayWithoutTime()}
                            min={oneYearAgo}
                        />
                        <DicePreview date={selectedDate} />
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
        </NavAnimator>
    )
}
