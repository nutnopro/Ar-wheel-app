import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { MinLength, Matches, IsDate, IsNotEmpty } from "class-validator";

export class ChangePasswordDto {
  @ApiProperty({ description: "The user's email address" })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Old password', example: 'oldPassword123' })
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({ description: 'New password', example: 'newPassword123' })
  @MinLength(8)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/, {
    message: 'Password must contain at least one letter and one number',
  })
  newPassword: string;

  // @ApiProperty({ description: 'Updated date', example: '2025-10-16' })
  // @Type(() => Date)
  // @IsDate()
  // updatedAt: Date = new Date();
}
