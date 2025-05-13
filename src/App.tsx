import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';

import Login from './Pages/Login/Login';
import Registro from './Pages/Login/Registro';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import ClienteDashboard from './Pages/Client/ClientDashboard';

import Home from './Pages/Home';
import Products from './Pages/Client/Products';
import Checkout from './Pages/Client/Checkout';

import NavbarCliente from './components/NavbarClient';
import NavbarAdmin from './components/NanvarAdmin';

import AdminSales from './Pages/Admin/AdminSales';

import './Styles/global.css';
import './Styles/var.css';

function App() {
  const { tipoUsuario } = useAuth();

  return (
    <BrowserRouter>
      {/* Condicionalmente renderiza el Navbar */}
      {tipoUsuario === 'Admin' ? <NavbarAdmin /> : <NavbarCliente />}

      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />


        <Route
          path="/checkout/:id"
          element={
            <ProtectedRoute allowedRoles={['Cliente', 'Admin']}>
              <Checkout />
            </ProtectedRoute>
          }
        />


        <Route
          path="/cliente"
          element={
            <ProtectedRoute allowedRoles={['Cliente']}>
              <ClienteDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/products" replace />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminSales />} /> 
          <Route path="pedidos" element={<AdminSales />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
