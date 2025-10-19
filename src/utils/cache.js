
const memoryCache = new Map()

const CACHE_DURATION = 30 * 60 * 1000

export const getFromCache = (key) => {
    if (memoryCache.has(key)) {
        const cached = memoryCache.get(key)
        if (Date.now() - cached.timestamp < CACHE_DURATION) {
            const age = Math.floor((Date.now() - cached.timestamp) / 1000)
            console.log(`%c📦 КЭШ (Память) %c${key} %c(${age}с назад)`,
                'background: #667eea; color: white; padding: 2px 6px; border-radius: 3px; font-weight: bold',
                'color: #8b9bff; font-weight: bold',
                'color: #a0a5ab; font-style: italic')
            return cached.data
        } else {
            memoryCache.delete(key)
        }
    }

    try {
        const cached = localStorage.getItem(key)
        if (cached) {
            const parsed = JSON.parse(cached)
            if (Date.now() - parsed.timestamp < CACHE_DURATION) {
                const age = Math.floor((Date.now() - parsed.timestamp) / 1000)
                console.log(`%c💾 КЭШ (Storage) %c${key} %c(${age}с назад)`,
                    'background: #48dbfb; color: white; padding: 2px 6px; border-radius: 3px; font-weight: bold',
                    'color: #8b9bff; font-weight: bold',
                    'color: #a0a5ab; font-style: italic')
                memoryCache.set(key, parsed)
                return parsed.data
            } else {
                localStorage.removeItem(key)
            }
        }
    } catch (err) {
        console.error('❌ Ошибка чтения из localStorage:', err)
    }

    return null
}

export const saveToCache = (key, data) => {
    const cacheObject = {
        data,
        timestamp: Date.now()
    }

    memoryCache.set(key, cacheObject)
    const dataSize = JSON.stringify(data).length
    const sizeKb = (dataSize / 1024).toFixed(2)
    console.log(`%c💾 СОХРАНЕНО %c${key} %c(${sizeKb} KB)`,
        'background: #4ecdc4; color: white; padding: 2px 6px; border-radius: 3px; font-weight: bold',
        'color: #8b9bff; font-weight: bold',
        'color: #a0a5ab; font-style: italic')

    try {
        localStorage.setItem(key, JSON.stringify(cacheObject))
    } catch (err) {
        console.error('❌ Ошибка записи в localStorage:', err)
        if (err.name === 'QuotaExceededError') {
            console.warn('⚠️ localStorage переполнен, очищаем старые данные...')
            clearOldCache()
            try {
                localStorage.setItem(key, JSON.stringify(cacheObject))
                console.log('✅ Успешно сохранено после очистки')
            } catch (retryErr) {
                console.error('❌ Не удалось сохранить даже после очистки:', retryErr)
            }
        }
    }
}

export const clearCache = () => {
    const memSize = memoryCache.size
    memoryCache.clear()

    let localStorageCount = 0
    try {
        const keys = Object.keys(localStorage)
        keys.forEach(key => {
            if (key.startsWith('country_') || key.startsWith('geo_') || key === 'countries_all') {
                localStorage.removeItem(key)
                localStorageCount++
            }
        })
        console.log(`%c🗑️ КЭШ ОЧИЩЕН %cПамять: ${memSize}, Storage: ${localStorageCount}`,
            'background: #f06595; color: white; padding: 2px 6px; border-radius: 3px; font-weight: bold',
            'color: #a0a5ab')
    } catch (err) {
        console.error('❌ Ошибка очистки кэша:', err)
    }
}

export const clearOldCache = () => {
    let removedCount = 0
    try {
        const keys = Object.keys(localStorage)
        keys.forEach(key => {
            if (key.startsWith('country_') || key.startsWith('geo_') || key === 'countries_all') {
                try {
                    const cached = JSON.parse(localStorage.getItem(key))
                    if (Date.now() - cached.timestamp >= CACHE_DURATION) {
                        localStorage.removeItem(key)
                        removedCount++
                    }
                } catch (err) {
                    localStorage.removeItem(key)
                    removedCount++
                }
            }
        })
        if (removedCount > 0) {
            console.log(`%c🧹 ОЧИСТКА %cУдалено ${removedCount} устаревших записей`,
                'background: #ffa500; color: white; padding: 2px 6px; border-radius: 3px; font-weight: bold',
                'color: #a0a5ab')
        }
    } catch (err) {
        console.error('❌ Ошибка очистки старых данных:', err)
    }
}

export const getCacheSize = () => {
    return {
        memory: memoryCache.size,
        localStorage: Object.keys(localStorage).filter(
            key => key.startsWith('country_') || key.startsWith('geo_') || key === 'countries_all'
        ).length
    }
}

export const hasCache = (key) => {
    if (memoryCache.has(key)) {
        const cached = memoryCache.get(key)
        return Date.now() - cached.timestamp < CACHE_DURATION
    }

    try {
        const cached = localStorage.getItem(key)
        if (cached) {
            const parsed = JSON.parse(cached)
            return Date.now() - parsed.timestamp < CACHE_DURATION
        }
    } catch (err) {
        return false
    }

    return false
}

