import { Link } from 'react-router-dom'
import { memo } from 'react'
import './Navbar.css'

const Navbar = memo(() => {
    return (
        <nav className="navbar navbar-default navbar-static-top" role="navigation">
            <div className="container">
                <div className="navbar-header">
                    <Link to="/" className="navbar-brand">
                        Страны мира
                    </Link>
                </div>

                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <Link to="/about">О проекте</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
})

Navbar.displayName = 'Navbar'

export default Navbar

