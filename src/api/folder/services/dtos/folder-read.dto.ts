import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { FileFolder } from 'src/api/file-folder/entities/file-folder.entity';
import { BaseEntity } from 'src/common/base/base.entity';

export class FolderReadDTO extends BaseEntity {
  @ApiProperty()
  @AutoMap()
  id: string;

  @ApiProperty()
  @AutoMap()
  name: string;

  @ApiProperty()
  @AutoMap()
  folder_files: FileFolder[];
}
