"use client"

import type React from "react"
import { User, LogOut, Settings, ShoppingBag, Heart, Shield } from "lucide-react"
import { useAuth } from "../../context/AuthContext"
import "./ProfileMenu.css"

interface ProfileMenuProps {
  isLoggedIn: boolean
  onLogout: () => void
  user?: any
  onProfileClick?: () => void
  onOrdersClick?: () => void
}

function ProfileMenu({ isLoggedIn, onLogout, user, onProfileClick, onOrdersClick }: ProfileMenuProps) {
  const { isAdmin, isClient } = useAuth()

  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (onProfileClick) {
      onProfileClick()
    }
  }

  const handleOrdersClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (onOrdersClick) {
      onOrdersClick()
    }
  }

  return (
    <div className="profile-menu" onClick={(e) => e.stopPropagation()}>
      {isLoggedIn && user ? (
        <>
          <div className="profile-header">
            <div className="profile-avatar">
              <User size={24} />
              {isAdmin() && <div className="admin-badge">A</div>}
            </div>
            <div className="profile-info">
              <h4>
                {user.nombre} {user.apellido}
              </h4>
              <p>{user.email}</p>
              <span className="user-type">{user.tipoUsuario}</span>
            </div>
          </div>

          <div className="profile-divider"></div>

          <div className="profile-options">
            <button className="profile-option" onClick={handleProfileClick}>
              <User size={18} />
              <span>Mi Perfil</span>
            </button>

            {isClient() && (
              <>
                <button className="profile-option" onClick={handleOrdersClick}>
                  <ShoppingBag size={18} />
                  <span>Mis Pedidos</span>
                </button>
                <a href="/wishlist" className="profile-option">
                  <Heart size={18} />
                  <span>Lista de Deseos</span>
                </a>
              </>
            )}

            {isAdmin() && (
              <a href="/admin" className="profile-option admin-option">
                <Shield size={18} />
                <span>Panel Admin</span>
              </a>
            )}

            <a href="/settings" className="profile-option">
              <Settings size={18} />
              <span>Configuración</span>
            </a>

            <div className="profile-divider"></div>

            <button className="profile-option logout" onClick={onLogout}>
              <LogOut size={18} />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </>
      ) : (
        <div className="login-prompt">
          <div className="login-icon">
            <User size={32} />
          </div>
          <h4>¡Hola!</h4>
          <p>Inicia sesión para acceder a tu perfil y realizar pedidos</p>
          <div className="login-actions">
            <a href="/login" className="login-button">
              Iniciar Sesión
            </a>
            <a href="/register" className="register-link">
              Crear Cuenta
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileMenu
