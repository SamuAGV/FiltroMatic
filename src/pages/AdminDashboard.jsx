import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart, Users, FileText, Settings, LogOut, Bus, MapPin, Activity, Map } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [systemSummary, setSystemSummary] = useState({
    totalBuses: 0,
    activeRoutes: 0,
    totalEmployees: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      // Aquí podrías hacer una llamada a la API para obtener los datos del sistema
      fetchSystemSummary();
    }
  }, [navigate]);

  const fetchSystemSummary = async () => {
    // Simulación de una llamada a la API
    setTimeout(() => {
      setSystemSummary({
        totalBuses: 50,
        activeRoutes: 15,
        totalEmployees: 120,
      });
    }, 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const menuItems = [
    { name: "Dashboard", icon: BarChart },
    { name: "Buses", icon: Bus },
    { name: "Estados", icon: Activity },
    { name: "Municipios", icon: MapPin },
    { name: "Estaciones", icon: Map },
    { name: "Rutas", icon: Map },
    { name: "Settings", icon: Settings },
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Buenos Días";
    if (hour < 18) return "Buenas Tardes";
    return "Buenas Noches";
  };

  return (
    <div style={styles.container}>
      <div style={styles.mainContent}>
        <header style={styles.header}>
          <h1 style={styles.title}>{getGreeting()}, Administrador</h1>
          <button onClick={handleLogout} style={styles.logoutButton}>
            <LogOut size={20} />
            <span>Cerrar Sesión</span>
          </button>
        </header>
        <div style={styles.dashboardGrid}>
          {[
            { label: "Total de Buses", value: systemSummary.totalBuses },
            { label: "Rutas Activas", value: systemSummary.activeRoutes },
            { label: "Total de Empleados", value: systemSummary.totalEmployees },
          ].map((item) => (
            <div key={item.label} style={styles.card}>
              <h3>{item.label}</h3>
              <p style={styles.cardValue}>{item.value}</p>
            </div>
          ))}
        </div>
        <div style={styles.recentActivity}>
          <h2>Resumen del Sistema</h2>
          <ul style={styles.activityList}>
            {[
              `Total de Buses: ${systemSummary.totalBuses}`,
              `Rutas Activas: ${systemSummary.activeRoutes}`,
              `Total de Empleados: ${systemSummary.totalEmployees}`,
            ].map((activity) => (
              <li key={activity} style={styles.activityItem}>
                {activity}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f0f2f5",
  },
  mainContent: {
    flex: 1,
    padding: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "28px",
    color: "#2d3748",
  },
  logoutButton: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    padding: "10px 15px",
    backgroundColor: "#e53e3e",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  dashboardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  card: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  cardValue: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#4a5568",
  },
  recentActivity: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  activityList: {
    listStyleType: "none",
    padding: 0,
  },
  activityItem: {
    padding: "10px 0",
    borderBottom: "1px solid #e2e8f0",
  },
};

export default AdminDashboard;