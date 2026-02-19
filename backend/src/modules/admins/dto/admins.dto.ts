import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsEmail, IsEnum } from "class-validator";

export enum AdminRole {
    SUPERADMIN = "superadmin",
    ADMIN = "admin",
    MODERATOR = "moderator",
}

// ✅ สิทธิ์การจัดการของ admin
export class AdminPermissionsDto {
    @ApiProperty({ description: 'สามารถจัดการผู้ใช้ (สร้าง, อัพเดท, ลบ)', example: true, required: false })
    @IsOptional()
    @IsBoolean()
    canManageUsers?: boolean;

    @ApiProperty({ description: 'สามารถจัดการร้านค้า (อนุมัติ, ปรับปรุง, ลบ)', example: true, required: false })
    @IsOptional()
    @IsBoolean()
    canManageStores?: boolean;

    @ApiProperty({ description: 'สามารถจัดการสินค้าล้อแม็กซ์ (เพิ่ม, ลบ, อัพเดท)', example: true, required: false })
    @IsOptional()
    @IsBoolean()
    canManageProducts?: boolean;

    @ApiProperty({ description: 'สามารถจัดการหมวดหมู่สินค้า', example: true, required: false })
    @IsOptional()
    @IsBoolean()
    canManageCategories?: boolean;

    @ApiProperty({ description: 'สามารถจัดการแท็กสินค้า', example: false, required: false })
    @IsOptional()
    @IsBoolean()
    canManageTags?: boolean;

    @ApiProperty({ description: 'สามารถดูประวัติการใช้งาน/Logs', example: true, required: false })
    @IsOptional()
    @IsBoolean()
    canViewLogs?: boolean;

    @ApiProperty({ description: 'สามารถจัดการสิทธิ์ของ admin คนอื่น', example: false, required: false })
    @IsOptional()
    @IsBoolean()
    canManageAdmins?: boolean;
}

// ✅ DTO สำหรับ response (ไม่ส่ง password)
export class AdminDto {
    @ApiProperty({ description: 'รหัสประจำตัว admin', example: 'a123' })
    id: string;

    @ApiProperty({ description: 'ชื่อผู้ใช้ของ admin', example: 'admin01' })
    username: string;

    @ApiProperty({ description: 'อีเมลของ admin', example: 'admin01@example.com' })
    email: string;

    @ApiProperty({ description: 'สิทธิ์ของ admin', enum: AdminRole, example: AdminRole.ADMIN })
    adminRole: AdminRole;

    @ApiProperty({ description: 'สิทธิ์การจัดการ (permissions)', required: false })
    @Type(() => AdminPermissionsDto)
    @IsOptional()
    adminPermissions?: AdminPermissionsDto;

    @ApiProperty({ description: 'วันที่สร้าง admin' })
    @Type(() => Date)
    createdAt: Date;

    @ApiProperty({ description: 'วันที่อัพเดทล่าสุด', required: false })
    @Type(() => Date)
    updatedAt?: Date;

    @ApiProperty({ description: 'วันที่เข้าสู่ระบบล่าสุด', required: false })
    @Type(() => Date)
    lastLoginAt?: Date;

    @ApiProperty({ description: 'วันที่เข้าชมระบบล่าสุด', required: false })
    @Type(() => Date)
    lastVisitAt?: Date;
}

// ✅ DTO สำหรับสร้าง admin (รับ password แต่ไม่ return)
export class CreateAdminDto {
    @ApiProperty({ description: 'ชื่อผู้ใช้', example: 'admin01' })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({ description: 'รหัสผ่าน', example: 'password1234' })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({ description: 'อีเมล', example: 'admin01@example.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: 'สิทธิ์ของ admin', enum: AdminRole, example: AdminRole.ADMIN })
    @IsEnum(AdminRole)
    @IsNotEmpty()
    adminRole: AdminRole;

    @ApiProperty({ description: 'สิทธิ์การจัดการ (permissions)', required: false })
    @Type(() => AdminPermissionsDto)
    @IsOptional()
    adminPermissions?: AdminPermissionsDto;
}

// ✅ DTO สำหรับอัพเดท admin
export class UpdateAdminDto {
    @ApiProperty({ description: 'ชื่อผู้ใช้', example: 'admin01', required: false })
    @IsOptional()
    @IsString()
    username?: string;

    @ApiProperty({ description: 'อีเมล', example: 'admin01@example.com', required: false })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty({ description: 'สิทธิ์ของ admin', enum: AdminRole, required: false })
    @IsOptional()
    @IsEnum(AdminRole)
    adminRole?: AdminRole;

    @ApiProperty({ description: 'สิทธิ์การจัดการ (permissions)', required: false })
    @Type(() => AdminPermissionsDto)
    @IsOptional()
    adminPermissions?: AdminPermissionsDto;

    @ApiProperty({ description: 'รหัสผ่านใหม่ (ถ้าต้องการเปลี่ยน)', example: 'newpassword123', required: false })
    @IsOptional()
    @IsString()
    password?: string;
}
