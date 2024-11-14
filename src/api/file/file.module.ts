import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { FileController } from './controllers/file.controller';
import { FileRepository } from './repositories/file.repository';
import { FileService } from './services/file.service';

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  controllers: [FileController],
  providers: [FileRepository, FileService],
})
export class FileModule {}
