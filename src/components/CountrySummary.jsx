import { useState, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import './CountrySummary.css'

const CountrySummary = memo(({ country }) => {
    const [isHovered, setIsHovered] = useState(false)
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/country/${country.cca3}`)
    }

    return (
        <div
            className={`panel clickable ${isHovered ? 'panel-info' : 'panel-default'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
        >
            <div className="panel-heading">
                <div className="pull-right">
                    <button type="button" className="btn btn-default">
                        <i className="fa fa-search"></i>
                    </button>
                </div>
                <div>
                    <h3 className="panel-title">
                        {country.name.common} <br />
                        <small>
                            {country.name.native?.common || '\u00A0'}
                        </small>
                    </h3>
                </div>
            </div>
            <table className="table">
                <tbody>
                    <tr>
                        <th>Код страны (Alpha 2)</th>
                        <td>{country.cca2}</td>
                    </tr>
                    <tr>
                        <th>Код страны (Alpha 3)</th>
                        <td>{country.cca3}</td>
                    </tr>
                    <tr>
                        <th>
                            {country.currency && country.currency.length > 1 ? 'Валюты' : 'Валюта'}
                        </th>
                        <td>
                            {country.currency && country.currency.length > 0
                                ? country.currency.join(', ')
                                : '—'}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Телефонный код{country.callingCode && country.callingCode.length > 1 ? 'ы' : ''}
                        </th>
                        <td>
                            {country.callingCode && country.callingCode.length > 0
                                ? country.callingCode.join(', ')
                                : '—'}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            {country.languages && Object.keys(country.languages).length > 1 ? 'Языки' : 'Язык'}
                        </th>
                        <td>
                            {country.languages && Object.keys(country.languages).length > 0
                                ? Object.keys(country.languages).join(', ')
                                : '—'}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
})

CountrySummary.displayName = 'CountrySummary'

export default CountrySummary

