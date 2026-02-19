import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString, IsOptional, IsNumber, IsEnum, IsBoolean } from "class-validator";

export enum UserRole {
    VISITOR = 'visitor',
    USER = 'user',
    STORE = 'store',
    ADMIN = 'admin',
}

export class WheelDto {
    @ApiProperty({ description: 'รุ่นของล้อแม็กซ์', example: 'RS-X' })
    @IsString()
    @IsNotEmpty()
    model: string;

    @ApiProperty({ description: 'ขนาดของล้อแม็กซ์ (นิ้ว)', example: 18 })
    @IsNumber()
    @IsNotEmpty()
    size: number;

    @ApiProperty({ description: 'สีของล้อแม็กซ์', example: 'ดำด้าน' })
    @IsString()
    @IsNotEmpty()
    color: string;
}

export class StoreDto {
    @ApiProperty({ description: 'ชื่อร้านค้า', example: 'ร้านอะไหล่รถยนต์' })
    storeName: string;

    @ApiProperty({ description: 'รหัสผ่านร้านค้า', example: 'password1234' })
    password: string;

    @ApiProperty({ description: 'อีเมลร้านค้า', example: 'store@example.com' })
    email: string;

    @ApiProperty({ description: 'เบอร์โทรของร้าน', example: '+66812345678' })
    phoneNumber: string;

    @ApiProperty({ description: 'ที่อยู่ของร้าน', example: '123 ถนนสุขุมวิท กรุงเทพฯ 10110' })
    address: string;

    @ApiProperty({ description: 'รายการสินค้าล้อแม็กซ์', type: [WheelDto], required: false })
    wheels?: WheelDto[];

    @ApiProperty({ description: 'Role ของร้าน', enum: UserRole, example: UserRole.STORE })
    @IsEnum(UserRole)
    role: UserRole = UserRole.STORE;

    @ApiProperty({ description: 'สถานะร้าน active?', example: true })
    @IsBoolean()
    isActive: boolean = true;
}

export class CreateStoreDto {
    @ApiProperty({ description: 'ชื่อร้านค้า', example: 'ร้านอะไหล่รถยนต์' })
    @IsString()
    @IsNotEmpty()
    storeName: string;

    @ApiProperty({ description: 'รหัสผ่านร้านค้า', example: 'password1234' })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({ description: 'อีเมลร้านค้า', example: 'store@example.com' })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: 'เบอร์โทรของร้าน', example: '+66812345678' })
    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @ApiProperty({ description: 'ที่อยู่ของร้าน', example: '123 ถนนสุขุมวิท กรุงเทพฯ 10110' })
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty({ description: 'วันที่สร้าง', example: '2025-12-30' })
    @Type(() => Date)
    @IsDate()
    createdAt: Date;

    @ApiProperty({ description: 'วันที่เข้าสู่ระบบล่าสุด', example: '2025-12-30' })
    @Type(() => Date)
    @IsDate()
    lastLoginAt: Date;

    @ApiProperty({ description: 'รายการสินค้าล้อแม็กซ์', type: [WheelDto], required: false })
    @IsOptional()
    wheels?: WheelDto[];

    @ApiProperty({ description: 'Role ของร้าน', enum: UserRole, example: UserRole.STORE })
    @IsEnum(UserRole)
    role: UserRole = UserRole.STORE;

    @ApiProperty({ description: 'สถานะร้าน active?', example: true })
    @IsBoolean()
    isActive: boolean = true;
}

export class UpdateStoreDto {
    @ApiProperty({ description: 'ชื่อร้านค้า', example: 'ร้านอะไหล่รถยนต์', required: false })
    @IsOptional()
    @IsString()
    storeName?: string;

    @ApiProperty({ description: 'รหัสผ่านร้านค้า', example: 'newpassword1234', required: false })
    @IsOptional()
    @IsString()
    password?: string;

    @ApiProperty({ description: 'อีเมลร้านค้า', example: 'newstore@example.com', required: false })
    @IsOptional()
    @IsString()
    email?: string;

    @ApiProperty({ description: 'เบอร์โทรของร้าน', example: '+66812345679', required: false })
    @IsOptional()
    @IsString()
    phoneNumber?: string;

    @ApiProperty({ description: 'ที่อยู่ของร้าน', example: '456 ถนนพหลโยธิน กรุงเทพฯ 10400', required: false })
    @IsOptional()
    @IsString()
    address?: string;

    @ApiProperty({ description: 'รายการสินค้าล้อแม็กซ์', type: [WheelDto], required: false })
    @IsOptional()
    wheels?: WheelDto[];

    @ApiProperty({ description: 'Role ของร้าน', enum: UserRole, example: UserRole.STORE, required: false })
    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;

    @ApiProperty({ description: 'สถานะร้าน active?', example: true, required: false })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
