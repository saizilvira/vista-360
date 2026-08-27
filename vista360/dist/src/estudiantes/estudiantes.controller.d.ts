import { EstudiantesService } from './estudiantes.service';
export declare class EstudiantesController {
    private readonly estudiantesService;
    constructor(estudiantesService: EstudiantesService);
    getVista360(id: string): Promise<{
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
