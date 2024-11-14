import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FolderCreateDTO {
  @ApiProperty()
  @AutoMap()
  @IsNotEmpty()
  name: string;
}
