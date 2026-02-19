import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class GeneralCategoryDto {
    @ApiProperty({ description: '', example: '' })
    name: string;
    @ApiProperty({ description: '', example: '' })
    description: string;
}

export class FullCategoryDto {
    @ApiProperty({ description: '', example: '' })
    name: string;
    @ApiProperty({ description: '', example: '' })
    description: string;
    @ApiProperty({ description: '', example: '' })
    modelCount: number;
    @ApiProperty({ description: '', example: '' })
    @Type(() => Date)
    createdAt: Date;
    @ApiProperty({ description: '', example: '' })
    @Type(() => Date)
    updatedAt: Date;
}

export class CreateCategoryDto {
    @ApiProperty({ description: '', example: '' })
    name: string;
    @ApiProperty({ description: '', example: '' })
    description: string;
    @ApiProperty({ description: '', example: '' })
    modelCount: number;
    @ApiProperty({ description: '', example: '' })
    @Type(() => Date)
    createdAt: Date;
    @ApiProperty({ description: '', example: '' })
    @Type(() => Date)
    updatedAt: Date;
}
export class UpdateCategoryDto {
    @ApiProperty({ description: '', example: '' })
    name: string;
    @ApiProperty({ description: '', example: '' })
    description: string;
    @ApiProperty({ description: '', example: '' })
    modelCount: number;
    @ApiProperty({ description: '', example: '' })
    @Type(() => Date)
    updatedAt: Date;
}
