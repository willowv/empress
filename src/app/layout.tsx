import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'
import LeftLink from '@/ui/LeftLink'
import RightLink from '@/ui/RightLink'
import { NextStepProvider, NextStep } from 'nextstepjs'
import TutorialCard from '@/ui/TutorialCard'
import ONBOARDING_STEPS from './tours'

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
                        <div className="flex min-h-screen flex-col gap-2 sm:flex-row sm:items-center sm:justify-center">
                            <div className="flex flex-row justify-between p-2 pb-1 sm:hidden">
                                <LeftLink />
                                <RightLink />
                            </div>
                            <div className="hidden sm:block">
                                <LeftLink />
                            </div>
                            <div className="max-w-3xl">{children}</div>
                            <div />
                            <div className="hidden sm:block">
                                <RightLink />
                            </div>
                        </div>
                    </NextStep>
                </NextStepProvider>
            </body>
        </html>
    )
}
