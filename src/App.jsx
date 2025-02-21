import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/user" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
/* 
Maneja las rutas de la aplicación con react-router-dom.
Redirige a diferentes páginas según la URL.
Importa y muestra los componentes correspondientes.

| Ruta    | Componente Cargado   | Descripción                        |
|---------|----------------------|------------------------------------|
| /       | `<Register />`       | Página de Registro por defecto.    |
| /login  | `<Login />`          | Página de Inicio de Sesión.        |
| /admin  | `<AdminDashboard />` | Dashboard del Administrador.       |
| /user   | `<UserDashboard />`  | Dashboard del Usuario.             |
*/