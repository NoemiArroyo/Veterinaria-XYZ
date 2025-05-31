import type React from "react"
import { AlertCircle, CheckCircle, XCircle, Info } from "lucide-react"

interface AlertProps {
  type: "success" | "error" | "warning" | "info"
  message: string
  onClose?: () => void
}

const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5" />
      case "error":
        return <XCircle className="h-5 w-5" />
      case "warning":
        return <AlertCircle className="h-5 w-5" />
      case "info":
        return <Info className="h-5 w-5" />
    }
  }

  const getStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-50 text-green-800 border-green-200"
      case "error":
        return "bg-red-50 text-red-800 border-red-200"
      case "warning":
        return "bg-yellow-50 text-yellow-800 border-yellow-200"
      case "info":
        return "bg-blue-50 text-blue-800 border-blue-200"
    }
  }

  return (
    <div className={`border rounded-lg p-4 flex items-center ${getStyles()}`}>
      <div className="flex-shrink-0 mr-3">{getIcon()}</div>
      <div className="flex-1">
        <p className="text-sm font-medium">{message}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className="flex-shrink-0 ml-3 text-gray-400 hover:text-gray-600">
          <XCircle className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

export default Alert
