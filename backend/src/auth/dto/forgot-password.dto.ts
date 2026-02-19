import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class forgotPasswordDto {
  @ApiProperty({ description: "The user's email address" })
  @IsNotEmpty()
  Email: string;
}