import { useState, useEffect } from 'react'
import { clearCache, getCacheSize } from '../utils/cache'
import './CacheManager.css'

const CacheManager = () => {
    const [cacheInfo, setCacheInfo] = useState({ memory: 0, localStorage: 0 })
    const [showNotification, setShowNotification] = useState(false)

    const updateCacheInfo = () => {
        setCacheInfo(getCacheSize())
    }

    useEffect(() => {
        updateCacheInfo()
        const interval = setInterval(updateCacheInfo, 5000)
        return () => clearInterval(interval)
    }, [])

    const handleClearCache = () => {
        clearCache()
        updateCacheInfo()
        setShowNotification(true)
        setTimeout(() => setShowNotification(false), 3000)
    }

    return (
        <div className="cache-manager">
            <h3>Кэш данных</h3>
            <div className="cache-info">
                <p>
                    <strong>В памяти:</strong> {cacheInfo.memory} записей
                </p>
                <p>
                    <strong>В localStorage:</strong> {cacheInfo.localStorage} записей
                </p>
            </div>
            <button
                onClick={handleClearCache}
                className="btn btn-default cache-clear-btn"
            >
                🗑️ Очистить кэш
            </button>

            {showNotification && (
                <div className="cache-notification">
                    ✅ Кэш успешно очищен!
                </div>
            )}
        </div>
    )
}

export default CacheManager

