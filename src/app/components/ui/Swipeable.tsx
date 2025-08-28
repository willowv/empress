'use client'

import React, { ReactNode, useState } from 'react'

interface SwipeableProps {
    children: ReactNode
    onSwipeLeft?: () => void
    onSwipeRight?: () => void
    onSwipeUp?: () => void
    onSwipeDown?: () => void
}

// https://stackoverflow.com/questions/70612769/how-do-i-recognize-swipe-events-in-react
export default function Swipeable(props: SwipeableProps) {
    const [touchStartX, setTouchStartX] = useState<number | undefined>(
        undefined
    )
    const [touchEndX, setTouchEndX] = useState<number | undefined>(undefined)

    const [touchStartY, setTouchStartY] = useState<number | undefined>(
        undefined
    )
    const [touchEndY, setTouchEndY] = useState<number | undefined>(undefined)

    const minSwipeDistance = 50

    function onTouchStart(e: React.TouchEvent<HTMLDivElement>) {
        e.preventDefault()
        setTouchEndX(undefined)
        setTouchStartX(e.targetTouches[0].clientX)

        setTouchEndY(undefined)
        setTouchStartY(e.targetTouches[0].clientY)
    }

    function onTouchMove(e: React.TouchEvent<HTMLDivElement>) {
        e.preventDefault()
        setTouchEndX(e.targetTouches[0].clientX)
        setTouchEndY(e.targetTouches[0].clientY)
    }

    function onTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
        e.preventDefault()
        if (touchStartX && touchEndX) {
            const xDistance = touchStartX - touchEndX
            const yDistance = (touchStartY ?? 0) - (touchEndY ?? 0)
            if (Math.abs(yDistance) >= Math.abs(xDistance)) {
                return
            }

            const isLeftSwipe = xDistance > minSwipeDistance
            const isRightSwipe = xDistance < -minSwipeDistance

            if (isLeftSwipe && props.onSwipeLeft) {
                props.onSwipeLeft()
            }

            if (isRightSwipe && props.onSwipeRight) {
                props.onSwipeRight()
            }
        }
        if (touchStartY && touchEndY) {
            const xDistance = (touchStartX ?? 0) - (touchEndX ?? 0)
            const yDistance = touchStartY - touchEndY
            if (Math.abs(xDistance) >= Math.abs(yDistance)) {
                return
            }

            const isUpSwipe = yDistance > minSwipeDistance
            const isDownSipe = yDistance < -minSwipeDistance

            if (isDownSipe && props.onSwipeDown) {
                props.onSwipeDown()
            }

            if (isUpSwipe && props.onSwipeUp) {
                props.onSwipeUp()
            }
        }
    }

    return (
        <div
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            {props.children}
        </div>
    )
}
