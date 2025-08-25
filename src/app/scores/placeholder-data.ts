interface Score {
    readonly id: number
    readonly username: string
    readonly score: number
    readonly numTurns: number
    readonly date: Date
}

export const scores: Score[] = [
    {
        id: 0,
        username: 'Trans Rights',
        score: 69,
        numTurns: 4,
        date: new Date(2025, 8, 25)
    },
    {
        id: 1,
        username: 'Trans Lefts',
        score: 63,
        numTurns: 3,
        date: new Date(2025, 8, 25)
    }
]
