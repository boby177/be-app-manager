import { HttpStatus, Injectable } from '@nestjs/common';
import { FolderRepository } from '../repositories/folder.repository';
import { FolderCreateDTO } from './dtos/folder-create.dto';
import { FolderUpdateDTO } from './dtos/folder-update.dto';
import { PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class FolderService {
  constructor(private readonly folderRepo: FolderRepository) {}

  async getAllFolders(query: PaginateQuery) {
    const folders = await this.folderRepo.findAllFolders(query);

    return {
      status: HttpStatus.OK,
      message: 'Successfully get data folders',
      data: folders,
    };
  }

  async getFolderById(id: string, query: PaginateQuery) {
    const folders = await this.folderRepo.findFolderByIdPaginated(id, query);

    // Mapping data folder files
    const files = [];
    for (const data of folders.data[0].folder_files) {
      const file = {
        id: data.files.id,
        name: data.files.name,
        original_name: data.files.original_name,
        path: data.files.path,
        type: data.files.type,
        size: data.files.size,
        created_at: data.files.created_at,
      };

      files.push(file);
    }

    const response = {
      id: folders.data[0].id,
      name: folders.data[0].name,
      created_at: folders.data[0].created_at,
      sub_folder: folders.data[0].sub_folder,
      folder_files: files,
    };

    return {
      status: HttpStatus.OK,
      message: 'Successfully get data folders',
      data: response,
    };
  }

  async createNewFolder(folderDto: FolderCreateDTO) {
    const { name, id_folder } = folderDto;

    const newFolder = this.folderRepo.create({
      name,
    });

    await this.folderRepo.save(newFolder);

    // Check if data id folder is not null
    if (id_folder !== null) {
      const relationFolder = await this.folderRepo.findFolderById(id_folder);

      // Get all data sub folders
      const subFolder = [];
      for (const folder of relationFolder.sub_folder) {
        subFolder.push(folder);
      }

      // Save data old sub folder and new folder
      subFolder.push(newFolder);
      relationFolder.sub_folder = subFolder;

      await this.folderRepo.save(relationFolder);
    }

    return {
      status: HttpStatus.CREATED,
      message: 'Successfully created new data folder',
      data: newFolder,
    };
  }

  async updateFolder(id: string, folderDto: FolderUpdateDTO) {
    const { name } = folderDto;

    const folder = await this.folderRepo.findFolderById(id);
    await this.folderRepo.update(folder.id, {
      name,
    });

    const updatedFolder = await this.folderRepo.findFolderById(folder.id);
    return {
      status: HttpStatus.OK,
      message: 'Successfully updated data folder',
      data: updatedFolder,
    };
  }

  async deleteFolder(id: string) {
    const folder = await this.folderRepo.findFolderById(id);
    await this.folderRepo.delete(folder.id);

    return {
      status: HttpStatus.OK,
      message: `Successfully deleted data folder ${folder.name}`,
    };
  }
}
