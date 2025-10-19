import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useCountries } from '../hooks/useCountries'
import { filterCountries } from '../utils/searchUtils'
import CountrySummary from '../components/CountrySummary'
import './CountryIndex.css'

const CountryIndex = () => {
    const { searchTerm: urlSearchTerm } = useParams()
    const [searchTerm, setSearchTerm] = useState(urlSearchTerm || '')
    const { countries, loading } = useCountries()
    const [filteredCountries, setFilteredCountries] = useState([])

    useEffect(() => {
        if (urlSearchTerm) {
            setSearchTerm(urlSearchTerm)
        }
    }, [urlSearchTerm])

    useEffect(() => {
        document.title = 'Страны мира'
    }, [])

    useEffect(() => {
        setFilteredCountries(filterCountries(countries, searchTerm))
    }, [countries, searchTerm])

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
                            onChange={(e) => setSearchTerm(e.target.value)}
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

            <div className="row">
                {filteredCountries.map(country => (
                    <div key={country.cca3} className="col-md-3 col-sm-4">
                        <CountrySummary country={country} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CountryIndex

