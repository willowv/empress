'use client'

import { dateOnlyString } from 'lib/util'
import GameSelectScreen from '@/screens/GameSelectScreen'
import { useRouter } from 'next/navigation'
export default function Home() {
    const router = useRouter()
    return (
        <GameSelectScreen
            handlePlay={(selectedDate) => {
                router.push(`/play/${dateOnlyString(selectedDate)}`)
            }}
        />
    )
}
