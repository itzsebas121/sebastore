import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; 

function NavbarCliente() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { tipoUsuario, logout } = useAuth(); 

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const handleLinkClick = () => setMenuOpen(false);
  const handleLoginClick = () => {
    if (tipoUsuario) {
      logout(); 
      navigate('/'); 
    } else {
      navigate('/login'); 
    }
  };

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
          <div className="btn-mobile">
            <button className="button-global btn-menu" onClick={handleLoginClick}>
              {tipoUsuario ? 'Cerrar Sesión' : 'Iniciar Sesión'} {/* Cambiar el texto según si está logueado */}
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
              {tipoUsuario ? 'Cerrar Sesión' : 'Iniciar Sesión'} {/* Cambiar el texto según si está logueado */}
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
