import { IsNotEmpty, IsString } from 'class-validator';

export class messageDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
