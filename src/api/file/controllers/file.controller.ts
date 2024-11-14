import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileService } from '../services/file.service';
import { FileReadDTO } from '../services/dtos/file-read.dto';
import { FileCreateDTO } from '../services/dtos/file-create.dto';
import { FileUpdateDTO } from '../services/dtos/file-update.dto';

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

  @Post()
  @ApiOperation({ summary: 'Create new file' })
  @ApiBody({ type: FileCreateDTO })
  @ApiResponse({
    status: 201,
    description: 'Successfully created new file',
    type: FileCreateDTO,
  })
  async addNewFile(@Body() fileCreateDTO: FileCreateDTO) {
    return await this.fileService.createNewFile(fileCreateDTO);
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
    return await this.fileService.updateFile(id, fileUpdateDTO);
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
