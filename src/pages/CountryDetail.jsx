import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCountry, useGeoData } from '../hooks/useCountries'
import MapView from '../components/MapView'
import './CountryDetail.css'

const CountryDetail = () => {
    const { cca3 } = useParams()
    const { country, loading } = useCountry(cca3)
    const { geoData } = useGeoData(cca3)
    const [showTranslations, setShowTranslations] = useState(false)

    useEffect(() => {
        if (country) {
            document.title = `${country.name.common} | Страны мира`
        }
    }, [country])

    if (loading) {
        return (
            <div className="row">
                <div className="col-xs-12">
                    <p><i>Загрузка...</i></p>
                </div>
            </div>
        )
    }

    if (!country) {
        return (
            <div className="row">
                <div className="col-xs-12">
                    <p>Страна не найдена</p>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="row">
                <ol className="breadcrumb">
                    <li><Link to="/">Поиск</Link></li>
                    <li className="active">{country.name.common}</li>
                </ol>

                <div className="col-md-12">
                    <h1>{country.name.common}</h1>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4">
                    <h2>Названия</h2>
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <th>Общее</th>
                                    <td>{country.name.common}</td>
                                </tr>
                                <tr>
                                    <th>Официальное</th>
                                    <td>{country.name.official || '—'}</td>
                                </tr>
                                <tr>
                                    <th>Общее (нац.)</th>
                                    <td>{country.name.native?.common || '—'}</td>
                                </tr>
                                <tr>
                                    <th>Официальное (нац.)</th>
                                    <td>{country.name.native?.official || '—'}</td>
                                </tr>
                                <tr>
                                    <th>Альтернативные названия</th>
                                    <td>
                                        {country.altSpellings && country.altSpellings.length > 0
                                            ? country.altSpellings.map((alt, idx) => (
                                                <span key={idx} className="comma-list">{alt}</span>
                                            ))
                                            : '—'}
                                    </td>
                                </tr>
                                <tr
                                    onClick={() => setShowTranslations(!showTranslations)}
                                    className="clickable"
                                >
                                    <th colSpan="2">
                                        Переводы <i className="fa fa-angle-double-down pull-right"></i>
                                    </th>
                                </tr>
                                {showTranslations && country.translations && Object.entries(country.translations).map(([lang, translation]) => (
                                    <tr key={lang}>
                                        <th>{lang}</th>
                                        <td>{translation}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <h2>Коды</h2>
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <th>ISO 3166-1 alpha-2</th>
                                    <td>{country.cca2 || '—'}</td>
                                </tr>
                                <tr>
                                    <th>ISO 3166-1 alpha-3</th>
                                    <td>{country.cca3 || '—'}</td>
                                </tr>
                                <tr>
                                    <th>ISO 3166-1 цифровой</th>
                                    <td>{country.ccn3 || '—'}</td>
                                </tr>
                                <tr>
                                    <th>
                                        Телефонный код{country.callingCode && country.callingCode.length > 1 ? 'ы' : ''}
                                    </th>
                                    <td>
                                        {country.callingCode && country.callingCode.length > 0
                                            ? country.callingCode.map((code, idx) => (
                                                <span key={idx} className="comma-list">{code}</span>
                                            ))
                                            : '—'}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        Код валюты ISO 4217{country.currency && country.currency.length > 1 ? ' (несколько)' : ''}
                                    </th>
                                    <td>
                                        {country.currency && country.currency.length > 0
                                            ? country.currency.map((curr, idx) => (
                                                <span key={idx} className="comma-list">{curr}</span>
                                            ))
                                            : '—'}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        Домен верхнего уровня{country.tld && country.tld.length > 1 ? ' (несколько)' : ''}
                                    </th>
                                    <td>
                                        {country.tld && country.tld.length > 0
                                            ? country.tld.map((domain, idx) => (
                                                <span key={idx} className="comma-list">{domain}</span>
                                            ))
                                            : '—'}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="col-md-4">
                    <h2>Язык</h2>
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <tbody>
                                {country.nativeLanguage && (
                                    <tr>
                                        <th>Родной язык</th>
                                        <td>{country.languages[country.nativeLanguage]}</td>
                                    </tr>
                                )}
                                <tr>
                                    <th colSpan="2">Языки</th>
                                </tr>
                                {country.hasLanguages ? (
                                    Object.entries(country.languages).map(([code, lang]) => (
                                        <tr key={code}>
                                            <th>{code}</th>
                                            <td>{lang}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2"><i>Данные о языках отсутствуют</i></td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <h2>География</h2>
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <th>Регион</th>
                                    <td>{country.region || '—'}</td>
                                </tr>
                                <tr>
                                    <th>Субрегион</th>
                                    <td>{country.subregion || '—'}</td>
                                </tr>
                                <tr>
                                    <th>Столица</th>
                                    <td>{country.capital || '—'}</td>
                                </tr>
                                <tr>
                                    <th>Этноним</th>
                                    <td>{country.demonym || '—'}</td>
                                </tr>
                                <tr>
                                    <th>Широта/Долгота</th>
                                    <td>
                                        {country.latlng && country.latlng.length === 2 ? (
                                            <a href={country.osmUrl} target="_blank" rel="noopener noreferrer">
                                                {country.latlng[0]}, {country.latlng[1]}
                                            </a>
                                        ) : '—'}
                                    </td>
                                </tr>
                                {country.area > 0 && (
                                    <tr>
                                        <th>Площадь</th>
                                        <td>{country.area} км²</td>
                                    </tr>
                                )}
                                <tr>
                                    <th>Сухопутные границы</th>
                                    <td>
                                        {country.borders && country.borders.length > 0
                                            ? country.borders.map((border, idx) => (
                                                <span key={idx} className="comma-list">
                                                    <Link to={`/country/${border}`}>{border}</Link>
                                                </span>
                                            ))
                                            : '—'}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="col-md-4 fake-heading">
                    {country.cca3 && (
                        <img
                            src={`/flags/${country.cca3.toLowerCase()}.svg`}
                            alt={`Флаг ${country.name.common}`}
                            className="img-responsive country-flag"
                        />
                    )}

                    {country.latlng && country.latlng.length === 2 && (
                        <MapView center={country.latlng} geoData={geoData} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default CountryDetail

