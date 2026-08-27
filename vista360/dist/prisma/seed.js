"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const estudiante = await prisma.estudiante.create({
        data: {
            documento: '1000000000',
            nombres: 'Juan',
            apellidos: 'Pérez',
            correo: 'juan@example.com',
            telefono: 3001234567n,
        },
    });
    const materia = await prisma.materia.create({
        data: {
            nombre: 'Matemáticas Discretas',
            creditos: 3,
        },
    });
    const periodo = await prisma.periodoAcademico.create({
        data: {
            nombre_periodo: '2024-1',
            fecha_inicio: new Date('2024-02-01T00:00:00.000Z'),
            fecha_fin: new Date('2024-06-15T00:00:00.000Z'),
            actual: true,
        },
    });
    const matricula = await prisma.matricula.create({
        data: {
            estudiante_id: estudiante.id,
            materia_id: materia.id,
            periodo_academico_id: periodo.id,
            estado: 'activa',
        },
    });
    await prisma.nota.create({
        data: {
            matricula_id: matricula.id,
            tipo_nota: 'Parcial 1',
            puntaje: 4.5,
            fecha_nota: new Date('2024-03-10T00:00:00.000Z'),
        },
    });
    console.log('Base de datos poblada con éxito. ID del estudiante:', estudiante.id);
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map