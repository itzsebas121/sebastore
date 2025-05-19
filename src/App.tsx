import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import LoadingImage from "./components/Loading/LaodingImage";
import spinner from "./assets/sebastore-spinner.png"; // Ruta del logo/spinner

const Login = lazy(() => import("./Pages/Login/Login"));
const Registro = lazy(() => import("./Pages/Login/Registro"));
const AdminDashboard = lazy(() => import("./Pages/Admin/AdminDashboard"));
const ClienteDashboard = lazy(() => import("./Pages/Client/ClientDashboard"));

const Home = lazy(() => import("./Pages/Client/Home/Home"));
const Products = lazy(() => import("./Pages/Client/Products/Products"));
const Checkout = lazy(() => import("./Pages/Client/Checkout"));
const Contact = lazy(() => import("./Pages/Client/Contact/Contact"));

const NavbarCliente = lazy(() => import("./components/NavbarClient"));
const NavbarAdmin = lazy(() => import("./components/NanvarAdmin"));
const History = lazy(() => import("./Pages/Client/History/Historial"));
const AdminSales = lazy(() => import("./Pages/Admin/AdminSales"));

import "./Styles/global.css";
import "./Styles/var.css";

function App() {
  const { tipoUsuario } = useAuth();

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingImage imageSrc={spinner} text="Cargando SebaStore..." size={100} />}>
        {tipoUsuario === "Admin" ? <NavbarAdmin /> : <NavbarCliente />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/history" element={<History />} />

          <Route
            path="/checkout/:id"
            element={
              <ProtectedRoute allowedRoles={["Cliente", "Admin"]}>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cliente"
            element={
              <ProtectedRoute allowedRoles={["Cliente"]}>
                <ClienteDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/products" replace />} />
          </Route>

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminSales />} />
            <Route path="pedidos" element={<AdminSales />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
