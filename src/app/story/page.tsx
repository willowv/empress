'use client'

import StoryScreen from '@/screens/StoryScreen'
import { useRouter } from 'next/navigation'

export default function Home() {
    const router = useRouter()
    return <StoryScreen handleBackButton={() => router.push('/')} />
}
