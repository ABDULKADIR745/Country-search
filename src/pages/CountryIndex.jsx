import { useState, useEffect, useMemo, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useCountries } from '../hooks/useCountries'
import { filterCountries } from '../utils/searchUtils'
import CountrySummary from '../components/CountrySummary'
import './CountryIndex.css'

const CountryIndex = () => {
    const { searchTerm: urlSearchTerm } = useParams()
    const [searchTerm, setSearchTerm] = useState(urlSearchTerm || '')
    const { countries, loading } = useCountries()
    const filteredCountries = useMemo(() => {
        return filterCountries(countries, searchTerm)
    }, [countries, searchTerm])

    const handleSearchChange = useCallback((e) => {
        setSearchTerm(e.target.value)
    }, [])

    useEffect(() => {
        if (urlSearchTerm) {
            setSearchTerm(urlSearchTerm)
        }
    }, [urlSearchTerm])

    useEffect(() => {
        document.title = 'Страны мира'
    }, [])

    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <h1>Поиск страны</h1>
                    <form role="form" className="country-search-form" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="text"
                            className="form-control"
                            id="search-box"
                            placeholder="Введите название страны"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </form>
                </div>
            </div>

            {loading && (
                <div className="row">
                    <div className="col-xs-12">
                        <p><i>Загрузка...</i></p>
                    </div>
                </div>
            )}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                justifyContent: 'center'
            }}>
                {filteredCountries.map((country) => (
                    <div key={country.cca3} style={{
                        flex: '0 0 calc(25% - 7.5px)',
                        minWidth: '280px'
                    }}>
                        <CountrySummary country={country} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CountryIndex

