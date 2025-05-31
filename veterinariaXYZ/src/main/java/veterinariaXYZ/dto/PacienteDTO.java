package veterinariaXYZ.dto;
import java.time.LocalDate;


public class PacienteDTO {

        private String id;
        private String nombrePaciente;
        private String especie;
        private String raza;
        private LocalDate fechaNacimiento;
        private String tipoIdentificacionDueno;
        private String identificacionDueno;
        private String nombreDueno;
        private String ciudad;
        private String direccion;
        private String telefono;
        private LocalDate fechaRegistro;

        public PacienteDTO() {
            id = "";
            nombrePaciente = "";
            especie = "";
            raza = "";
            fechaNacimiento = null;
            tipoIdentificacionDueno = "";
            identificacionDueno = "";
            nombreDueno = "";
            ciudad = "";
            direccion = "";
            telefono = "";
            fechaRegistro = null;
        }

        // Getters
        public String getId() {
            return id;
        }

        public String getNombrePaciente() {
            return nombrePaciente;
        }

        public String getEspecie() {
            return especie;
        }

        public String getRaza() {
            return raza;
        }

        public LocalDate getFechaNacimiento() {
            return fechaNacimiento;
        }

        public String getTipoIdentificacionDueno() {
            return tipoIdentificacionDueno;
        }

        public String getIdentificacionDueno() {
            return identificacionDueno;
        }

        public String getNombreDueno() {
            return nombreDueno;
        }

        public String getCiudad() {
            return ciudad;
        }

        public String getDireccion() {
            return direccion;
        }

        public String getTelefono() {
            return telefono;
        }

        public LocalDate getFechaRegistro() {
            return fechaRegistro;
        }

        // Setters
        public void setId(String id) {
            this.id = id;
        }

        public void setNombrePaciente(String nombrePaciente) {
            this.nombrePaciente = nombrePaciente;
        }

        public void setEspecie(String especie) {
            this.especie = especie;
        }

        public void setRaza(String raza) {
            this.raza = raza;
        }

        public void setFechaNacimiento(LocalDate fechaNacimiento) {
            this.fechaNacimiento = fechaNacimiento;
        }

        public void setTipoIdentificacionDueno(String tipoIdentificacionDueno) {
            this.tipoIdentificacionDueno = tipoIdentificacionDueno;
        }

        public void setIdentificacionDueno(String identificacionDueno) {
            this.identificacionDueno = identificacionDueno;
        }

        public void setNombreDueno(String nombreDueno) {
            this.nombreDueno = nombreDueno;
        }

        public void setCiudad(String ciudad) {
            this.ciudad = ciudad;
        }

        public void setDireccion(String direccion) {
            this.direccion = direccion;
        }

        public void setTelefono(String telefono) {
            this.telefono = telefono;
        }

        public void setFechaRegistro(LocalDate fechaRegistro) {
            this.fechaRegistro = fechaRegistro;
        }
    }