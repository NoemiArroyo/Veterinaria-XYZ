import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Save, ArrowLeft } from "lucide-react"
import { apiService } from "../services/api"
import type { Paciente, ResponseMessage } from "../types"
import LoadingSpinner from "../components/UI/LoadingSpinner"
import Alert from "../components/UI/Alert"

const PacienteForm: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = Boolean(id)

  const [formData, setFormData] = useState<Paciente>({
    nombrePaciente: "",
    especie: "",
    raza: "",
    fechaNacimiento: "",
    tipoIdentificacionDueno: "CC",
    identificacionDueno: "",
    nombreDueno: "",
    ciudad: "",
    direccion: "",
    telefono: "",
  })

  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(isEditing)
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null)

  useEffect(() => {
    if (isEditing && id) {
      loadPaciente(id)
    }
  }, [isEditing, id])

  const loadPaciente = async (pacienteId: string) => {
    try {
      const response: ResponseMessage<Paciente> = await apiService.getPacienteById(pacienteId)

      if (response.code === 200 && response.data) {
        setFormData(response.data)
      } else {
        setAlert({ type: "error", message: "Paciente no encontrado" })
        navigate("/pacientes")
      }
    } catch (error) {
      setAlert({ type: "error", message: "Error al cargar el paciente" })
    } finally {
      setLoadingData(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setAlert(null)

    try {
      let response

      if (isEditing) {
        response = await apiService.updatePaciente(formData)
      } else {
        response = await apiService.saveOrUpdatePaciente(formData)
      }

      if (response.code === 200) {
        setAlert({
          type: "success",
          message: isEditing ? "Paciente actualizado exitosamente" : "Paciente registrado exitosamente",
        })

        setTimeout(() => {
          navigate("/pacientes")
        }, 2000)
      } else {
        setAlert({ type: "error", message: response.message || "Error al guardar el paciente" })
      }
    } catch (error) {
      setAlert({ type: "error", message: "Error de conexión" })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (loadingData) {
    return <LoadingSpinner />
  }

  const especies = ["Perro", "Gato", "Ave", "Conejo", "Hamster", ]
  const tiposIdentificacion = [
    { value: "CC", label: "Cédula de Ciudadanía" },
    { value: "CE", label: "Cédula de Extranjería" },
    { value: "TI", label: "Tarjeta de Identidad" },
    { value: "PP", label: "Pasaporte" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button onClick={() => navigate("/pacientes")} className="flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{isEditing ? "Editar Paciente" : "Nuevo Paciente"}</h1>
          <p className="text-gray-600">
            {isEditing ? "Actualiza la información del paciente" : "Registra un nuevo paciente en el sistema"}
          </p>
        </div>
      </div>

      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="p-6 space-y-6">
          {/* Información del Paciente */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Información del Paciente</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="nombrePaciente" className="block text-sm font-medium text-gray-700">
                  Nombre del Paciente *
                </label>
                <input
                  type="text"
                  id="nombrePaciente"
                  name="nombrePaciente"
                  required
                  value={formData.nombrePaciente}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="especie" className="block text-sm font-medium text-gray-700">
                  Especie *
                </label>
                <select
                  id="especie"
                  name="especie"
                  required
                  value={formData.especie}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Selecciona una especie</option>
                  {especies.map((especie) => (
                    <option key={especie} value={especie}>
                      {especie}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="raza" className="block text-sm font-medium text-gray-700">
                  Raza
                </label>
                <input
                  type="text"
                  id="raza"
                  name="raza"
                  value={formData.raza}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="fechaNacimiento" className="block text-sm font-medium text-gray-700">
                  Fecha de Nacimiento
                </label>
                <input
                  type="date"
                  id="fechaNacimiento"
                  name="fechaNacimiento"
                  value={formData.fechaNacimiento}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Información del Dueño */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Información del Dueño</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="nombreDueno" className="block text-sm font-medium text-gray-700">
                  Nombre del Dueño *
                </label>
                <input
                  type="text"
                  id="nombreDueno"
                  name="nombreDueno"
                  required
                  value={formData.nombreDueno}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="tipoIdentificacionDueno" className="block text-sm font-medium text-gray-700">
                  Tipo de Identificación *
                </label>
                <select
                  id="tipoIdentificacionDueno"
                  name="tipoIdentificacionDueno"
                  required
                  value={formData.tipoIdentificacionDueno}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {tiposIdentificacion.map((tipo) => (
                    <option key={tipo.value} value={tipo.value}>
                      {tipo.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="identificacionDueno" className="block text-sm font-medium text-gray-700">
                  Número de Identificación *
                </label>
                <input
                  type="text"
                  id="identificacionDueno"
                  name="identificacionDueno"
                  required
                  value={formData.identificacionDueno}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="ciudad" className="block text-sm font-medium text-gray-700">
                  Ciudad
                </label>
                <input
                  type="text"
                  id="ciudad"
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">
                  Dirección
                </label>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate("/pacientes")}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="h-4 w-4 mr-2" />
            {loading ? "Guardando..." : isEditing ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default PacienteForm
