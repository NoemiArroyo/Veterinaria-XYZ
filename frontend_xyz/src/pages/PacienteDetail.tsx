import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { ArrowLeft, Edit, Trash2, Calendar, User, Phone, MapPin, Heart } from "lucide-react"
import { apiService } from "../services/api"
import type { Paciente, ResponseMessage } from "../types"
import LoadingSpinner from "../components/UI/LoadingSpinner"
import Alert from "../components/UI/Alert"

const PacienteDetail: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [paciente, setPaciente] = useState<Paciente | null>(null)
  const [loading, setLoading] = useState(true)
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null)

  useEffect(() => {
    if (id) {
      loadPaciente(id)
    }
  }, [id])

  const loadPaciente = async (pacienteId: string) => {
    try {
      const response: ResponseMessage<Paciente> = await apiService.getPacienteById(pacienteId)

      if (response.code === 200 && response.data) {
        setPaciente(response.data)
      } else {
        setAlert({ type: "error", message: "Paciente no encontrado" })
      }
    } catch (error) {
      setAlert({ type: "error", message: "Error al cargar el paciente" })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!paciente?.id || !window.confirm("¿Estás seguro de que quieres eliminar este paciente?")) {
      return
    }

    try {
      const response = await apiService.deletePaciente(paciente.id)

      if (response.code === 200) {
        setAlert({ type: "success", message: "Paciente eliminado exitosamente" })
        setTimeout(() => {
          navigate("/pacientes")
        }, 2000)
      } else {
        setAlert({ type: "error", message: response.message || "Error al eliminar el paciente" })
      }
    } catch (error) {
      setAlert({ type: "error", message: "Error de conexión" })
    }
  }

  const calculateAge = (fechaNacimiento: string) => {
    const birth = new Date(fechaNacimiento)
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - birth.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 365) {
      const months = Math.floor(diffDays / 30)
      return months > 0 ? `${months} meses` : `${diffDays} días`
    } else {
      const years = Math.floor(diffDays / 365)
      return `${years} años`
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (!paciente) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Paciente no encontrado</p>
        <Link to="/pacientes" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
          Volver a la lista
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/pacientes")}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Detalles del Paciente</h1>
            <p className="text-gray-600">Información completa del paciente</p>
          </div>
        </div>

      </div>

      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Información Principal */}
        <div className="lg:col-span-2 space-y-6">

        
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Heart className="h-5 w-5 text-blue-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Información del Paciente</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500">Nombre</label>
                <p className="mt-1 text-lg font-semibold text-gray-900">{paciente.nombrePaciente}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500">Especie</label>
                <p className="mt-1 text-lg text-gray-900">{paciente.especie}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500">Raza</label>
                <p className="mt-1 text-lg text-gray-900">{paciente.raza || "No especificada"}</p>
              </div>

              {paciente.fechaNacimiento && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Edad</label>
                  <p className="mt-1 text-lg text-gray-900">
                    {calculateAge(paciente.fechaNacimiento)}
                    <span className="text-sm text-gray-500 ml-2">(Nacido: {paciente.fechaNacimiento})</span>
                  </p>
                </div>
              )}
            </div>
          </div>

          
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <User className="h-5 w-5 text-green-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Información del Dueño</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500">Nombre</label>
                <p className="mt-1 text-lg text-gray-900">{paciente.nombreDueno}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500">Identificación</label>
                <p className="mt-1 text-lg text-gray-900">
                  {paciente.tipoIdentificacionDueno}: {paciente.identificacionDueno}
                </p>
              </div>

              {paciente.telefono && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Teléfono</label>
                  <div className="mt-1 flex items-center">
                    <Phone className="h-4 w-4 text-gray-400 mr-2" />
                    <p className="text-lg text-gray-900">{paciente.telefono}</p>
                  </div>
                </div>
              )}

              {paciente.ciudad && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Ciudad</label>
                  <div className="mt-1 flex items-center">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                    <p className="text-lg text-gray-900">{paciente.ciudad}</p>
                  </div>
                </div>
              )}

              {paciente.direccion && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-500">Dirección</label>
                  <p className="mt-1 text-lg text-gray-900">{paciente.direccion}</p>
                </div>
              )}
            </div>
          </div>
        </div>

       
        <div className="space-y-6">
          
          {/* Información de Registro */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Calendar className="h-5 w-5 text-purple-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Registro</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">ID del Paciente</label>
                <p className="mt-1 text-sm font-mono text-gray-900 bg-gray-50 p-2 rounded">{paciente.id}</p>
              </div>

              {paciente.fechaRegistro && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Fecha de Registro</label>
                  <p className="mt-1 text-lg text-gray-900">{paciente.fechaRegistro}</p>
                </div>
              )}
            </div>
          </div>


          {/* Acciones Rápidas */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h2>

            <div className="space-y-3">
              <Link
                to={`/pacientes/${paciente.id}/editar`}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Edit className="h-4 w-4 mr-2" />
                Editar Información
              </Link>

              <button
                onClick={handleDelete}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Eliminar Paciente
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PacienteDetail
