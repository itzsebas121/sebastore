import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import { User } from 'lucide-react';

function NavbarAdmin() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => setMenuOpen(prev => !prev);
    const handleLinkClick = () => setMenuOpen(false);

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/');
        window.location.reload(); 
    
    };

    return (
        <>
            <div className="navbar">
                <div className="logo-nav"><a href="/admin">Panel Admin</a></div>
                <nav className={`nav-list ${menuOpen ? 'open' : ''}`}>
                    <ul>
                        <li><a href="/pedidos" onClick={handleLinkClick}>Pedidos</a></li>
                        <li><a href="/historial" onClick={handleLinkClick}>Historial</a></li>
                        <li><a onClick={logout}>Cerrar sesión</a></li>
                    </ul>
                </nav>
                <div className="buttons-nav">
                    <div className="icons-nav">
                        <User className="icon-nav" />
                    </div>
                </div>
                <div className="hamburger" onClick={toggleMenu}><div></div><div></div><div></div></div>
            </div>
            <div className={`overlay-navbar ${menuOpen ? 'show' : ''}`} onClick={toggleMenu} />
        </>
    );
}

export default NavbarAdmin;
