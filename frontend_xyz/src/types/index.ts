export interface Paciente {
  id?: string
  nombrePaciente: string
  especie: string
  raza: string
  fechaNacimiento: string
  tipoIdentificacionDueno: string
  identificacionDueno: string
  nombreDueno: string
  ciudad: string
  direccion: string
  telefono: string
  fechaRegistro?: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  username: string
  success: boolean
}

export interface ResponseMessage<T> {
  code: number
  message: string
  data: T
}

export interface AuthContextType {
  isAuthenticated: boolean
  token: string | null
  username: string | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}