const API_BASE_URL = "http://localhost:8080/api"

class ApiService {
  private getAuthHeaders() {
    const token = localStorage.getItem("token")
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: token }),
    }
  }

  async login(username: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
    return response.json()
  }

  async validateToken(token: string) {
    const response = await fetch(`${API_BASE_URL}/auth/validate`, {
      method: "POST",
      headers: { Authorization: token },
    })
    return response.json()
  }

  async getAllPacientes() {
    const response = await fetch(`${API_BASE_URL}/paciente/selectAll`, {
      headers: this.getAuthHeaders(),
    })
    return response.json()
  }

  async getPacienteById(id: string) {
    const response = await fetch(`${API_BASE_URL}/paciente/selectById`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ id }),
    })
    return response.json()
  }

  async saveOrUpdatePaciente(paciente: any) {
    const response = await fetch(`${API_BASE_URL}/paciente/saveOrUpdate`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(paciente),
    })
    return response.json()
  }

  async updatePaciente(paciente: any) {
    const response = await fetch(`${API_BASE_URL}/paciente/update`, {
      method: "PUT",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(paciente),
    })
    return response.json()
  }

  async deletePaciente(id: string) {
    const response = await fetch(`${API_BASE_URL}/paciente/delete`, {
      method: "DELETE",
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ id }),
    })
    return response.json()
  }

  async exportExcel() {
    const response = await fetch(`${API_BASE_URL}/paciente/export/excel`, {
      headers: this.getAuthHeaders(),
    })
    return response.blob()
  }
}

export const apiService = new ApiService()