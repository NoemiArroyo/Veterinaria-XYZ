package veterinariaXYZ.dao;
import veterinariaXYZ.dto.PacienteDTO;
import veterinariaXYZ.exception.DaoException;
import java.util.List;
public interface PacienteDao {
    public void insert(PacienteDTO paciente) throws DaoException;
    public void update(PacienteDTO paciente) throws DaoException;
    public void delete(PacienteDTO paciente) throws DaoException;
    public PacienteDTO selectById(PacienteDTO paciente) throws DaoException;
    public List<PacienteDTO> selectAll() throws DaoException;
}

