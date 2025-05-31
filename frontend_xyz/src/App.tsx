import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"
import Layout from "./components/Layout/Layout"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import PacientesList from "./pages/PacienteList"
import PacienteForm from "./pages/PacienteForm"
import PacienteDetail from "./pages/PacienteDetail"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/Dashboard" replace />} />
            <Route path="Dashboard" element={<Dashboard />} />
            <Route path="pacientes" element={<PacientesList />} />
            <Route path="pacientes/nuevo" element={<PacienteForm />} />
            <Route path="pacientes/:id" element={<PacienteDetail />} />
            <Route path="pacientes/:id/editar" element={<PacienteForm />} />
          </Route>
          <Route path="*" element={<Navigate to="/Dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App