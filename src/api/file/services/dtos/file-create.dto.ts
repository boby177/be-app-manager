import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FileCreateDTO {
  @ApiProperty()
  @AutoMap()
  @IsNotEmpty()
  name: string;

  // TODO: Save data on uploading some file
}
