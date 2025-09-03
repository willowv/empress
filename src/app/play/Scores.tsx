import * as Data from 'lib/data'

interface ScoresProps {
    readonly date: Date
}

export default async function Scores({ date }: ScoresProps) {
    // Different display based on number of scores for this day
    // >10 scores: histogram
    // <10 scores: current top 10
    // No scores: 'there are no scores yet! be the first'
    // Get count of scores for this date
    const [count, min, max] = await Data.getScoreStatsByDate(date)
    if (count == 0)
        return (
            <div className="flex flex-col items-center gap-2">
                <div className="text-foreground text-md m-2 rounded-lg p-2 text-center backdrop-blur-xl">
                    {'No scores yet!'}
                </div>
            </div>
        )

    // Don't bother with histogram for small count or overly tight buckets
    if (count < 10 || max - min < 5) {
        // What are the current top 5 scores?
        const scores = await Data.getTopNScoresByDate(date, 5)
        return (
            <div className="flex flex-col gap-1 rounded-lg p-2 backdrop-blur-xl">
                <div className="text-foreground text-md text-center">
                    {'Top 5 Scores'}
                </div>
                {scores.map((score, index) => {
                    return (
                        <div
                            key={index}
                            className="text-foreground text-md text-center"
                        >
                            {`#${index + 1} | ${score.score} in ${score.numturns} turns`}
                        </div>
                    )
                })}
            </div>
        )
    }

    const NUM_BUCKETS = 5
    const adjustedMax = max + 1 // This ensures that the top bucket includes our max score
    const bucketIncrement = Math.ceil((adjustedMax - min) / NUM_BUCKETS)
    const adjustedMin = adjustedMax - bucketIncrement * NUM_BUCKETS
    const buckets = await Data.getScoreBucketsByDate(
        date,
        adjustedMin,
        adjustedMax,
        NUM_BUCKETS
    )

    const bucketElements = buckets.map((bucket, index) => {
        const bucketMin = Math.round(
            adjustedMin + bucketIncrement * (bucket.bucket_number - 1)
        )
        const bucketMax = Math.round(bucketMin + bucketIncrement - 1)
        const range: string =
            bucketMin == bucketMax
                ? `${bucketMin}`
                : `${bucketMax}-${bucketMin}`
        return (
            <div
                key={`score-${index}`}
                className="text-foreground text-md text-right"
            >
                {`${range} | ${bucket.frequency} players`}
            </div>
        )
    })
    return (
        <div className="flex flex-col gap-1 rounded-lg p-2 backdrop-blur-xl">
            <div className="text-foreground text-md text-center">
                {'Scores'}
            </div>
            {bucketElements}
        </div>
    )
}
