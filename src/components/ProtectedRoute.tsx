import { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

type ProtectedRouteProps = PropsWithChildren<{
  allowedRoles: string[];
}>;

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  // Si no hay token, redirige al login
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  try {
    const { tipoUsuario, exp } = jwtDecode<{ tipoUsuario: string; exp: number }>(token);

    if (Date.now() >= exp * 1000) {
      localStorage.removeItem('token');
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!allowedRoles.includes(tipoUsuario)) {

      if (tipoUsuario === 'Admin') {
        return <Navigate to="/admin" replace />;
      }
      if (tipoUsuario === 'Cliente') {
        return <Navigate to="/cliente" replace />;
      }
      return <Navigate to="/" replace />;
    }


    return <>{children}</>;
  } catch {

    localStorage.removeItem('token');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default ProtectedRoute;
