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
import { FolderService } from '../services/folder.service';
import { FolderReadDTO } from '../services/dtos/folder-read.dto';
import { FolderCreateDTO } from '../services/dtos/folder-create.dto';
import { FolderUpdateDTO } from '../services/dtos/folder-update.dto';
import { Paginate, PaginatedSwaggerDocs, PaginateQuery } from 'nestjs-paginate';

@Controller('folder')
@ApiTags('web - Folder')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Get()
  @ApiOperation({ summary: 'Get all folders' })
  @ApiResponse({
    status: 200,
    description: 'Successfully get data folder',
    type: FolderReadDTO,
  })
  @PaginatedSwaggerDocs(FolderReadDTO, {
    sortableColumns: ['name', 'created_at'],
    searchableColumns: ['name', 'created_at'],
    maxLimit: 9999999,
  })
  async findAll(@Paginate() query: PaginateQuery) {
    return await this.folderService.getAllFolders(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get folder by id' })
  @ApiResponse({
    status: 200,
    description: 'Successfully get data folder',
    type: FolderReadDTO,
  })
  @PaginatedSwaggerDocs(FolderReadDTO, {
    sortableColumns: ['name', 'created_at'],
    searchableColumns: ['name', 'created_at'],
    maxLimit: 9999999,
  })
  async findOne(@Param('id') id: string, @Paginate() query: PaginateQuery) {
    return await this.folderService.getFolderById(id, query);
  }

  @Post()
  @ApiOperation({ summary: 'Create new folder' })
  @ApiBody({ type: FolderCreateDTO })
  @ApiResponse({
    status: 201,
    description: 'Successfully created new folder',
    type: FolderCreateDTO,
  })
  async addNewFolder(@Body() folderCreateDTO: FolderCreateDTO) {
    return await this.folderService.createNewFolder(folderCreateDTO);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update data folder' })
  @ApiBody({ type: FolderUpdateDTO })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated data folder',
    type: FolderUpdateDTO,
  })
  async updateFolder(
    @Param('id') id: string,
    @Body() folderUpdateDTO: FolderUpdateDTO,
  ) {
    return await this.folderService.updateFolder(id, folderUpdateDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete data folder' })
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted folder',
  })
  async deleteItem(@Param('id') id: string) {
    return await this.folderService.deleteFolder(id);
  }
}
