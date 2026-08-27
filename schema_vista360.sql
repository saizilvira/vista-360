-- =========================================================
-- Vista 360° del Estudiante - Esquema de base de datos
-- PostgreSQL
-- =========================================================

-- Extensión necesaria para generar UUIDs con gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- =========================================================
-- Tabla: estudiantes
-- =========================================================
CREATE TABLE estudiantes (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    documento   VARCHAR(30)  NOT NULL UNIQUE,
    nombres     VARCHAR(100) NOT NULL,
    apellidos   VARCHAR(100) NOT NULL,
    correo      VARCHAR(150) NOT NULL UNIQUE,
    telefono    BIGINT
);

-- =========================================================
-- Tabla: materias
-- =========================================================
CREATE TABLE materias (
    id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre   VARCHAR(150) NOT NULL,
    creditos INT NOT NULL CHECK (creditos > 0)
);

-- =========================================================
-- Tabla: periodos_academicos
-- =========================================================
CREATE TABLE periodos_academicos (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre_periodo  VARCHAR(50) NOT NULL,
    fecha_inicio    DATE NOT NULL,
    fecha_fin       DATE NOT NULL,
    actual          BOOLEAN NOT NULL DEFAULT FALSE,
    CHECK (fecha_fin >= fecha_inicio)
);

-- =========================================================
-- Tabla: matriculas
-- =========================================================
CREATE TABLE matriculas (
    id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    estudiante_id         UUID NOT NULL REFERENCES estudiantes(id),
    materia_id            UUID NOT NULL REFERENCES materias(id),
    periodo_academico_id  UUID NOT NULL REFERENCES periodos_academicos(id),
    estado                VARCHAR(20) NOT NULL DEFAULT 'activa'
                           CHECK (estado IN ('activa', 'retirada', 'finalizada', 'cancelada')),
    fecha_matricula       TIMESTAMP NOT NULL DEFAULT now(),
    -- Un estudiante no puede matricular la misma materia dos veces en el mismo periodo
    CONSTRAINT uq_matricula_unica UNIQUE (estudiante_id, materia_id, periodo_academico_id)
);

-- =========================================================
-- Tabla: notas
-- =========================================================
CREATE TABLE notas (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    matricula_id   UUID NOT NULL REFERENCES matriculas(id),
    tipo_nota      VARCHAR(50) NOT NULL,
    puntaje        DECIMAL(4,2) NOT NULL CHECK (puntaje >= 0),
    fecha_nota     DATE NOT NULL DEFAULT CURRENT_DATE
);

-- =========================================================
-- Índices para optimizar las consultas del servicio
-- (estudiante -> materias matriculadas y notas)
-- =========================================================
CREATE INDEX idx_matriculas_estudiante ON matriculas(estudiante_id);
CREATE INDEX idx_matriculas_materia ON matriculas(materia_id);
CREATE INDEX idx_matriculas_periodo ON matriculas(periodo_academico_id);
CREATE INDEX idx_notas_matricula ON notas(matricula_id);
