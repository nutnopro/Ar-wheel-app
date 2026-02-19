import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ModelDto } from "src/modules/models/dto/models.dto";

export class GeneralTagDto {
    @ApiProperty({ description: '', example: '' })
    name: string;
    @ApiProperty({ description: '', example: '' })
    description: string;
}

export class FullTagDto {
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

export class CreateTagDto {
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
export class UpdateTagDto {
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

