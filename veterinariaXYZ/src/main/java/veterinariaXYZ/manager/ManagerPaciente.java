package veterinariaXYZ.manager;
import veterinariaXYZ.dto.PacienteDTO;

import java.util.List;

public interface ManagerPaciente {
    public void crear(PacienteDTO paciente) throws Exception;
    public PacienteDTO selectById(PacienteDTO paciente) throws Exception;
    public List<PacienteDTO> selectAll() throws Exception;
    public void delete(PacienteDTO paciente) throws Exception;
    public void update(PacienteDTO paciente) throws Exception;
}
