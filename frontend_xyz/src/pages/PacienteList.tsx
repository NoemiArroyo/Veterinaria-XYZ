import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Search, Plus, Edit, Trash2, Download, Eye } from "lucide-react"
import { apiService } from "../services/api"
import type { Paciente, ResponseMessage } from "../types"
import LoadingSpinner from "../components/UI/LoadingSpinner"
import Alert from "../components/UI/Alert"

const PacientesList: React.FC = () => {
  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const [filteredPacientes, setFilteredPacientes] = useState<Paciente[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null)

  useEffect(() => {
    loadPacientes()
  }, [])

  useEffect(() => {
    filterPacientes()
  }, [searchTerm, pacientes])

  const loadPacientes = async () => {
    try {
      const response: ResponseMessage<Paciente[]> = await apiService.getAllPacientes()

      if (response.code === 200 && response.data) {
        setPacientes(response.data)
      } else {
        setAlert({ type: "error", message: "Error al cargar los pacientes" })
      }
    } catch (error) {
      setAlert({ type: "error", message: "Error de conexión" })
    } finally {
      setLoading(false)
    }
  }

  const filterPacientes = () => {
    if (!searchTerm) {
      setFilteredPacientes(pacientes)
      return
    }

    const filtered = pacientes.filter(
      (paciente) =>
        paciente.nombrePaciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paciente.nombreDueno.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paciente.especie.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paciente.raza.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paciente.identificacionDueno.includes(searchTerm),
    )

    setFilteredPacientes(filtered)
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este paciente?")) {
      return
    }

    try {
      const response = await apiService.deletePaciente(id)

      if (response.code === 200) {
        setAlert({ type: "success", message: "Paciente eliminado exitosamente" })
        loadPacientes()
      } else {
        setAlert({ type: "error", message: response.message || "Error al eliminar el paciente" })
      }
    } catch (error) {
      setAlert({ type: "error", message: "Error de conexión" })
    }
  }

  const handleExportExcel = async () => {
    try {
      const blob = await apiService.exportExcel()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "pacientes.xlsx"
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      setAlert({ type: "error", message: "Error al exportar Excel" })
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pacientes</h1>
          <p className="text-gray-600">Gestiona todos los pacientes registrados</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button
            onClick={handleExportExcel}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Download className="h-4 w-4 mr-2" />
            Exportar Excel
          </button>
          <Link
            to="/pacientes/nuevo"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Paciente
          </Link>
        </div>
      </div>

      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      {/* Barra de búsqueda */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre del paciente, dueño, especie, raza o identificación..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Tabla de pacientes */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paciente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Especie/Raza
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dueño
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contacto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha Registro
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPacientes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    {searchTerm
                      ? "No se encontraron pacientes que coincidan con la búsqueda"
                      : "No hay pacientes registrados"}
                  </td>
                </tr>
              ) : (
                filteredPacientes.map((paciente) => (
                  <tr key={paciente.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{paciente.nombrePaciente}</div>
                        <div className="text-sm text-gray-500">
                          {paciente.fechaNacimiento && `Nacido: ${paciente.fechaNacimiento}`}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{paciente.especie}</div>
                      <div className="text-sm text-gray-500">{paciente.raza}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{paciente.nombreDueno}</div>
                      <div className="text-sm text-gray-500">
                        {paciente.tipoIdentificacionDueno}: {paciente.identificacionDueno}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{paciente.telefono}</div>
                      <div className="text-sm text-gray-500">{paciente.ciudad}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{paciente.fechaRegistro}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          to={`/pacientes/${paciente.id}`}
                          className="text-blue-600 hover:text-blue-900"
                          title="Ver detalles"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <Link
                          to={`/pacientes/${paciente.id}/editar`}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Editar"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(paciente.id!)}
                          className="text-red-600 hover:text-red-900"
                          title="Eliminar"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Resumen */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <p className="text-sm text-gray-600">
          Mostrando {filteredPacientes.length} de {pacientes.length} pacientes
        </p>
      </div>
    </div>
  )
}

export default PacientesList
