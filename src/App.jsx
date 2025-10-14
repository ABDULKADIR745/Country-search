import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ThemeToggle from './components/ThemeToggle'
import CountryIndex from './pages/CountryIndex'
import CountryDetail from './pages/CountryDetail'
import About from './pages/About'
import './App.css'

function App() {
    return (
        <Router>
            <div className="app">
                <Navbar />
                <div className="container">
                    <Routes>
                        <Route path="/" element={<CountryIndex />} />
                        <Route path="/search/:searchTerm" element={<CountryIndex />} />
                        <Route path="/country/:cca3" element={<CountryDetail />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </div>
                <Footer />
                <ThemeToggle />
            </div>
        </Router>
    )
}

export default App

