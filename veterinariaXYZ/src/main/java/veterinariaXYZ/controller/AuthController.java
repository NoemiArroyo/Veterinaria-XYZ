package veterinariaXYZ.controller;
import veterinariaXYZ.dto.LoginRequest;
import veterinariaXYZ.dto.LoginResponse;
import veterinariaXYZ.mensaje.ResponseMessage;
import lombok.extern.slf4j.Slf4j; //NO FUNCIONA

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController

@RequestMapping("/api/auth/")
@CrossOrigin(origins = "*")


public class AuthController {
    // Credenciales fijas como se solicita
    private static final String FIXED_USERNAME = "admin";
    private static final String FIXED_PASSWORD = "admin123";

    private static final Logger log = LoggerFactory.getLogger(PacienteController.class);

    @PostMapping("/login")
    public ResponseEntity<ResponseMessage<LoginResponse>> login(@RequestBody LoginRequest request) {
        ResponseMessage<LoginResponse> message;

        try {
            if (FIXED_USERNAME.equals(request.getUsername()) &&
                    FIXED_PASSWORD.equals(request.getPassword())) {

                // Generar token simple (en producción usar JWT)
                String token = UUID.randomUUID().toString();

                LoginResponse response = new LoginResponse(token, request.getUsername(), true);
                message = new ResponseMessage<>(200, "Login exitoso", response);

                log.info("Login exitoso para usuario: {}", request.getUsername());
            } else {
                LoginResponse response = new LoginResponse(null, null, false);
                message = new ResponseMessage<>(401, "Credenciales inválidas", response);

                log.warn("Intento de login fallido para usuario: {}", request.getUsername());
            }
        } catch (Exception ex) {
            log.error("Error en login: ", ex);
            LoginResponse response = new LoginResponse(null, null, false);
            message = new ResponseMessage<>(500, "Error interno del servidor", response);
        }

        return ResponseEntity.ok(message);
    }

    @PostMapping("/validate")
    public ResponseEntity<ResponseMessage<Boolean>> validateToken(@RequestHeader(value = "Authorization", required = false) String token) {
        ResponseMessage<Boolean> message;

        try {
            // Validación simple del token (en producción validar JWT correctamente)
            boolean isValid = token != null && !token.trim().isEmpty() && !token.equals("null");

            if (isValid) {
                message = new ResponseMessage<>(200, "Token válido", true);
            } else {
                message = new ResponseMessage<>(401, "Token inválido", false);
            }
        } catch (Exception ex) {
            log.error("Error validando token: ", ex);
            message = new ResponseMessage<>(500, "Error interno del servidor", false);
        }

        return ResponseEntity.ok(message);
    }
}

