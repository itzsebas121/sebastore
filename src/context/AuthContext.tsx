"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { jwtDecode } from "jwt-decode"

// Tipos
interface User {
  id: string
  nombre: string
  apellido: string
  email: string
  telefono?: string
  tipoUsuario: "Admin" | "Cliente"
  [key: string]: any
}

interface AuthContextType {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  login: (token: string) => Promise<void>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
  isAdmin: () => boolean
  isClient: () => boolean
}

interface AuthProviderProps {
  children: ReactNode
}

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Función para adaptar el usuario desde el JWT
const adaptarUsuario = (decodedToken: any): User => {
  return {
    id: decodedToken.id || decodedToken.userId || decodedToken.sub,
    nombre: decodedToken.nombre || decodedToken.firstName || decodedToken.name,
    apellido: decodedToken.apellido || decodedToken.lastName || decodedToken.surname,
    email: decodedToken.email || decodedToken.correo,
    telefono: decodedToken.telefono || decodedToken.phone,
    tipoUsuario: decodedToken.tipoUsuario || decodedToken.role || decodedToken.userType,
    ...decodedToken, // Incluir cualquier otro campo del token
  }
}

// Función para verificar si el token ha expirado
const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: any = jwtDecode(token)
    const currentTime = Date.now() / 1000
    return decoded.exp < currentTime
  } catch {
    return true
  }
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const savedToken = localStorage.getItem("token")

        if (savedToken) {
          // Verificar si el token ha expirado
          if (isTokenExpired(savedToken)) {
            console.warn("Token expirado, limpiando sesión")
            localStorage.removeItem("token")
            setLoading(false)
            return
          }

          // Decodificar y establecer el usuario
          const decoded = jwtDecode(savedToken)
          const adaptedUser = adaptarUsuario(decoded)

          setUser(adaptedUser)
          setToken(savedToken)
        }
      } catch (error) {
        console.error("Error al inicializar autenticación:", error)
        localStorage.removeItem("token")
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  // Función de login
  const login = async (newToken: string): Promise<void> => {
    try {
      // Verificar que el token no esté expirado
      if (isTokenExpired(newToken)) {
        throw new Error("El token ha expirado")
      }

      // Decodificar el token
      const decoded = jwtDecode(newToken)
      const adaptedUser = adaptarUsuario(decoded)

      // Guardar en localStorage
      localStorage.setItem("token", newToken)

      // Actualizar el estado
      setUser(adaptedUser)
      setToken(newToken)

      console.log("Login exitoso:", adaptedUser)
    } catch (error) {
      console.error("Error en login:", error)
      throw new Error("Token inválido")
    }
  }

  // Función de logout
  const logout = (): void => {
    localStorage.removeItem("token")
    setUser(null)
    setToken(null)
    console.log("Logout exitoso")
  }

  // Función para actualizar datos del usuario
  const updateUser = (userData: Partial<User>): void => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
    }
  }

  // Función para verificar si es admin
  const isAdmin = (): boolean => {
    return user?.tipoUsuario === "Admin"
  }

  // Función para verificar si es cliente
  const isClient = (): boolean => {
    return user?.tipoUsuario === "Cliente"
  }

  // Verificar autenticación
  const isAuthenticated = !!user && !!token

  // Valor del contexto
  const contextValue: AuthContextType = {
    user,
    token,
    isAuthenticated,
    loading,
    login,
    logout,
    updateUser,
    isAdmin,
    isClient,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

// Hook personalizado para usar el contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  }

  return context
}

// Hook para proteger rutas
export const useRequireAuth = (redirectTo = "/login") => {
  const { isAuthenticated, loading } = useAuth()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      window.location.href = redirectTo
    }
  }, [isAuthenticated, loading, redirectTo])

  return { isAuthenticated, loading }
}

// Hook para verificar roles
export const useRequireRole = (requiredRole: "Admin" | "Cliente", redirectTo = "/") => {
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && user && user.tipoUsuario !== requiredRole) {
      window.location.href = redirectTo
    }
  }, [user, loading, requiredRole, redirectTo])

  return { hasRole: user?.tipoUsuario === requiredRole, loading }
}

export default AuthContext
