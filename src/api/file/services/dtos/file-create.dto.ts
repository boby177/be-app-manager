import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FileCreateDTO {
  @IsNotEmpty()
  @ApiProperty({
    description: 'File',
    type: 'string',
    format: 'binary',
  })
  file: Express.Multer.File;
}
