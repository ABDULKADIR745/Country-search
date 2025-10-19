export const filterCountries = (countries, searchTerm) => {
    if (!searchTerm || searchTerm.trim() === '') {
        return countries
    }

    const search = searchTerm.toUpperCase()

    const matches = (value) => {
        if (!value) return false
        return value.toUpperCase().substring(0, search.length) === search
    }

    const listMatches = (list) => {
        if (!list || !Array.isArray(list)) return false
        return list.some(value => matches(value))
    }

    const objectValuesMatch = (obj) => {
        if (!obj || typeof obj !== 'object') return false
        return Object.values(obj).some(value => {
            if (typeof value === 'string') {
                return matches(value)
            }
            return false
        })
    }

    return countries.filter(country => {
        // Match common name
        if (matches(country.name.common)) {
            return true
        }

        // Match native name
        if (country.name.native && country.name.native.common && matches(country.name.native.common)) {
            return true
        }

        // Match country codes
        if (search.length <= 2 && matches(country.cca2)) {
            return true
        }

        if (search.length <= 3 && matches(country.cca3)) {
            return true
        }

        // Match currency codes
        if (search.length <= 3 && country.currency && listMatches(country.currency)) {
            return true
        }

        // Match translations
        if (country.translations && objectValuesMatch(country.translations)) {
            return true
        }

        return false
    })
}

