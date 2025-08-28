import { dateOnlyString, getTodayWithoutTime } from 'app/util'
import * as Data from './data'

export default async function Scores() {
    // Different display based on number of scores for this day
    // >10 scores: histogram
    // <10 scores: current top 10
    // No scores: 'there are no scores yet! be the first'
    // Get count of scores for this date
    const date = getTodayWithoutTime()
    const [count, min, max] = await Data.getScoreStatsByDate(date)
    // TODO: Scores animation
    if (count == 0)
        return (
            <div className="flex flex-col gap-2">
                <div className="text-foreground text-md m-2 rounded-lg p-2 text-center backdrop-blur-xl">
                    {dateOnlyString(date)}
                </div>
                <div className="text-foreground text-md m-2 rounded-lg p-2 text-center backdrop-blur-xl">
                    {'There are no scores recorded yet for today!'}
                </div>
            </div>
        )

    // Don't bother with histogram for small count or overly tight buckets
    if (count < 10 || max - min < 5) {
        // What are the current top 5 scores?
        const scores = await Data.getTopNScoresByDate(date, 5)
        return (
            <div className="flex flex-col gap-2">
                <div className="text-foreground text-md m-2 rounded-lg p-2 text-center backdrop-blur-xl">
                    {dateOnlyString(date)}
                </div>
                {scores.map((score, index) => {
                    return (
                        <div
                            key={index}
                            className="text-foreground text-md m-2 rounded-lg p-2 text-center backdrop-blur-xl"
                        >
                            {`${score.score} in ${score.numturns} turns`}
                        </div>
                    )
                })}
            </div>
        )
    }

    const buckets = await Data.getScoreBucketsByDate(date, min, max, 5)
    const bucketIncrement = (max - min) / 5
    return (
        <div className="flex flex-col gap-2">
            <div className="text-foreground text-md m-2 rounded-lg p-2 text-center backdrop-blur-xl">
                {dateOnlyString(date)}
            </div>
            {buckets.map((bucket, index) => {
                const bucketMin = Math.floor(min + bucketIncrement * index)
                const bucketMax = Math.floor(
                    min + bucketIncrement * (index + 1) - 1
                )
                return (
                    <div
                        key={index}
                        className="text-foreground text-md m-2 rounded-lg p-2 text-center backdrop-blur-xl"
                    >
                        {`${bucketMin}-${bucketMax} | ${bucket.frequency} players`}
                    </div>
                )
            })}
        </div>
    )
}
