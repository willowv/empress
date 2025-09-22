import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'
import { NextStepProvider, NextStep } from 'nextstepjs'
import TutorialCard from '@/ui/TutorialCard'
import ONBOARDING_STEPS from './tours'
import PageNavigation from '@/ui/PageNavigation'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin']
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin']
})

export const metadata: Metadata = {
    title: 'The Empress Returns',
    description: 'A dice game inspired by Tarot.',
    other: {
        version: `${process.env.npm_package_version}`
    }
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} min-w-xs antialiased`}
            >
                <NextStepProvider>
                    <NextStep
                        steps={ONBOARDING_STEPS}
                        showNextStep={true}
                        cardComponent={TutorialCard}
                        shadowOpacity="0.7"
                        shadowRgb="74,85,101"
                        cardTransition={{ duration: 1, type: 'spring' }}
                    >
                        <Analytics />
                        <PageNavigation>{children}</PageNavigation>
                    </NextStep>
                </NextStepProvider>
            </body>
        </html>
    )
}
