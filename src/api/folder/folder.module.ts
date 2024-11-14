import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FolderRepository } from './repositories/folder.repository';
import { FolderService } from './services/folder.service';
import { FolderController } from './controllers/folder.controller';
import { Folder } from './entities/folder.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Folder])],
  controllers: [FolderController],
  providers: [FolderRepository, FolderService],
})
export class FolderModule {}
