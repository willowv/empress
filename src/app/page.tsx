import Game from './components/Game'

export default function Home() {
    // TODO: user selects date
    const todayWithTime: Date = new Date()
    const day: number = todayWithTime.getUTCDate()
    const month: number = todayWithTime.getUTCMonth()
    const year: number = todayWithTime.getUTCFullYear()
    const todayWithoutTime: Date = new Date(year, month, day)
    return <Game date={todayWithoutTime} />
}
