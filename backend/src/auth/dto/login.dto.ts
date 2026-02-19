import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';
export class LoginDto {
  @ApiProperty({ description: "The user's email address" })
  @IsNotEmpty()
  usernameOrEmail: string;
  
  @ApiProperty({ description: "The user's password" })
  @IsNotEmpty()
  @Length(6, 50)
  password: string;
}