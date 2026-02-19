import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsArray, IsOptional, IsNumber } from "class-validator";

export class ModelDimensionsDto {
  @ApiProperty({ description: 'Width of the 3D model in cm', example: 10 })
  @IsNumber()
  width: number;

  @ApiProperty({ description: 'Height of the 3D model in cm', example: 20 })
  @IsNumber()
  height: number;

  @ApiProperty({ description: 'Depth of the 3D model in cm', example: 15 })
  @IsNumber()
  depth: number;
}

export class ModelFileUrlsDto {
  @ApiProperty({ description: 'GLB file URL', example: 'https://example.com/model.glb' })
  @IsOptional()
  @IsString()
  glb?: string;

  @ApiProperty({ description: 'OBJ file URL', example: 'https://example.com/model.obj' })
  @IsOptional()
  @IsString()
  obj?: string;

  @ApiProperty({ description: 'USDZ file URL', example: 'https://example.com/model.usdz' })
  @IsOptional()
  @IsString()
  usdz?: string;
}

export class ModelDto {
  @ApiProperty({ description: 'Owner ID of the model', example: 'user_12345' })
  @IsString()
  @IsNotEmpty()
  ownerId: string;

  @ApiProperty({ description: 'Model name', example: 'Car Wheel 3D Model' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Model description', example: 'High quality 3D car wheel model' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Categories of the model', example: ['car', 'wheel'] })
  @IsArray()
  categories: string[];

  @ApiProperty({ description: 'Tags for searching', example: ['3D', 'vehicle', 'rim'] })
  @IsArray()
  tags: string[];

  @ApiProperty({ description: 'Dimensions of the model (cm)', type: ModelDimensionsDto })
  @Type(() => ModelDimensionsDto)
  dimensions: ModelDimensionsDto;

  @ApiProperty({ description: 'File URLs of the model', type: ModelFileUrlsDto })
  @Type(() => ModelFileUrlsDto)
  fileUrls: ModelFileUrlsDto;
}
