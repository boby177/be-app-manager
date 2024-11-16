import { HttpStatus, Injectable } from '@nestjs/common';
import { FileRepository } from '../repositories/file.repository';
import { FileCreateDTO } from './dtos/file-create.dto';
import { FileUpdateDTO } from './dtos/file-update.dto';
import { FolderRepository } from 'src/api/folder/repositories/folder.repository';
import { FileFolderRepository } from 'src/api/file-folder/repositories/file.repository';

@Injectable()
export class FileService {
  constructor(
    private readonly fileRepo: FileRepository,
    private readonly folderRepo: FolderRepository,
    private readonly fileFolderRepo: FileFolderRepository,
  ) {}

  async getAllFiles() {
    const files = await this.fileRepo.findAllFiles();

    return {
      status: HttpStatus.OK,
      message: 'Successfully get data files',
      data: files,
    };
  }

  async getFileById(id: string) {
    const file = await this.fileRepo.findFileById(id);

    return {
      status: HttpStatus.OK,
      message: `Successfully deleted data file ${file.name}`,
      data: file,
    };
  }

  async uploadFile(
    file: Express.Multer.File,
    fileDto: FileCreateDTO,
    idFolder: string,
  ) {
    const { filename, path: filePath, size, mimetype } = file;

    const newFile = this.fileRepo.create({
      name: fileDto.name,
      original_name: filename,
      path: filePath,
      type: mimetype,
      size,
    });

    await this.fileRepo.save(newFile);

    // Get data folder if not null
    if (idFolder !== null) {
      // Check data folder
      const folder = await this.folderRepo.findFolderById(idFolder);

      // Save relation into file folder
      const fileFolder = this.fileFolderRepo.create({
        files: newFile,
        folders: folder,
      });

      await this.fileFolderRepo.save(fileFolder);
    }

    return {
      status: HttpStatus.OK,
      message: 'File uploaded successfully',
      data: newFile,
    };
  }

  async updateFile(id: string, fileDto: FileUpdateDTO) {
    const { name } = fileDto;

    const file = await this.fileRepo.findFileById(id);
    await this.fileRepo.update(file.id, {
      name,
    });

    const updatedFile = await this.fileRepo.findFileById(file.id);
    return {
      status: HttpStatus.OK,
      message: 'Successfully updated data file',
      data: updatedFile,
    };
  }

  async deleteFile(id: string) {
    const file = await this.fileRepo.findFileById(id);
    await this.fileRepo.delete(file.id);

    return {
      status: HttpStatus.OK,
      message: `Successfully deleted data file ${file.name}`,
    };
  }
}
