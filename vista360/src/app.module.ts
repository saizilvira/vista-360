import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { EstudiantesModule } from './estudiantes/estudiantes.module';

@Module({
  imports: [PrismaModule, EstudiantesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
