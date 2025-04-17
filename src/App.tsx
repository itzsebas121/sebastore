import {  Routes, Route, BrowserRouter } from "react-router-dom";
import "./Styles/var.css";
import "./Styles/global.css";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import Navbar from "./components/Navbar";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Products" element={<Products/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
