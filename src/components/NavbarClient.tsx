import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import { ShoppingCart, User } from 'lucide-react';

function NavbarCliente() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => setMenuOpen(prev => !prev);
    const handleLinkClick = () => setMenuOpen(false);
    const handleLoginClick = () => navigate('/login');

    return (
        <>
            <div className="navbar">
                <div className="logo-nav"><a href="/">SebaStore</a></div>
                <nav className={`nav-list ${menuOpen ? 'open' : ''}`}>
                    <ul>
                        <li><a href="/" onClick={handleLinkClick}>Inicio</a></li>
                        <li><a href="/products" onClick={handleLinkClick}>Productos</a></li>
                        <li><a href="/contact" onClick={handleLinkClick}>Contacto</a></li>
                    </ul>
                    <div className="btn-login-nav mobile">
                        <button className="button-global btn-menu" onClick={handleLoginClick}>
                            Iniciar Sesión
                        </button>
                    </div>
                </nav>
                <div className="buttons-nav">
                    <div className="icons-nav">
                        <ShoppingCart className="icon-nav" />
                        <User className="icon-nav" />
                    </div>
                    <div className="btn-login-nav desktop">
                        <button className="button-global" onClick={handleLoginClick}>
                            Iniciar Sesión
                        </button>
                    </div>
                </div>
                <div className="hamburger" onClick={toggleMenu}><div></div><div></div><div></div></div>
            </div>
            <div className={`overlay-navbar ${menuOpen ? 'show' : ''}`} onClick={toggleMenu} />
        </>
    );
}

export default NavbarCliente;
