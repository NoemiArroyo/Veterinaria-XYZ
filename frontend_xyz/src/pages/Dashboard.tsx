import type React from "react"
import { Link } from "react-router-dom"
import { Users, Plus, Upload} from "lucide-react"

const Dashboard: React.FC = () => {
  
  const quickActions = [
    {
      title: "Nuevo Paciente",
      description: "Registrar un nuevo paciente",
      icon: Plus,
      link: "/pacientes/nuevo",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      title: "Ver Pacientes",
      description: "Lista de todos los pacientes",
      icon: Users,
      link: "/pacientes",
      color: "bg-green-500 hover:bg-green-600",
    },
   
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      </div> 

      {/* Acciones Rápidas */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className={`${action.color} text-white p-6 rounded-lg transition-colors`}
            >
              <div className="flex items-center">
                <action.icon className="h-8 w-8 mr-4" />
                <div>
                  <h3 className="font-semibold">{action.title}</h3>
                  <p className="text-sm opacity-90">{action.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
