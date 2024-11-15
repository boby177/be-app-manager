import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { FileFolder } from 'src/api/file-folder/entities/file-folder.entity';
import { BaseEntity } from 'src/common/base/base.entity';

export class FileReadDTO extends BaseEntity {
  @ApiProperty()
  @AutoMap()
  id: string;

  @ApiProperty()
  @AutoMap()
  name: string;

  @ApiProperty()
  @AutoMap()
  original_name: string;

  @ApiProperty()
  @AutoMap()
  path: string;

  @ApiProperty()
  @AutoMap()
  type: string;

  @ApiProperty()
  @AutoMap()
  size: string;

  @ApiProperty()
  @AutoMap()
  file_folders: FileFolder[];
}
