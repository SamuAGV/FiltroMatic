import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./components/Login";
import Register from "./components/Register";
import DashboardAdmin from "./pages/AdminDashboard";
import DashboardUser from "./pages/UserDashboard";
//import DashboardVendedor from "./pages/DashboardVendedor";
//import Home from "./pages/Home";
//import NotFound from "./pages/NotFound";


//import "./styles.css"; // Archivo para estilos globales

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<DashboardAdmin />} />
        <Route path="/user" element={<DashboardUser />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
/*
  Renderiza la aplicación en el DOM.
  Configura la navegación con react-router-dom.
  Se asegura de que la aplicación funcione dentro de React.StrictMode (ayuda a detectar problemas en desarrollo).
*/