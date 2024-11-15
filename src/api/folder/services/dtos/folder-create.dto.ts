import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class FolderCreateDTO {
  @ApiProperty()
  @AutoMap()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  id_folder: string;
}
