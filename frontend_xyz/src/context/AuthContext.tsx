import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { AuthContextType, LoginResponse, ResponseMessage } from "../types"
import { apiService } from "../services/api"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    const storedUsername = localStorage.getItem("username")

    if (storedToken && storedUsername) {
      setToken(storedToken)
      setUsername(storedUsername)
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response: ResponseMessage<LoginResponse> = await apiService.login(username, password)

      if (response.code === 200 && response.data.success) {
        setToken(response.data.token)
        setUsername(response.data.username)
        setIsAuthenticated(true)

        localStorage.setItem("token", response.data.token)
        localStorage.setItem("username", response.data.username)

        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const logout = () => {
    setToken(null)
    setUsername(null)
    setIsAuthenticated(false)

    localStorage.removeItem("token")
    localStorage.removeItem("username")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, username, login, logout }}>{children}</AuthContext.Provider>
  )
}