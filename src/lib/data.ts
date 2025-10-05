import { getISODateOnlyString } from 'lib/util'
import postgres from 'postgres'

interface Score {
    readonly id: number
    readonly username: string
    readonly score: number
    readonly numturns: number
    readonly date: Date
}

interface ScoreStats {
    readonly count: number
    readonly min: number
    readonly max: number
}

interface Bucket {
    readonly bucket_number: number
    readonly frequency: number
}

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' })

export async function getTopNScoresByDate(date: Date, n: number) {
    return await sql<Score[]>`
  SELECT *
  FROM scores
  WHERE date = ${getISODateOnlyString(date)}
  ORDER BY score DESC, numturns ASC
  LIMIT ${n}`
}

export async function getScoreStatsByDate(date: Date) {
    const [row] = await sql<ScoreStats[]>`
    WITH today_scores AS (
    SELECT score
    FROM scores
    WHERE date = ${getISODateOnlyString(date)}
)
  SELECT COUNT(score), MIN(score), MAX(score)
  FROM today_scores`
    return [row.count, row.min, row.max]
}

export async function getScoreBucketsByDate(
    date: Date,
    min: number,
    max: number,
    numBuckets: number
) {
    return await sql<Bucket[]>`
  WITH buckets_cte AS (
    SELECT WIDTH_BUCKET(score, ${min}, ${max}, ${numBuckets}) AS bucket_number
    FROM scores
    WHERE date = ${getISODateOnlyString(date)}
)
SELECT
    bucket_number,
    COUNT(*) AS frequency
FROM
    buckets_cte
GROUP BY
    bucket_number
ORDER BY
    bucket_number DESC;`
}
