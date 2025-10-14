import { useState, useEffect } from 'react'
import { getFromCache, saveToCache } from '../utils/cache'

const CACHE_KEY_ALL_COUNTRIES = 'countries_all'

/**
 * Custom hook to fetch all countries with caching
 */
export const useCountries = () => {
    const [countries, setCountries] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                setLoading(true)

                // Проверяем кэш
                const cachedData = getFromCache(CACHE_KEY_ALL_COUNTRIES)
                if (cachedData) {
                    setCountries(cachedData)
                    setLoading(false)
                    return
                }

                // Загружаем данные
                const response = await fetch('/countries.json')
                if (!response.ok) {
                    throw new Error('Не удалось загрузить страны')
                }
                const data = await response.json()

                // Сохраняем в кэш
                saveToCache(CACHE_KEY_ALL_COUNTRIES, data)
                setCountries(data)
            } catch (err) {
                setError(err.message)
                setCountries([])
            } finally {
                setLoading(false)
            }
        }

        fetchCountries()
    }, [])

    return { countries, loading, error }
}

/**
 * Custom hook to fetch a single country by cca3 code with caching
 */
export const useCountry = (cca3) => {
    const [country, setCountry] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                setLoading(true)

                // Проверяем кэш для конкретной страны
                const cacheKey = `country_${cca3.toUpperCase()}`
                const cachedCountry = getFromCache(cacheKey)

                if (cachedCountry) {
                    setCountry(cachedCountry)
                    setLoading(false)
                    return
                }

                // Проверяем общий кэш всех стран
                let allCountries = getFromCache(CACHE_KEY_ALL_COUNTRIES)

                if (!allCountries) {
                    // Загружаем данные
                    const response = await fetch('/countries.json')
                    if (!response.ok) {
                        throw new Error('Не удалось загрузить страну')
                    }
                    allCountries = await response.json()
                    saveToCache(CACHE_KEY_ALL_COUNTRIES, allCountries)
                }

                const foundCountry = allCountries.find(
                    c => c.cca3.toUpperCase() === cca3.toUpperCase()
                )

                if (foundCountry) {
                    // Добавляем вычисляемые свойства
                    foundCountry.osmUrl = `http://www.openstreetmap.org/#map=5/${foundCountry.latlng[0]}/${foundCountry.latlng[1]}`
                    foundCountry.hasLanguages = foundCountry.languages &&
                        Object.keys(foundCountry.languages).length > 0

                    // Кэшируем конкретную страну
                    saveToCache(cacheKey, foundCountry)
                    setCountry(foundCountry)
                } else {
                    setError('Страна не найдена')
                }
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        if (cca3) {
            fetchCountry()
        }
    }, [cca3])

    return { country, loading, error }
}

/**
 * Custom hook to fetch GeoJSON data for a country with caching
 */
export const useGeoData = (cca3) => {
    const [geoData, setGeoData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchGeoData = async () => {
            try {
                setLoading(true)

                // Проверяем кэш
                const cacheKey = `geo_${cca3.toLowerCase()}`
                const cachedGeo = getFromCache(cacheKey)

                if (cachedGeo !== null) {
                    setGeoData(cachedGeo)
                    setLoading(false)
                    return
                }

                const response = await fetch(`/geo/${cca3.toLowerCase()}.geo.json`)
                if (response.ok) {
                    const data = await response.json()

                    // Проверяем валидность геометрии
                    const hasGeometry = data.features &&
                        data.features.length > 0 &&
                        data.features[0].geometry

                    const geoResult = hasGeometry ? data : null

                    // Сохраняем в кэш (даже null, чтобы не делать повторный запрос)
                    saveToCache(cacheKey, geoResult)
                    setGeoData(geoResult)
                } else {
                    saveToCache(cacheKey, null)
                    setGeoData(null)
                }
            } catch (err) {
                setGeoData(null)
            } finally {
                setLoading(false)
            }
        }

        if (cca3) {
            fetchGeoData()
        }
    }, [cca3])

    return { geoData, loading }
}

