import { HttpStatus, Injectable } from '@nestjs/common';
import { FileRepository } from '../repositories/file.repository';
import { FileCreateDTO } from './dtos/file-create.dto';
import { FileUpdateDTO } from './dtos/file-update.dto';

@Injectable()
export class FileService {
  constructor(private readonly fileRepo: FileRepository) {}

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

  async createNewFile(fileDto: FileCreateDTO) {
    const { name } = fileDto;

    const newFile = this.fileRepo.create({
      name,
    });

    await this.fileRepo.save(newFile);
    return {
      status: HttpStatus.CREATED,
      message: 'Successfully created new data file',
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
