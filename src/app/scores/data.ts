import postgres from 'postgres'

interface Score {
    readonly id: number
    readonly username: string
    readonly score: number
    readonly numTurns: number
    readonly date: Date
}

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' })

export async function getScoresByDate(date: Date) {
    // Simulate slow fetch for development
    await new Promise((resolve) => setTimeout(resolve, 3000))
    return await sql<Score[]>`
  SELECT *
  FROM scores
  WHERE scores.date = ${date.toISOString()}
  ORDER BY scores.score DESC
  LIMIT 10`
}
