import { useEffect, useState } from 'react'

export default function useNetworkStatus() {
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

    return isOnline
}
