import type React from "react"
import { NavLink } from "react-router-dom"
import { Home, Users, Plus, FileText } from "lucide-react"

const Sidebar: React.FC = () => {
  const navItems = [
    { to: "/dashboard", icon: Home, label: "Dashboard" },
    { to: "/pacientes", icon: Users, label: "Pacientes" },
    { to: "/pacientes/nuevo", icon: Plus, label: "Nuevo Paciente" },
  ]

  return (
    <aside className="bg-gray-50 w-64 min-h-screen border-r border-gray-200">
      <nav className="mt-8">
        <div className="px-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? "bg-blue-100 text-blue-700 border-r-2 border-blue-700"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    }`
                  }
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar
