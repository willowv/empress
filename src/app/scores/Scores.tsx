import { getTodayWithoutTime } from 'app/util'
import { getScoresByDate } from './data'

export default async function Scores() {
    const date = getTodayWithoutTime()
    const scores = await getScoresByDate(date)
    return (
        <div className="flex flex-col gap-2">
            {scores.map((score, index) => {
                return (
                    <div
                        key={index}
                        className="text-foreground text-md m-2 rounded-lg p-2 text-center backdrop-blur-xl"
                    >
                        {`${score.username} - ${score.score} in ${score.numTurns} turns`}
                    </div>
                )
            })}
        </div>
    )
}
