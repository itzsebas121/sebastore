"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ShoppingCart, User, LogOut, Settings, Package, Home, ShoppingBag, Phone, Shield, Loader2 } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import CartOverlay from "./CartOverlay/CartOverlay"
import ProfileMenu from "./ProfileMenu/ProfileMenu"
import "./styles.css"

function NavbarCliente() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const navigate = useNavigate()

  const { user, isAuthenticated, loading, logout, isAdmin } = useAuth()
  const clientId = user?.id ? Number.parseInt(user.id) : 0

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
    if (isAuthenticated) {
      logout()
      navigate("/")
    } else {
      navigate("/login")
    }
    handleLinkClick()
  }

  const handleProfileClick = () => {
    navigate("/profile")
    handleLinkClick()
  }

  const handleOrdersClick = () => {
    navigate("/orders")
    handleLinkClick()
  }

  const closeAllOverlays = () => {
    setCartOpen(false)
    setProfileOpen(false)
    setMenuOpen(false)
  }

  if (loading) {
    return (
      <div className="navbar">
        <div className="logo-nav">
          <a href="/">
            <ShoppingBag size={24} />
            SebaStore
          </a>
        </div>
        <div className="navbar-loading">
          <Loader2 size={16} />
          Cargando...
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="navbar">
        <div className="logo-nav">
          <a href="/">
            <ShoppingBag size={24} />
            SebaStore
          </a>
        </div>

        <nav className={`nav-list ${menuOpen ? "open" : ""}`}>
          <ul>
            <li>
              <a href="/" onClick={handleLinkClick}>
                <Home size={18} />
                Inicio
              </a>
            </li>
            <li>
              <a href="/products" onClick={handleLinkClick}>
                <ShoppingBag size={18} />
                Productos
              </a>
            </li>
            {isAuthenticated && (
              <li>
                <a href="/history" onClick={handleLinkClick}>
                  <Package size={18} />
                  Historial
                </a>
              </li>
            )}
            <li>
              <a href="/contact" onClick={handleLinkClick}>
                <Phone size={18} />
                Contacto
              </a>
            </li>
            {isAdmin() && (
              <li>
                <a href="/admin" onClick={handleLinkClick} className="admin-link">
                  <Shield size={18} />
                  Panel Admin
                </a>
              </li>
            )}
          </ul>

          <div className="btn-mobile">
            {isAuthenticated ? (
              <div className="mobile-user-info">
                <div className="user-greeting">
                  <User size={20} />
                  Hola, {user?.nombre}
                </div>
                <div className="mobile-actions">
                  <button className="button-secondary btn-menu" onClick={handleProfileClick}>
                    <Settings size={16} />
                    Mi Perfil
                  </button>
                  <button className="button-secondary btn-menu" onClick={handleOrdersClick}>
                    <Package size={16} />
                    Mis Pedidos
                  </button>
                  <button className="button-tertiary btn-menu" onClick={handleLoginClick}>
                    <LogOut size={16} />
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            ) : (
              <button className="button-global btn-menu" onClick={handleLoginClick}>
                <User size={16} />
                Iniciar Sesión
              </button>
            )}
          </div>
        </nav>

        <div className="buttons-nav">
          <div className="icons-nav">
            {isAuthenticated && (
              <div className="icon-container" onClick={toggleCart}>
                <ShoppingCart className="icon-nav" />
                {cartOpen && (
                  <CartOverlay onClose={() => setCartOpen(false)} clientId={clientId} isLoggedIn={isAuthenticated} />
                )}
              </div>
            )}

            <div className="icon-container" onClick={toggleProfile}>
              <User className="icon-nav" />
              {profileOpen && (
                <ProfileMenu
                  isLoggedIn={isAuthenticated}
                  onLogout={handleLoginClick}
                  user={user}
                  onProfileClick={handleProfileClick}
                  onOrdersClick={handleOrdersClick}
                />
              )}

            </div>
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
