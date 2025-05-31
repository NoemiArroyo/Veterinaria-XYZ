package veterinariaXYZ.controller;
import veterinariaXYZ.Business.BusinessPaciente;
import veterinariaXYZ.dto.PacienteDTO;
import veterinariaXYZ.mensaje.ResponseMessage;

import lombok.extern.slf4j.Slf4j; // NO FUNCIONA :/

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController

@RequestMapping("/api/paciente/")
@CrossOrigin(origins = "*")

public class PacienteController {

        private static final Logger log = LoggerFactory.getLogger(PacienteController.class);

        private BusinessPaciente businessPaciente;

        public PacienteController(BusinessPaciente businessPaciente) {
            this.businessPaciente = businessPaciente;
        }

        @PostMapping({"/saveOrUpdate"})
        public ResponseEntity<ResponseMessage<PacienteDTO>> saveOrUpdate(@RequestBody PacienteDTO request) {
            ResponseMessage message = null;
            try {
                this.businessPaciente.registrar(request);
                message = new ResponseMessage<>(200, "Paciente guardado exitosamente", request);
            } catch (Exception ex) {
                log.error("Error al guardar paciente: ", ex);
                message = new ResponseMessage<>(400, ex.getMessage(), request);
            }
            return ResponseEntity.ok(message);
        }

        @PostMapping({"/selectById"})
        public ResponseEntity<ResponseMessage<PacienteDTO>> selectById(@RequestBody PacienteDTO request) {
            ResponseMessage message = null;
            try {
                PacienteDTO pacienteFound = this.businessPaciente.selectById(request);
                message = new ResponseMessage<>(200, "Consulta exitosa", pacienteFound);
            } catch (Exception ex) {
                log.error("Error al buscar paciente: ", ex);
                message = new ResponseMessage<>(404, ex.getMessage(), null);
            }
            return ResponseEntity.ok(message);
        }

        @GetMapping({"/selectAll"})
        public ResponseEntity<ResponseMessage<List<PacienteDTO>>> selectAll() {
            ResponseMessage message = null;
            try {
                List<PacienteDTO> pacientes = this.businessPaciente.selectAll();
                message = new ResponseMessage<>(200, "Consulta exitosa", pacientes);
            } catch (Exception ex) {
                log.error("Error al listar pacientes: ", ex);
                message = new ResponseMessage<>(500, ex.getMessage(), null);
            }
            return ResponseEntity.ok(message);
        }

        @PutMapping({"/update"})
        public ResponseEntity<ResponseMessage<PacienteDTO>> update(@RequestBody PacienteDTO request) {
            ResponseMessage message = null;
            try {
                this.businessPaciente.actualizar(request);
                message = new ResponseMessage<>(200, "Paciente actualizado exitosamente", request);
            } catch (Exception ex) {
                log.error("Error al actualizar paciente: ", ex);
                message = new ResponseMessage<>(400, ex.getMessage(), request);
            }
            return ResponseEntity.ok(message);
        }

        @DeleteMapping({"/delete"})
        public ResponseEntity<ResponseMessage<String>> delete(@RequestBody PacienteDTO request) {
            ResponseMessage message = null;
            try {
                this.businessPaciente.eliminar(request);
                message = new ResponseMessage<>(200, "Paciente eliminado exitosamente", "Eliminado");
            } catch (Exception ex) {
                log.error("Error al eliminar paciente: ", ex);
                message = new ResponseMessage<>(400, ex.getMessage(), "Error");
            }
            return ResponseEntity.ok(message);
        }

        @GetMapping({"/export/excel"})
        public ResponseEntity<byte[]> exportExcel() {
            try {
                byte[] excelData = this.businessPaciente.exportarExcel();

                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
                headers.setContentDispositionFormData("attachment", "pacientes.xlsx");

                return new ResponseEntity<>(excelData, headers, HttpStatus.OK);
            } catch (Exception ex) {
                log.error("Error al exportar Excel: ", ex);
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

