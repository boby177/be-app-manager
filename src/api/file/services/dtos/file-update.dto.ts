import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FileUpdateDTO {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
