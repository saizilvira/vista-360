import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EstudiantesService {
  constructor(private readonly prisma: PrismaService) {}

  async getVista360(idOrDocument: string) {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      idOrDocument,
    );

    const student = await this.prisma.estudiante.findFirst({
      where: isUuid ? { id: idOrDocument } : { documento: idOrDocument },
    });

    if (!student) {
      throw new NotFoundException('Estudiante no encontrado');
    }

    const currentPeriod = await this.prisma.periodoAcademico.findFirst({
      where: { actual: true },
    });

    if (!currentPeriod) {
      throw new NotFoundException('No hay un periodo académico actual configurado');
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
}
