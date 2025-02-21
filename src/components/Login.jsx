import { useState, useEffect } from "react";
import { api } from "../utils/api";
import { useNavigate } from "react-router-dom";
/* 
useState → Maneja los estados del formulario (correo, contraseña, intentos fallidos, etc.).
useEffect → Ejecuta código en ciertos momentos, aquí para manejar el temporizador de bloqueo.
api → Configuración de Axios (../utils/api.js) para hacer peticiones al backend.
useNavigate → Hook de react-router-dom para redirigir a otras páginas después del login.
*/

const Login = () => {
  const [user, setUser] = useState({ correo: "", contraseña: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0); // Tiempo restante en segundos
  const navigate = useNavigate();
/*
user → Guarda el correo y la contraseña ingresados.
showPassword → Controla si la contraseña es visible o no.
attempts → Lleva la cuenta de intentos fallidos.
isBlocked → Bloquea el formulario si se supera el límite de intentos.
timeLeft → Cuenta regresiva para desbloquear el formulario.
*/

  useEffect(() => {
    if (isBlocked && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer); // Limpiar el intervalo al desmontar
    } else if (timeLeft === 0 && isBlocked) {
      setIsBlocked(false); // Desbloquear el formulario cuando el tiempo llegue a 0
      setAttempts(0); // Reiniciar los intentos
    }
  }, [isBlocked, timeLeft]);
/*
Si el formulario está bloqueado (isBlocked) y timeLeft > 0:
Se inicia un temporizador que reduce timeLeft cada segundo.
Cuando timeLeft llega a 0:
Se desbloquea el formulario y se reinician los intentos.
clearInterval(timer) → Evita que el temporizador siga corriendo si el componente se desmonta.
*/

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
/* Cada vez que el usuario escribe, actualiza el estado con los nuevos valores.*/

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isBlocked) return;
  
    try {
      const { data } = await api.post("/login", user);
      localStorage.setItem("token", data.token); // Guarda el token
  
      alert("Inicio de sesión exitoso");
      if (data.id_rol === 1) {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (error) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= 3) {
        setIsBlocked(true);
        setTimeLeft(30); // Bloquear por 30 segundos
        alert("Formulario bloqueado. Demasiados intentos fallidos.");
      } else {
        alert(`Credenciales incorrectas. Intentos restantes: ${3 - newAttempts}`);
      }
      console.error("Error en el login:", error);
    }
  };
/* 
1️ Evita el envío del formulario con e.preventDefault().
2️ Si el formulario está bloqueado, se detiene la ejecución.
3️ Llama a la API con api.post("/login", user):

Si es exitoso:
Guarda el token en localStorage.
Redirige al usuario según su rol (id_rol):
id_rol === 1 → /admin
id_rol !== 1 → /user
Si falla:
Aumenta el contador de intentos.
Si llega a 3 intentos fallidos, bloquea el formulario por 30 segundos.
Si quedan intentos, muestra un mensaje con los intentos restantes.

*/

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
/*Cambia el estado showPassword entre true y false */

  const styles = {
    loginContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f0f2f5",
    },
    loginBox: {
      backgroundColor: "white",
      padding: "2rem",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "400px",
      position: "relative",
    },
    loginTitle: {
      textAlign: "center",
      color: "#333",
      marginBottom: "1.5rem",
      fontSize: "2rem",
    },
    loginForm: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    loginInput: {
      padding: "0.75rem",
      borderRadius: "4px",
      border: "1px solid #ccc",
      fontSize: "1rem",
    },
    loginButton: {
      padding: "0.75rem",
      borderRadius: "4px",
      border: "none",
      backgroundColor: "#1877f2",
      color: "white",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    registerButton: {
      backgroundColor: "#42b72a",
    },
    passwordContainer: {
      position: "relative",
    },
    togglePasswordButton: {
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "#1877f2",
    },
    timerMessage: {
      textAlign: "center",
      color: "#ff0000",
      marginBottom: "1rem",
      fontSize: "1rem",
    },
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginBox}>
        <h2 style={styles.loginTitle}>Login</h2>
        {isBlocked && (
          <p style={styles.timerMessage}>
            Formulario bloqueado. Intenta nuevamente en {timeLeft} segundos.
          </p>
        )}
        <form onSubmit={handleSubmit} style={styles.loginForm}>
          <input
            type="email"
            name="correo"
            placeholder="Correo"
            onChange={handleChange}
            required
            style={styles.loginInput}
            disabled={isBlocked}
          />
          <div style={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              name="contraseña"
              placeholder="Contraseña"
              onChange={handleChange}
              required
              style={styles.loginInput}
              disabled={isBlocked}
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              style={styles.togglePasswordButton}
              disabled={isBlocked}
            >
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>
          <button
            type="submit"
            style={styles.loginButton}
            disabled={isBlocked}
          >
            Iniciar sesión
          </button>
          <button
            onClick={() => navigate("/")}
            style={{ ...styles.loginButton, ...styles.registerButton }}
          >
            Registro
          </button>
        </form>
      </div>
    </div>
  );
  /*
  Bloquea los inputs y botones cuando isBlocked === true.
Muestra mensaje de bloqueo si timeLeft > 0. 
*/
};

export default Login;