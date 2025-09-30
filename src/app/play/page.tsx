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
                className="relative flex h-full flex-col items-center select-none"
            >
                <div className="fill-gold bg-background w-full sm:h-screen">
                    <Fortune />
                </div>
                <div className="absolute flex h-full max-w-120 flex-col items-center justify-center gap-2 p-5">
                    <QueryParamDateSelector
                        max={getTodayWithoutTime()}
                        min={oneYearAgo}
                    />
                    <DicePreview date={selectedDate} />
                    <div id="scores" className="max-h-50 grow sm:max-h-60">
                        <Scores date={selectedDate} />
                    </div>
                    <div id="button-play" className="z-20">
                        <ButtonLink
                            href={`/play/${dateOnlyString(selectedDate)}`}
                        >
                            {'Play'}
                        </ButtonLink>
                    </div>
                </div>
            </div>
        </NavAnimator>
    )
}
