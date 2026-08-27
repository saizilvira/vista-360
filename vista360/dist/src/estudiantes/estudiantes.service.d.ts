import { PrismaService } from '../prisma/prisma.service';
export declare class EstudiantesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getVista360(idOrDocument: string): Promise<{
        estudiante: {
            id: string;
            documento: string;
            nombres: string;
            apellidos: string;
            correo: string;
        };
        periodoActual: string;
        materias: {
            materiaId: string;
            nombre: string;
            creditos: number;
            estadoMatricula: string;
            notas: {
                tipoNota: string;
                puntaje: number;
                fecha: string;
            }[];
        }[];
    }>;
}
