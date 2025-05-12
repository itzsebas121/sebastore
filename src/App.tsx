import {  Routes, Route, BrowserRouter } from "react-router-dom";
import "./Styles/var.css";
import "./Styles/global.css";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import Navbar from "./components/NavbarClient";
import Login from "./Pages/Login/Login";
import {jwtDecode} from 'jwt-decode';
import NavbarAdmin from "./components/NanvarAdmin";
import NavbarCliente from "./components/NavbarClient";

function App() {
  let tipoUsuario = null;
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const decoded = jwtDecode<{ tipoUsuario: string }>(token);
            tipoUsuario = decoded.tipoUsuario;
            console.log("Tipo de usuario:", tipoUsuario);
        } catch (e) {
            console.error("Error al leer token");
        }
    }

  return (
    <div className="App">
      <BrowserRouter>
        {tipoUsuario === 'Admin' ? <NavbarAdmin /> : <NavbarCliente />}
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Products" element={<Products/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
