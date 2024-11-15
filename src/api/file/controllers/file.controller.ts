import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileService } from '../services/file.service';
import { FileReadDTO } from '../services/dtos/file-read.dto';
import { FileCreateDTO } from '../services/dtos/file-create.dto';
import { FileUpdateDTO } from '../services/dtos/file-update.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Controller('file')
@ApiTags('web - File')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get()
  @ApiOperation({ summary: 'Get all files' })
  @ApiResponse({
    status: 200,
    description: 'Successfully get data file',
    type: FileReadDTO,
  })
  async findAll() {
    return await this.fileService.getAllFiles();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get file by id' })
  @ApiResponse({
    status: 200,
    description: 'Successfully get data file',
    type: FileReadDTO,
  })
  async findOne(@Param('id') id: string) {
    return await this.fileService.getFileById(id);
  }

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload data file' })
  @ApiBody({ type: FileCreateDTO })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './file-uploads',
        filename: (req, file, cb) => {
          const filename = `${uuidv4()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  )
  @ApiResponse({
    status: 200,
    description: 'File uploaded successfully',
  })
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() fileDto: FileCreateDTO,
  ) {
    return await this.fileService.uploadFile(file, fileDto);
  }

  @Post()
  @ApiOperation({ summary: 'Create new file' })
  @ApiBody({ type: FileCreateDTO })
  @ApiResponse({
    status: 201,
    description: 'Successfully created new file',
    type: FileCreateDTO,
  })
  async addNewFile(@Body() fileCreateDTO: FileCreateDTO) {
    // return await this.fileService.createNewFile(fileCreateDTO);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update data file' })
  @ApiBody({ type: FileUpdateDTO })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated data file',
    type: FileUpdateDTO,
  })
  async updateFile(
    @Param('id') id: string,
    @Body() fileUpdateDTO: FileUpdateDTO,
  ) {
    // return await this.fileService.updateFile(id, fileUpdateDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete data file' })
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted file',
  })
  async deleteFile(@Param('id') id: string) {
    return await this.fileService.deleteFile(id);
  }
}
