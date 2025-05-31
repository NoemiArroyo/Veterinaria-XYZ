package veterinariaXYZ.mapper;

import veterinariaXYZ.dto.PacienteDTO;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;

public class PacienteMapper implements RowMapper<PacienteDTO> {
    public PacienteDTO mapRow(ResultSet resultSet, int i) throws SQLException {
        PacienteDTO paciente = new PacienteDTO();

        paciente.setId(resultSet.getString("id"));
        paciente.setNombrePaciente(resultSet.getString("nombre_paciente"));
        paciente.setEspecie(resultSet.getString("especie"));
        paciente.setRaza(resultSet.getString("raza"));

        // Manejo de fechas con posibles valores null
        if (resultSet.getDate("fecha_nacimiento") != null) {
            paciente.setFechaNacimiento(resultSet.getDate("fecha_nacimiento").toLocalDate());
        }

        paciente.setTipoIdentificacionDueno(resultSet.getString("tipo_identificacion_dueno"));
        paciente.setIdentificacionDueno(resultSet.getString("identificacion_dueno"));
        paciente.setNombreDueno(resultSet.getString("nombre_dueno"));
        paciente.setCiudad(resultSet.getString("ciudad"));
        paciente.setDireccion(resultSet.getString("direccion"));
        paciente.setTelefono(resultSet.getString("telefono"));

        if (resultSet.getDate("fecha_registro") != null) {
            paciente.setFechaRegistro(resultSet.getDate("fecha_registro").toLocalDate());
        }

        return paciente;
    }
}



