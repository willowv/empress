'use client'

import { ReactNode, useEffect, useState } from 'react'
import { createContext } from 'react'

interface NetworkContextProps {
    readonly isOnline: boolean
}

export const NetworkContext = createContext<NetworkContextProps>({
    isOnline: true
})

interface NetworkStatusProviderProps {
    readonly children: ReactNode
}

export default function NetworkStatusProvider({
    children
}: NetworkStatusProviderProps) {
    const [isOnline, setIsOnline] = useState(true)
    const updateNetworkStatus = () => setIsOnline(navigator.onLine)
    useEffect(() => {
        updateNetworkStatus() // Initial check on mount
        // Event listeners
        window.addEventListener('load', updateNetworkStatus)
        window.addEventListener('online', updateNetworkStatus)
        window.addEventListener('offline', updateNetworkStatus)
        return () => {
            window.removeEventListener('load', updateNetworkStatus)
            window.removeEventListener('online', updateNetworkStatus)
            window.removeEventListener('offline', updateNetworkStatus)
        }
    }, []) // Event listeners mean no dependency watch is needed here

    return <NetworkContext value={{ isOnline }}>{children}</NetworkContext>
}
