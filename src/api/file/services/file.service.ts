import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
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

  async uploadFile(file: Express.Multer.File, fileDto: FileCreateDTO) {
    const { filename, path: filePath, size, mimetype } = file;

    const newFile = this.fileRepo.create({
      name: fileDto.name,
      original_name: filename,
      path: filePath,
      type: mimetype,
      size,
    });

    await this.fileRepo.save(newFile);
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
