import { useState } from "react"
import { api } from "../utils/api";
import { useNavigate } from "react-router-dom"
/*
useState → Maneja el estado del formulario.
api → Importamos la configuración de Axios desde ../utils/api.js para hacer solicitudes HTTP.
useNavigate → Hook de react-router-dom para redirigir al usuario después de registrarse.
*/


const Register = () => {
  const [user, setUser] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
    id_rol: 2, // Por defecto, usuario normal
  })
  /*
  useState({...}) → Crea un estado con los campos necesarios para registrar un usuario.
  id_rol: 2 → Se asigna automáticamente el rol de usuario normal (id_rol = 2).
  */

  const navigate = useNavigate()

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  /*
  Cada vez que el usuario escribe en un input, esta función actualiza el estado user con los nuevos valores.
  e.target.name → Obtiene el nombre del campo (nombre, correo, contraseña).
  e.target.value → Obtiene el valor ingresado y lo guarda en el estado.
  */

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post("/registros", user);
      alert("Usuario registrado con éxito")
      navigate("/login")
    } catch (error) {
      console.error("Error en el registro:", error)
    }
  }
  /*
  e.preventDefault() → Evita que el formulario recargue la página.
  await api.post("/registros", user); → Envia los datos a la API para registrar el usuario.
  alert("Usuario registrado con éxito") → Muestra un mensaje de confirmación.
  navigate("/login") → Redirige al usuario a la pantalla de login después de registrarse.
  */

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f0f2f5",
    },
    formBox: {
      backgroundColor: "white",
      padding: "2rem",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "400px",
    },
    title: {
      textAlign: "center",
      color: "#333",
      marginBottom: "1.5rem",
      fontSize: "2rem",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    input: {
      padding: "0.75rem",
      borderRadius: "4px",
      border: "1px solid #ccc",
      fontSize: "1rem",
    },
    button: {
      padding: "0.75rem",
      borderRadius: "4px",
      border: "none",
      backgroundColor: "#1877f2",
      color: "white",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    loginButton: {
      backgroundColor: "#42b72a",
      marginTop: "1rem",
    },
  }

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h2 style={styles.title}>Registro</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} required style={styles.input} />
          <input
            type="email"
            name="correo"
            placeholder="Correo"
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="contraseña"
            placeholder="Contraseña"
            onChange={handleChange}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Registrarse
          </button>
        </form>
        <button onClick={() => navigate("/login")} style={{ ...styles.button, ...styles.loginButton }}>
          Ir a Login
        </button>
      </div>
    </div>
  )
  /*
  Formulario (form) → Ejecuta handleSubmit al hacer clic en "Registrarse".
Campos de entrada (input) → Permiten ingresar datos del usuario.
Botón "Registrarse" (button) → Envía los datos al backend.
Botón "Ir a Login" → Redirige a la página de inicio de sesión.

  */
}

export default Register

