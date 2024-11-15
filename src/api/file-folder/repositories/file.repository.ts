import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { FileFolder } from '../entities/file-folder.entity';

@Injectable()
export class FileFolderRepository extends Repository<FileFolder> {
  constructor(private dataSource: DataSource) {
    super(FileFolder, dataSource.createEntityManager());
  }

  async findAllFiles() {
    try {
      const fileFolders = await this.find({
        relations: {
          files: true,
          folders: true,
        },
        select: {
          id: true,
          files: {
            id: true,
            name: true,
            original_name: true,
            path: true,
            size: true,
            type: true,
            created_at: true,
          },
          folders: {
            id: true,
            name: true,
            created_at: true,
          },
          created_at: true,
        },
      });

      return fileFolders;
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error.message);
    }
  }

  async findFileById(id: string): Promise<FileFolder> {
    try {
      const fileFolders = await this.findOne({
        where: { id },
        relations: {
          files: true,
          folders: true,
        },
        select: {
          id: true,
          files: {
            id: true,
            name: true,
            original_name: true,
            path: true,
            size: true,
            type: true,
            created_at: true,
          },
          folders: {
            id: true,
            name: true,
            created_at: true,
          },
          created_at: true,
        },
      });

      if (!fileFolders) {
        throw new NotFoundException('File folder not found');
      }

      return fileFolders;
    } catch (error) {
      console.error(error);
      throw new NotFoundException(error.message);
    }
  }
}
