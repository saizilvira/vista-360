"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstudiantesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let EstudiantesService = class EstudiantesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getVista360(idOrDocument) {
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrDocument);
        const student = await this.prisma.estudiante.findFirst({
            where: isUuid ? { id: idOrDocument } : { documento: idOrDocument },
        });
        if (!student) {
            throw new common_1.NotFoundException('Estudiante no encontrado');
        }
        const currentPeriod = await this.prisma.periodoAcademico.findFirst({
            where: { actual: true },
        });
        if (!currentPeriod) {
            throw new common_1.NotFoundException('No hay un periodo académico actual configurado');
        }
        const matriculas = await this.prisma.matricula.findMany({
            where: {
                estudiante_id: student.id,
                periodo_academico_id: currentPeriod.id,
            },
            include: {
                materia: true,
                notas: true,
            },
        });
        return {
            estudiante: {
                id: student.id,
                documento: student.documento,
                nombres: student.nombres,
                apellidos: student.apellidos,
                correo: student.correo,
            },
            periodoActual: currentPeriod.nombre_periodo,
            materias: matriculas.map((m) => ({
                materiaId: m.materia.id,
                nombre: m.materia.nombre,
                creditos: m.materia.creditos,
                estadoMatricula: m.estado,
                notas: m.notas.map((n) => ({
                    tipoNota: n.tipo_nota,
                    puntaje: n.puntaje,
                    fecha: n.fecha_nota.toISOString().split('T')[0],
                })),
            })),
        };
    }
};
exports.EstudiantesService = EstudiantesService;
exports.EstudiantesService = EstudiantesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EstudiantesService);
//# sourceMappingURL=estudiantes.service.js.map