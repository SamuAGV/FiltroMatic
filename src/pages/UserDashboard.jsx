"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

const DashboardFiltromatic = () => {
  const navigate = useNavigate()
  const [nombreUsuario, setNombreUsuario] = useState("Operador") // Reemplazar con datos reales del usuario

  const handleCerrarSesion = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Dashboard Filtromatic</h1>
        <div style={styles.userInfo}>
          <span>{nombreUsuario}</span>
          <button onClick={handleCerrarSesion} style={styles.logoutButton}>
            Cerrar Sesión
          </button>
        </div>
      </header>
      <main style={styles.main}>
        <section style={styles.metricsSection}>
          <h2>Métricas de Clasificación</h2>
          <div style={styles.metricsGrid}>
            <MetricaCard titulo="Azul" valor="523" unidad="objetos" />
            <MetricaCard titulo="Verde" valor="412" unidad="objetos" />
            <MetricaCard titulo="Amarillo" valor="678" unidad="objetos" />
            <MetricaCard titulo="Rojo" valor="245" unidad="objetos" />
          </div>
        </section>
        <section style={styles.statusSection}>
          <h2>Estado del Sistema</h2>
          <div style={styles.statusGrid}>
            <StatusCard titulo="Sensor de Color" estado="Operativo" />
            <StatusCard titulo="Banda Transportadora" estado="Activa" />
            <StatusCard titulo="Mecanismo de Separación" estado="Funcionando" />
          </div>
        </section>
        <section style={styles.activitySection}>
          <h2>Actividad Reciente</h2>
          <div style={styles.activityList}>
            <ActivityItem texto="Mantenimiento programado" tiempo="En 2 días" />
            <ActivityItem texto="Calibración del sensor" tiempo="Hace 1 hora" />
            <ActivityItem texto="Contenedor azul lleno" tiempo="Hace 30 minutos" />
          </div>
        </section>
      </main>
    </div>
  )
}

const MetricaCard = ({ titulo, valor, unidad }) => (
  <div style={styles.metricaCard}>
    <h3>{titulo}</h3>
    <p style={styles.metricaValor}>
      {valor} <span style={styles.metricaUnidad}>{unidad}</span>
    </p>
  </div>
)

const StatusCard = ({ titulo, estado }) => (
  <div style={styles.statusCard}>
    <h3>{titulo}</h3>
    <p style={styles.statusValor}>{estado}</p>
  </div>
)

const ActivityItem = ({ texto, tiempo }) => (
  <div style={styles.activityItem}>
    <p>{texto}</p>
    <span style={styles.activityTime}>{tiempo}</span>
  </div>
)

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f0f2f5",
    minHeight: "100vh",
  },
  header: {
    backgroundColor: "#ffffff",
    padding: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "24px",
    margin: 0,
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  logoutButton: {
    padding: "8px 15px",
    backgroundColor: "#d9534f",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  main: {
    padding: "20px",
  },
  metricsSection: {
    marginBottom: "30px",
  },
  metricsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },
  metricaCard: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  metricaValor: {
    fontSize: "24px",
    fontWeight: "bold",
    margin: "10px 0",
  },
  metricaUnidad: {
    fontSize: "14px",
    color: "#6c757d",
  },
  statusSection: {
    marginBottom: "30px",
  },
  statusGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },
  statusCard: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  statusValor: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#28a745",
  },
  activitySection: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  activityList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  activityItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "#f8f9fa",
    borderRadius: "5px",
  },
  activityTime: {
    fontSize: "12px",
    color: "#6c757d",
  },
}

export default DashboardFiltromatic

