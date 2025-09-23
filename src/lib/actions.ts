'use server'

import * as EG from '@/logic/empress'
import postgres from 'postgres'

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' })

export type SubmissionState = 'initial' | 'success' | 'failure'

export async function submitScore(
    previousState: SubmissionState,
    session: EG.Session,
    date: Date
) {
    if (previousState !== 'initial') return previousState // only send score once

    if (!EG.isSessionValid(session)) return 'failure'

    // calculate score and number of turns
    try {
        const finalState = EG.getCurrentState(session)
        const score = EG.getScore(finalState)
        const numTurns = session.turnHistory.length
        await sql`
    INSERT INTO scores (score, numturns, date)
    VALUES (${score}, ${numTurns}, ${date})`
        return 'success'
    } catch {
        return 'failure'
    }
}
