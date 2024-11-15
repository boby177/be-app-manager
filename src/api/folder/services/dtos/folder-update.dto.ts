import { PartialType } from '@nestjs/swagger';
import { FolderCreateDTO } from './folder-create.dto';

export class FolderUpdateDTO extends PartialType(FolderCreateDTO) {}
