import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Folder } from '../entities/folder.entity';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class FolderRepository extends Repository<Folder> {
  constructor(private dataSource: DataSource) {
    super(Folder, dataSource.createEntityManager());
  }

  async findAllFolders(query: PaginateQuery): Promise<Paginated<Folder>> {
    try {
      const folders = await paginate(query, this, {
        sortableColumns: ['name', 'created_at'],
        searchableColumns: ['name', 'created_at'],
        maxLimit: 9999999,
        relations: {
          folder_files: {
            files: true,
          },
          sub_folder: true,
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

  async findFolderByIdPaginated(
    id: string,
    query: PaginateQuery,
  ): Promise<Paginated<Folder>> {
    try {
      const folder = await paginate(query, this, {
        where: {
          id,
        },
        sortableColumns: ['name', 'created_at'],
        searchableColumns: ['name', 'created_at'],
        maxLimit: 9999999,
        relations: {
          folder_files: {
            files: true,
          },
          sub_folder: true,
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
