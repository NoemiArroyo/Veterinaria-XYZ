package veterinariaXYZ.dao;
import veterinariaXYZ.dto.PacienteDTO;
import veterinariaXYZ.mapper.PacienteMapper;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Date;
import java.util.List;
import java.util.UUID;

@Repository
public class PacienteDaoImplement implements PacienteDao {
    private final JdbcTemplate jdbcTemplate;

    public PacienteDaoImplement(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public void insert(PacienteDTO paciente) {
        String INSERT = "INSERT INTO paciente (id, nombre_paciente, especie, raza, fecha_nacimiento, " +
                "tipo_identificacion_dueno, identificacion_dueno, nombre_dueno, ciudad, " +
                "direccion, telefono, fecha_registro) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        String uuid = UUID.randomUUID().toString();
        paciente.setId(uuid);

        jdbcTemplate.update(INSERT,
                paciente.getId(),
                paciente.getNombrePaciente(),
                paciente.getEspecie(),
                paciente.getRaza(),
                paciente.getFechaNacimiento() != null ? Date.valueOf(paciente.getFechaNacimiento()) : null,
                paciente.getTipoIdentificacionDueno(),
                paciente.getIdentificacionDueno(),
                paciente.getNombreDueno(),
                paciente.getCiudad(),
                paciente.getDireccion(),
                paciente.getTelefono(),
                paciente.getFechaRegistro() != null ? Date.valueOf(paciente.getFechaRegistro()) : null
        );
    }

    public void update(PacienteDTO paciente) {
        String UPDATE = "UPDATE paciente SET " +
                "nombre_paciente = ?, especie = ?, raza = ?, fecha_nacimiento = ?, " +
                "tipo_identificacion_dueno = ?, identificacion_dueno = ?, nombre_dueno = ?, " +
                "ciudad = ?, direccion = ?, telefono = ? " +
                "WHERE id = ?";

        jdbcTemplate.update(UPDATE,
                paciente.getNombrePaciente(),
                paciente.getEspecie(),
                paciente.getRaza(),
                paciente.getFechaNacimiento() != null ? Date.valueOf(paciente.getFechaNacimiento()) : null,
                paciente.getTipoIdentificacionDueno(),
                paciente.getIdentificacionDueno(),
                paciente.getNombreDueno(),
                paciente.getCiudad(),
                paciente.getDireccion(),
                paciente.getTelefono(),
                paciente.getId()
        );
    }

    public void delete(PacienteDTO paciente) {
        String DELETE = "DELETE FROM paciente WHERE id = ?";
        jdbcTemplate.update(DELETE, paciente.getId());
    }

    public PacienteDTO selectById(PacienteDTO paciente) {
        try {
            String QUERY = "SELECT id, nombre_paciente, especie, raza, fecha_nacimiento, " +
                    "tipo_identificacion_dueno, identificacion_dueno, nombre_dueno, ciudad, " +
                    "direccion, telefono, fecha_registro FROM paciente WHERE id = ?";

            return jdbcTemplate.queryForObject(QUERY, new PacienteMapper(), paciente.getId());
        } catch (EmptyResultDataAccessException ex) {
            return null;
        }
    }

    public List<PacienteDTO> selectAll() {
        String SELECT_ALL = "SELECT id, nombre_paciente, especie, raza, fecha_nacimiento, " +
                "tipo_identificacion_dueno, identificacion_dueno, nombre_dueno, ciudad, " +
                "direccion, telefono, fecha_registro FROM paciente ORDER BY fecha_registro DESC";

        return jdbcTemplate.query(SELECT_ALL, new PacienteMapper());
    }
}