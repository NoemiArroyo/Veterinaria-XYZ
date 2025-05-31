package veterinariaXYZ.Business;

import veterinariaXYZ.dto.PacienteDTO;
import veterinariaXYZ.manager.ManagerPaciente;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;



import java.io.ByteArrayOutputStream;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Component
@Transactional

public class BusinessPacienteImplement implements BusinessPaciente {

    private ManagerPaciente managerPaciente;

    public BusinessPacienteImplement(ManagerPaciente managerPaciente) {
        this.managerPaciente = managerPaciente;
    }

    public void registrar(PacienteDTO paciente) throws Exception {
        // Validaciones de negocio
        if (paciente.getNombrePaciente() == null || paciente.getNombrePaciente().trim().isEmpty()) {
            throw new Exception("El nombre del paciente es obligatorio");
        }
        if (paciente.getIdentificacionDueno() == null || paciente.getIdentificacionDueno().trim().isEmpty()) {
            throw new Exception("La identificación del dueño es obligatoria");
        }
        if (paciente.getNombreDueno() == null || paciente.getNombreDueno().trim().isEmpty()) {
            throw new Exception("El nombre del dueño es obligatorio");
        }

        managerPaciente.crear(paciente);
    }

    public PacienteDTO selectById(PacienteDTO paciente) throws Exception {
        PacienteDTO pacienteData = managerPaciente.selectById(paciente);
        return pacienteData;
    }

    public List<PacienteDTO> selectAll() throws Exception {
        List<PacienteDTO> pacienteData = managerPaciente.selectAll();
        return pacienteData;
    }

    public void actualizar(PacienteDTO paciente) throws Exception {
        // Validaciones de negocio
        if (paciente.getId() == null || paciente.getId().trim().isEmpty()) {
            throw new Exception("El ID del paciente es obligatorio para actualizar");
        }
        if (paciente.getNombrePaciente() == null || paciente.getNombrePaciente().trim().isEmpty()) {
            throw new Exception("El nombre del paciente es obligatorio");
        }

        managerPaciente.update(paciente);
    }

    public void eliminar(PacienteDTO paciente) throws Exception {
        if (paciente.getId() == null || paciente.getId().trim().isEmpty()) {
            throw new Exception("El ID del paciente es obligatorio para eliminar");
        }

        managerPaciente.delete(paciente);
    }



    public byte[] exportarExcel() throws Exception {
        List<PacienteDTO> pacientes = managerPaciente.selectAll();

        try (Workbook workbook = new XSSFWorkbook();
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            Sheet sheet = workbook.createSheet("Pacientes");

            // Crear encabezados
            Row headerRow = sheet.createRow(0);
            String[] headers = {
                    "ID", "Nombre Paciente", "Especie", "Raza", "Fecha Nacimiento",
                    "Tipo ID Dueño", "ID Dueño", "Nombre Dueño", "Ciudad",
                    "Dirección", "Teléfono", "Fecha Registro"
            };

            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
            }

            // Llenar datos
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            for (int i = 0; i < pacientes.size(); i++) {
                Row row = sheet.createRow(i + 1);
                PacienteDTO p = pacientes.get(i);

                row.createCell(0).setCellValue(p.getId());
                row.createCell(1).setCellValue(p.getNombrePaciente());
                row.createCell(2).setCellValue(p.getEspecie());
                row.createCell(3).setCellValue(p.getRaza());
                row.createCell(4).setCellValue(p.getFechaNacimiento() != null ?
                        p.getFechaNacimiento().format(formatter) : "");
                row.createCell(5).setCellValue(p.getTipoIdentificacionDueno());
                row.createCell(6).setCellValue(p.getIdentificacionDueno());
                row.createCell(7).setCellValue(p.getNombreDueno());
                row.createCell(8).setCellValue(p.getCiudad());
                row.createCell(9).setCellValue(p.getDireccion());
                row.createCell(10).setCellValue(p.getTelefono());
                row.createCell(11).setCellValue(p.getFechaRegistro() != null ?
                        p.getFechaRegistro().format(formatter) : "");
            }

            workbook.write(out);
            return out.toByteArray();
        }
    }
}



