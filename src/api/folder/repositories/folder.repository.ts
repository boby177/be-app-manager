import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Folder } from '../entities/folder.entity';

@Injectable()
export class FolderRepository extends Repository<Folder> {
  constructor(private dataSource: DataSource) {
    super(Folder, dataSource.createEntityManager());
  }

  async findAllFolders() {
    try {
      const folders = await this.find({
        relations: {
          folder_files: {
            files: true,
          },
          sub_folder: true,
        },
        select: {
          id: true,
          name: true,
          created_at: true,
          folder_files: {
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
          },
        },
      });

      return folders;
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error.message);
    }
  }

  async findFolderById(id: string): Promise<Folder> {
    try {
      const folder = await this.findOne({
        where: { id },
        relations: {
          folder_files: {
            files: true,
          },
          sub_folder: true,
        },
        select: {
          id: true,
          name: true,
          created_at: true,
          folder_files: {
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
          },
        },
      });

      if (!folder) {
        throw new NotFoundException('Folder not found');
      }

      return folder;
    } catch (error) {
      console.error(error);
      throw new NotFoundException(error.message);
    }
  }
}
