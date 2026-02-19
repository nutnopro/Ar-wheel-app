import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEmail, IsOptional, MinLength, IsPhoneNumber, IsEnum, IsBoolean } from "class-validator";
import { Type } from "class-transformer";

// ===================== ENUM Role =====================
export enum UserRole {
  VISITOR = 'visitor',
  USER = 'user',
  STORE = 'store',
  ADMIN = 'admin',
}

// ===================== Address DTO =====================
export class AddressDto {
  @ApiProperty({ example: '123 Main St' })
  @IsOptional()
  @IsString()
  street?: string;

  @ApiProperty({ example: 'Bangkok' })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ example: '10110' })
  @IsOptional()
  @IsString()
  postalCode?: string;

  @ApiProperty({ example: 'Thailand' })
  @IsOptional()
  @IsString()
  country?: string;
}

// ===================== Response DTO =====================
export class ResponseUserDto {
  @ApiProperty({ example: 'john_doe' })
  username?: string;

  @ApiProperty({ example: 'john@gmail.com' })
  email?: string;

  @ApiProperty({ example: '+66812345678' })
  phoneNumber?: string;

  @ApiProperty({ example: 'John' })
  firstName?: string;

  @ApiProperty({ example: 'Doe' })
  lastName?: string;

  @ApiProperty({ example: 'https://example.com/profile.jpg' })
  profileImageUrl?: string;

  @ApiProperty({ type: () => AddressDto })
  address?: AddressDto;

  @ApiProperty({ enum: UserRole })
  role?: UserRole;

  @ApiProperty({ example: true })
  isActive?: boolean;
}

// ===================== Create DTO =====================
export class CreateUserDto {
  @ApiProperty({ example: 'john_doe' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'password1234' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'john@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+66812345678' })
  @IsOptional()
  @IsPhoneNumber('TH')
  phoneNumber?: string;

  @ApiProperty({ enum: UserRole, example: UserRole.USER })
  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole = UserRole.USER;

  @ApiProperty({ type: () => AddressDto, required: false })
  @IsOptional()
  @Type(() => AddressDto)
  address?: AddressDto;
}

// ===================== Update DTO =====================
export class UpdateUserDto {
  @ApiProperty({ example: 'john_new@gmail.com', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: '+66898765432', required: false })
  @IsOptional()
  @IsPhoneNumber('TH')
  phoneNumber?: string;

  @ApiProperty({ example: 'John', required: false })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ example: 'Doe', required: false })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ example: 'https://example.com/new.jpg', required: false })
  @IsOptional()
  @IsString()
  profileImageUrl?: string;

  @ApiProperty({ type: () => AddressDto, required: false })
  @IsOptional()
  @Type(() => AddressDto)
  address?: AddressDto;

  @ApiProperty({ enum: UserRole, required: false })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  isBanned?: boolean;
}

// ===================== Update Role DTO =====================
export class UpdateUserRoleDto {
  @ApiProperty({
    enum: UserRole,
    example: UserRole.ADMIN,
    description: 'New role for the user'
  })
  @IsNotEmpty()
  @IsEnum(UserRole, { message: 'Role must be one of: visitor, user, store, admin' })
  role: UserRole;
}
