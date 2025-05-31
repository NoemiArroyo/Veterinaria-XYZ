CREATE TABLE IF NOT EXISTS paciente (
    id VARCHAR(36) PRIMARY KEY,
    nombre_paciente VARCHAR(100) NOT NULL,
    especie VARCHAR(50),
    raza VARCHAR(50),
    fecha_nacimiento DATE,
    tipo_identificacion_dueno VARCHAR(20),
    identificacion_dueno VARCHAR(20) NOT NULL,
    nombre_dueno VARCHAR(100) NOT NULL,
    ciudad VARCHAR(50),
    direccion VARCHAR(200),
    telefono VARCHAR(20),
    fecha_registro DATE
);
