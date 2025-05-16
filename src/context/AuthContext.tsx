import { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Definimos el tipo del contexto
interface AuthContextType {
  token: string | null;
  tipoUsuario: string | null;
  isAuthChecked: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [tipoUsuario, setTipoUsuario] = useState<string | null>(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        setToken(storedToken);
        const decodedToken = JSON.parse(atob(storedToken.split('.')[1]));
        setTipoUsuario(decodedToken.tipoUsuario);
      } catch {
        logout(); // En caso de token inválido
      }
    }
    setIsAuthChecked(true);
  }, []);

  const login = (token: string) => {
    setToken(token);
    localStorage.setItem("token", token);
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    setTipoUsuario(decodedToken.tipoUsuario);
  };

  const logout = () => {
    setToken(null);
    setTipoUsuario(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, tipoUsuario, isAuthChecked, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
