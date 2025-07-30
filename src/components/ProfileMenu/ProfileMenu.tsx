    "use client"

import { User, LogOut, Settings, ShoppingBag, Heart } from "lucide-react"
import "./ProfileMenu.css"

function ProfileMenu({ isLoggedIn, onLogout }: { isLoggedIn: boolean; onLogout: () => void }) {
  return (
    <div className="profile-menu" onClick={(e) => e.stopPropagation()}>
      {isLoggedIn ? (
        <>
          <div className="profile-header">
            <div className="profile-avatar">
              <User size={24} />
            </div>
            <div className="profile-info">
              <h4>Usuario</h4>
              <p>usuario@ejemplo.com</p>
            </div>
          </div>

          <div className="profile-options">
            <a href="/profile" className="profile-option">
              <User size={18} />
              <span>Mi Perfil</span>
            </a>
            <a href="/orders" className="profile-option">
              <ShoppingBag size={18} />
              <span>Mis Pedidos</span>
            </a>
            <a href="/wishlist" className="profile-option">
              <Heart size={18} />
              <span>Lista de Deseos</span>
            </a>
            <a href="/settings" className="profile-option">
              <Settings size={18} />
              <span>Configuración</span>
            </a>
            <button className="profile-option logout" onClick={onLogout}>
              <LogOut size={18} />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </>
      ) : (
        <div className="login-prompt">
          <p>Inicia sesión para ver tu perfil</p>
          <a href="/login" className="login-button">
            Iniciar Sesión
          </a>
          <a href="/register" className="register-link">
            ¿No tienes cuenta? Regístrate
          </a>
        </div>
      )}
    </div>
  )
}
export default ProfileMenu
