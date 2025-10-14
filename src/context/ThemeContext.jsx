import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider')
    }
    return context
}

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        try {
            const savedTheme = localStorage.getItem('theme')
            const theme = savedTheme ? savedTheme === 'dark' : true
            document.body.className = theme ? 'dark-theme' : 'light-theme'
            return theme
        } catch (error) {
            console.error('Error reading theme from localStorage:', error)
            document.body.className = 'dark-theme'
            return true
        }
    })

    useEffect(() => {
        try {
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
            document.body.className = isDarkMode ? 'dark-theme' : 'light-theme'
        } catch (error) {
            console.error('Error saving theme to localStorage:', error)
        }
    }, [isDarkMode])

    const toggleTheme = () => {
        setIsDarkMode(prev => !prev)
    }

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

