import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { File } from '../entities/file.entity';

@Injectable()
export class FileRepository extends Repository<File> {
  constructor(private dataSource: DataSource) {
    super(File, dataSource.createEntityManager());
  }

  async findAllFiles() {
    try {
      const folders = await this.find({
        relations: {
          file_folders: true,
        },
        select: {
          id: true,
          name: true,
          path: true,
          size: true,
          type: true,
          created_at: true,
          file_folders: true,
        },
      });

      return folders;
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error.message);
    }
  }

  async findFileById(id: string): Promise<File> {
    try {
      const folder = await this.findOne({
        where: { id },
        relations: {
          file_folders: true,
        },
        select: {
          id: true,
          name: true,
          path: true,
          size: true,
          type: true,
          created_at: true,
          file_folders: true,
        },
      });

      if (!folder) {
        throw new NotFoundException('File not found');
      }

      return folder;
    } catch (error) {
      console.error(error);
      throw new NotFoundException(error.message);
    }
  }
}
