import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ShoppingCart, User } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import CartOverlay from "./CartOverlay/CartOverlay"
import ProfileMenu from "./ProfileMenu/ProfileMenu"
import { jwtDecode } from "jwt-decode"
import "./styles.css"

function NavbarCliente() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const navigate = useNavigate()
  const { tipoUsuario, logout, isAuthChecked, token } = useAuth()

  // Decodificar el token para obtener el ID del cliente
  let clientId: number | null = null;
  if (token) {
    try {
      const decodedToken: any = jwtDecode(token);
      clientId = decodedToken.id || null;
    } catch (error) {
      console.error("Error decodificando token:", error);
    }
  }


  const toggleMenu = () => {
    setMenuOpen((prev) => !prev)
    setCartOpen(false)
    setProfileOpen(false)
  }

  const toggleCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCartOpen((prev) => !prev)
    setProfileOpen(false)
    setMenuOpen(false)
  }

  const toggleProfile = (e: React.MouseEvent) => {
    e.stopPropagation()
    setProfileOpen((prev) => !prev)
    setCartOpen(false)
    setMenuOpen(false)
  }

  const handleLinkClick = () => {
    setMenuOpen(false)
    setCartOpen(false)
    setProfileOpen(false)
  }

  const handleLoginClick = () => {
    if (tipoUsuario) {
      logout()
      navigate("/")
    } else {
      navigate("/login")
    }
    handleLinkClick()
  }

  const closeAllOverlays = () => {
    setCartOpen(false)
    setProfileOpen(false)
  }
  return (
    <>
      <div className="navbar">
        <div className="logo-nav">
          <a href="/">SebaStore</a>
        </div>
        <nav className={`nav-list ${menuOpen ? "open" : ""}`}>
          <ul>
            <li>
              <a href="/" onClick={handleLinkClick}>
                Inicio
              </a>
            </li>
            <li>
              <a href="/products" onClick={handleLinkClick}>
                Productos
              </a>
            </li>
            <li>
              <a href="/history" onClick={handleLinkClick}>
                Historial
              </a>
            </li>
            <li>
              <a href="/contact" onClick={handleLinkClick}>
                Contacto
              </a>
            </li>
          </ul>
          <div className="btn-mobile">
            {isAuthChecked && !tipoUsuario && (
              <button className="button-global btn-menu" onClick={handleLoginClick}>
                Iniciar Sesión
              </button>
            )}
          </div>
        </nav>
        <div className="buttons-nav">
          <div className="icons-nav">
            <div className="icon-container" onClick={toggleCart}>
              <ShoppingCart className="icon-nav" />
              {cartOpen  && (
                <CartOverlay onClose={() => setCartOpen(false)} clientId={clientId ?? 0} isLoggedIn={!!tipoUsuario}/>
              )}
            </div>
            <div className="icon-container" onClick={toggleProfile}>
              <User className="icon-nav" />
              {profileOpen && (
                <ProfileMenu
                  isLoggedIn={!!tipoUsuario}
                  onLogout={handleLoginClick}
                />
              )}
            </div>
          </div>
          <div className="btn-login-nav desktop">
            {isAuthChecked && !tipoUsuario && (
              <button className="button-global" onClick={handleLoginClick}>
                Iniciar Sesión
              </button>
            )}
          </div>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div
        className={`overlay-navbar ${menuOpen || cartOpen || profileOpen ? "show" : ""}`}
        onClick={closeAllOverlays}
      />
    </>
  )
}

export default NavbarCliente
