import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class AdminStatisticsDto {
    @ApiProperty({ description: '', example: '' })
    totalUsers: number;
    @ApiProperty({ description: '', example: '' })
    totalStores: number;
    @ApiProperty({ description: '', example: '' })
    totalModels: number;
    @ApiProperty({ description: '', example: '' })
    totalCategories: number;
    @ApiProperty({ description: '', example: '' })
    totalTags: number;
    @ApiProperty({ description: '', example: '' })
    activeUsers: number;
    @ApiProperty({ description: '', example: '' })
    bannedUsers: number;
    @ApiProperty({ description: '', example: '' })
    countriesCount: number;
    @ApiProperty({ description: '', example: '' })
    devicesCount: number;
    @ApiProperty({ description: '', example: '' })
    platformsCount: number;
    @ApiProperty({ description: '', example: '' })
    @Type(() => Date)
    createdAt: Date;
    @ApiProperty({ description: '', example: '' })
    @Type(() => Date)
    updateAt: Date;
}

export class AdminDailyStatisticsDto {
    @ApiProperty({ description: '', example: '' })
    @Type(() => Date)
    date: Date;
    @ApiProperty({ description: '', example: '' })
    newUsers: number;
    @ApiProperty({ description: '', example: '' })
    newStores: number;
    @ApiProperty({ description: '', example: '' })
    newModels: number;
    @ApiProperty({ description: '', example: '' })
    countriesPerDay: Record<string, number>;
    @ApiProperty({ description: '', example: '' })
    devicesPerday: Record<string, number>;
    @ApiProperty({ description: '', example: '' })
    platformsPerDay: Record<string, number>;
}

export class CreateAdminStatisticsDto {
    @ApiProperty({ description: '', example: '' })
    totalUsers: number;
    @ApiProperty({ description: '', example: '' })
    totalStores: number;
    @ApiProperty({ description: '', example: '' })
    totalModels: number;
    @ApiProperty({ description: '', example: '' })
    totalCategories: number;
    @ApiProperty({ description: '', example: '' })
    totalTags: number;
    @ApiProperty({ description: '', example: '' })
    activeUsers: number;
    @ApiProperty({ description: '', example: '' })
    bannedUsers: number;
    @ApiProperty({ description: '', example: '' })
    countriesCount: number;
    @ApiProperty({ description: '', example: '' })
    devicesCount: number;
    @ApiProperty({ description: '', example: '' })
    platformsCount: number;
    @ApiProperty({ description: '', example: '' })
    @Type(() => Date)
    createdAt: Date;
    @ApiProperty({ description: '', example: '' })
    @Type(() => Date)
    updateAt: Date;
}

export class CreateAdminDailyStatisticsDto {
    @ApiProperty({ description: '', example: '' })
    @Type(() => Date)
    date: Date;
    @ApiProperty({ description: '', example: '' })
    newUsers: number;
    @ApiProperty({ description: '', example: '' })
    newStores: number;
    @ApiProperty({ description: '', example: '' })
    newModels: number;
    @ApiProperty({ description: '', example: '' })
    countriesPerDay: Record<string, number>;
    @ApiProperty({ description: '', example: '' })
    devicesPerday: Record<string, number>;
    @ApiProperty({ description: '', example: '' })
    platformsPerDay: Record<string, number>;
}

export class UpdateAdminStatisticsDto {
    @ApiProperty({ description: '', example: '' })
    totalUsers: number;
    @ApiProperty({ description: '', example: '' })
    totalStores: number;
    @ApiProperty({ description: '', example: '' })
    totalModels: number;
    @ApiProperty({ description: '', example: '' })
    totalCategories: number;
    @ApiProperty({ description: '', example: '' })
    totalTags: number;
    @ApiProperty({ description: '', example: '' })
    activeUsers: number;
    @ApiProperty({ description: '', example: '' })
    bannedUsers: number;
    @ApiProperty({ description: '', example: '' })
    countriesCount: number;
    @ApiProperty({ description: '', example: '' })
    devicesCount: number;
    @ApiProperty({ description: '', example: '' })
    platformsCount: number;
    @ApiProperty({ description: '', example: '' })
    @Type(() => Date)
    updateAt: Date;
}

export class UpdateAdminDailyStatisticsDto {
    @ApiProperty({ description: '', example: '' })
    @Type(() => Date)
    date: Date;
    @ApiProperty({ description: '', example: '' })
    newUsers: number;
    @ApiProperty({ description: '', example: '' })
    newStores: number;
    @ApiProperty({ description: '', example: '' })
    newModels: number;
    @ApiProperty({ description: '', example: '' })
    countriesPerDay: Record<string, number>;
    @ApiProperty({ description: '', example: '' })
    devicesPerday: Record<string, number>;
    @ApiProperty({ description: '', example: '' })
    platformsPerDay: Record<string, number>;
}
