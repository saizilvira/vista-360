-- CreateTable
CREATE TABLE "estudiantes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "documento" TEXT NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "telefono" BIGINT
);

-- CreateTable
CREATE TABLE "materias" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "creditos" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "periodos_academicos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre_periodo" TEXT NOT NULL,
    "fecha_inicio" DATETIME NOT NULL,
    "fecha_fin" DATETIME NOT NULL,
    "actual" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "matriculas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "estudiante_id" TEXT NOT NULL,
    "materia_id" TEXT NOT NULL,
    "periodo_academico_id" TEXT NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'activa',
    "fecha_matricula" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "matriculas_estudiante_id_fkey" FOREIGN KEY ("estudiante_id") REFERENCES "estudiantes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "matriculas_materia_id_fkey" FOREIGN KEY ("materia_id") REFERENCES "materias" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "matriculas_periodo_academico_id_fkey" FOREIGN KEY ("periodo_academico_id") REFERENCES "periodos_academicos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "notas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "matricula_id" TEXT NOT NULL,
    "tipo_nota" TEXT NOT NULL,
    "puntaje" REAL NOT NULL,
    "fecha_nota" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "notas_matricula_id_fkey" FOREIGN KEY ("matricula_id") REFERENCES "matriculas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "estudiantes_documento_key" ON "estudiantes"("documento");

-- CreateIndex
CREATE UNIQUE INDEX "estudiantes_correo_key" ON "estudiantes"("correo");

-- CreateIndex
CREATE INDEX "matriculas_estudiante_id_idx" ON "matriculas"("estudiante_id");

-- CreateIndex
CREATE INDEX "matriculas_materia_id_idx" ON "matriculas"("materia_id");

-- CreateIndex
CREATE INDEX "matriculas_periodo_academico_id_idx" ON "matriculas"("periodo_academico_id");

-- CreateIndex
CREATE UNIQUE INDEX "matriculas_estudiante_id_materia_id_periodo_academico_id_key" ON "matriculas"("estudiante_id", "materia_id", "periodo_academico_id");

-- CreateIndex
CREATE INDEX "notas_matricula_id_idx" ON "notas"("matricula_id");
