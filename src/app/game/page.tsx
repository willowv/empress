import GameScreen from './GameScreen'
import { Suspense } from 'react'

export default function Page() {
    return (
        <Suspense>
            <GameScreen />
        </Suspense>
    )
}
