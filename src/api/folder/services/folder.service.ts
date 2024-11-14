import { HttpStatus, Injectable } from '@nestjs/common';
import { FolderRepository } from '../repositories/folder.repository';
import { FolderCreateDTO } from './dtos/folder-create.dto';
import { FolderUpdateDTO } from './dtos/folder-update.dto';

@Injectable()
export class FolderService {
  constructor(private readonly folderRepo: FolderRepository) {}

  async getAllFolders() {
    const folders = await this.folderRepo.findAllFolders();

    return {
      status: HttpStatus.OK,
      message: 'Successfully get data folders',
      data: folders,
    };
  }

  async getFolderById(id: string) {
    const folders = await this.folderRepo.findFolderById(id);

    return {
      status: HttpStatus.OK,
      message: 'Successfully get data folders',
      data: folders,
    };
  }

  async createNewFolder(folderDto: FolderCreateDTO) {
    const { name } = folderDto;

    const newFolder = this.folderRepo.create({
      name,
    });

    await this.folderRepo.save(newFolder);
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
