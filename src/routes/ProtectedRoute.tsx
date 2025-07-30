import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Role } from '../entities/Role';

import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: Role[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { role } = useAuth();
  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
