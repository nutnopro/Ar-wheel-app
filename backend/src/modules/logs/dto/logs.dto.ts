import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class LogDetailsDto {
    @ApiProperty({ description: '', example: '' })
    platform: string;
    @ApiProperty({ description: '', example: '' })
    deviceName: string;
    @ApiProperty({ description: '', example: '' })
    appVersion: string;
    @ApiProperty({ description: '', example: '' })
    networkType: string;
    @ApiProperty({ description: '', example: '' })
    result: string;
    @ApiProperty({ description: '', example: '' })
    message: string;
}

export class CreateLogDto {
    @ApiProperty({ description: '', example: '' })
    userId: string;
    @ApiProperty({ description: '', example: '' })
    role: string;
    @ApiProperty({ description: '', example: '' })
    action: string;
    @ApiProperty({ description: '', example: '' })
    targetId: string;
    @ApiProperty({ description: '', example: '' })
    @Type(() => LogDetailsDto)
    details: LogDetailsDto;
    @ApiProperty({ description: '', example: '' })
    @Type(() => Date)
    createdAt: Date;
}

export class LogDto {
    @ApiProperty({ description: '', example: '' })
    logId: string;
    @ApiProperty({ description: '', example: '' })
    @Type(() => CreateLogDto)
    logDetail: CreateLogDto;
}
