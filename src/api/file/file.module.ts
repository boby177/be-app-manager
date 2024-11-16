import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { FileController } from './controllers/file.controller';
import { FileRepository } from './repositories/file.repository';
import { FileService } from './services/file.service';
import { FolderRepository } from '../folder/repositories/folder.repository';
import { FileFolderRepository } from '../file-folder/repositories/file.repository';

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  controllers: [FileController],
  providers: [
    FileRepository,
    FileService,
    FolderRepository,
    FileFolderRepository,
  ],
})
export class FileModule {}
