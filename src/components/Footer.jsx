import './Footer.css'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <div className="container">
            <div className="row">
                <footer className="col-md-12">
                    <small>Copyright &copy; 2025-{currentYear} Гаджиев А.</small>
                </footer>
            </div>
        </div>
    )
}

export default Footer

