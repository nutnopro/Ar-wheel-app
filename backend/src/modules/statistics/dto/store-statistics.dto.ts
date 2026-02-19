import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class StoreStatisticsDto {
    @ApiProperty({ description: '', example: '' })
    totalModels: number;
    @ApiProperty({ description: '', example: '' })
    totalFollowers: number;
    @ApiProperty({ description: '', example: '' })
    totalViews: number;
    @ApiProperty({ description: '', example: '' })
    totalLikes: number;
    @ApiProperty({ description: '', example: '' })
    averageRating: number;
    @ApiProperty({ description: '', example: '' })
    @Type(() => Date)
    createdAt: Date;
    @ApiProperty({ description: '', example: '' })
    @Type(() => Date)
    updatedAt: Date;
}

export class StoreDailyStatisticsDto {
    @ApiProperty({ description: '', example: '' })
    @Type(() => Date)
    date: Date;
    @ApiProperty({ description: '', example: '' })
    views: number;
    @ApiProperty({ description: '', example: '' })
    likes: number;
}

export class CreateStoreStatisticsDto {
    @ApiProperty({ description: '', example: '' })
    totalModels: number;
    @ApiProperty({ description: '', example: '' })
    totalFollowers: number;
    @ApiProperty({ description: '', example: '' })
    totalViews: number;
    @ApiProperty({ description: '', example: '' })
    totalLikes: number;
    @ApiProperty({ description: '', example: '' })
    averageRating: number;
    @ApiProperty({ description: '', example: '' })
    @Type(() => Date)
    createdAt: Date;
    @ApiProperty({ description: '', example: '' })
    @Type(() => Date)
    updatedAt: Date;
}

export class CreateStoreDailyStatisticsDto {
    @ApiProperty({ description: '', example: '' })
    @Type(() => Date)
    date: Date;
    @ApiProperty({ description: '', example: '' })
    views: number;
    @ApiProperty({ description: '', example: '' })
    likes: number;
}

export class UpdateStoreStatisticsDto {
    @ApiProperty({ description: '', example: '' })
    totalModels: number;
    @ApiProperty({ description: '', example: '' })
    totalFollowers: number;
    @ApiProperty({ description: '', example: '' })
    totalViews: number;
    @ApiProperty({ description: '', example: '' })
    totalLikes: number;
    @ApiProperty({ description: '', example: '' })
    averageRating: number;
    @ApiProperty({ description: '', example: '' })
    @Type(() => Date)
    updatedAt: Date;
}

export class UpdateStoreDailyStatisticsDto {
    @ApiProperty({ description: '', example: '' })
    @Type(() => Date)
    date: Date;
    @ApiProperty({ description: '', example: '' })
    views: number;
    @ApiProperty({ description: '', example: '' })
    likes: number;
}
