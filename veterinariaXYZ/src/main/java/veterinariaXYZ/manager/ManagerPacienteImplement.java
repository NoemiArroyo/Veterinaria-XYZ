package veterinariaXYZ.manager;
import veterinariaXYZ.dao.PacienteDao;
import veterinariaXYZ.dto.PacienteDTO;
import org.springframework.stereotype.Component;
import java.time.LocalDate;
import java.util.List;

    @Component
    public class ManagerPacienteImplement implements ManagerPaciente {

        private PacienteDao pacienteDao;

        public ManagerPacienteImplement(PacienteDao pacienteDao) {
            this.pacienteDao = pacienteDao;
        }

        public void crear(PacienteDTO paciente) throws Exception {
            PacienteDTO pacienteExistente = pacienteDao.selectById(paciente);

            if (pacienteExistente == null) {
                // Establecer fecha de registro si no está definida
                if (paciente.getFechaRegistro() == null) {
                    paciente.setFechaRegistro(LocalDate.now());
                }
                pacienteDao.insert(paciente);
            } else {
                pacienteDao.update(paciente);
            }
        }

        public PacienteDTO selectById(PacienteDTO paciente) throws Exception {
            PacienteDTO pacienteData = pacienteDao.selectById(paciente);
            return pacienteData;
        }

        public List<PacienteDTO> selectAll() throws Exception {
            List<PacienteDTO> lista = pacienteDao.selectAll();
            return lista;
        }

        public void delete(PacienteDTO paciente) throws Exception {
            if (paciente.getId() != null && !paciente.getId().isEmpty()) {
                pacienteDao.delete(paciente);
            }
        }

        public void update(PacienteDTO paciente) throws Exception {
            if (paciente.getId() != null && !paciente.getId().isEmpty()) {
                pacienteDao.update(paciente);
            }
        }
    }

