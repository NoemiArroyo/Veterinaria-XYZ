package veterinariaXYZ.Business;

import veterinariaXYZ.dto.PacienteDTO;
import java.util.List;

public interface BusinessPaciente {

    public void registrar(PacienteDTO paciente) throws Exception;
    public PacienteDTO selectById(PacienteDTO paciente) throws Exception;
    public List<PacienteDTO> selectAll() throws Exception;
    public void actualizar(PacienteDTO paciente) throws Exception;
    public void eliminar(PacienteDTO paciente) throws Exception;
    public byte[] exportarExcel() throws Exception;
}

