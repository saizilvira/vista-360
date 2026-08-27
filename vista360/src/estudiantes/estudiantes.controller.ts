import { Controller, Get, Param } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';

@Controller('estudiantes')
export class EstudiantesController {
  constructor(private readonly estudiantesService: EstudiantesService) {}

  @Get(':id/materias-y-notas')
  getVista360(@Param('id') id: string) {
    return this.estudiantesService.getVista360(id);
  }
}
