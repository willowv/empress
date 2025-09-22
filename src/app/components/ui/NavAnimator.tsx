'use client'

import { ReactNode, useContext } from 'react'
import { NavigationContext } from './Contexts'
import { navigationDirection } from 'lib/util'
import clsx from 'clsx'

interface NavAnimatorProps {
    readonly children: ReactNode
    readonly thisPage: string
}

export default function NavAnimator({ children, thisPage }: NavAnimatorProps) {
    const { lastPage } = useContext(NavigationContext)
    const navDirection = navigationDirection(thisPage, lastPage)
    return (
        <div
            className={clsx('relative flex flex-col items-center select-none', {
                'not-motion-reduce:animate-slidefromtop':
                    navDirection === 'top',
                'not-motion-reduce:animate-slidefromleft':
                    navDirection === 'left',
                'not-motion-reduce:animate-slidefromright':
                    navDirection === 'right'
            })}
        >
            {children}
        </div>
    )
}
