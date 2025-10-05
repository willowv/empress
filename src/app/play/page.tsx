import {
    addYears,
    getUTCISOString,
    ensureValidDate,
    getDateWithoutTime
} from 'lib/util'
import ButtonLink from '@/ui/ButtonLink'
import Scores from 'app/play/Scores'
import QueryParamDateSelector from '@/ui/QueryParamDateSelector'
import Fortune from '@/svg/tarot/Fortune'
import DicePreview from '../components/game/DicePreview'
import NavAnimator from 'app/components/navigation/NavAnimator'
import { Suspense } from 'react'

export default async function Page(props: {
    searchParams?: Promise<{
        date?: string
    }>
}) {
    const searchParams = await props.searchParams
    const dateString = searchParams?.date
    const selectedDate = ensureValidDate(
        dateString,
        getDateWithoutTime(new Date())
    )
    const oneYearAgo = addYears(getDateWithoutTime(new Date()), -1)
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
                        max={getDateWithoutTime(new Date())}
                        min={oneYearAgo}
                    />
                    <DicePreview date={selectedDate} />
                    <div id="scores" className="max-h-50 grow sm:max-h-60">
                        <Suspense>
                            <Scores date={selectedDate} />
                        </Suspense>
                    </div>
                    <div id="button-play" className="z-20">
                        <ButtonLink
                            href={`/game?date=${getUTCISOString(selectedDate)}`}
                        >
                            {'Play'}
                        </ButtonLink>
                    </div>
                </div>
            </div>
        </NavAnimator>
    )
}
