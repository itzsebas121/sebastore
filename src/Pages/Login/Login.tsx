import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Aquí importamos el hook
import './Login.css';
     
import config from "../../config";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
    
      const response = await fetch(`${config.apiBaseUrl}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, contrasena }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Error al iniciar sesión");
        setIsLoading(false);
        return;
      }


      login(data.token);


      const payload = JSON.parse(atob(data.token.split('.')[1]));
      const tipoUsuario = payload.tipoUsuario;

      if (tipoUsuario === "Admin") {
        navigate("/admin", { replace: true });
      } else if (tipoUsuario === "Cliente") {
        navigate("/cliente", { replace: true });
      } else {
        navigate("/", { replace: true });
      }

    } catch (err) {
      setError("Error al conectar con el servidor");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Iniciar Sesión</h2>
      <p className="auth-subtitle">Ingresa tus credenciales para acceder</p>

      {error && <div className="auth-error">{error}</div>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            id="email"
            type="email"
            placeholder="tu@ejemplo.com"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>

        <div className="auth-form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
          <div
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Ocultar" : "Mostrar"}
          </div>
        </div>

        <button
          type="submit"
          className="auth-button"
          disabled={isLoading}
        >
          {isLoading ? "Cargando..." : "Iniciar Sesión"}
        </button>
      </form>

      <div className="auth-footer">
        ¿No tienes una cuenta? <a href="/registro">Regístrate</a>
      </div>
    </div>
  );
}
