import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { ModelsService } from './models.service';
import {
    ModelDimensionsDto,
    ModelFileUrlsDto,
    ModelDto,
} from './dto/models.dto';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';


@Controller('models')
export class ModelsController {
    constructor(private readonly service: ModelsService) {}

    @Post()
    @ApiOperation({ summary: 'Create new models' })
    @ApiResponse({ status: 201, description: 'Models created', type: ModelDto })
    async create(@Body() body: ModelDimensionsDto) {
        return await this.service.create(body);
    }

    @Get()
    @ApiOperation({ summary: 'Get all models' })
    @ApiResponse({ status: 200, description: 'List of models', type: [ModelDto] })
    async findAll() {
        return await this.service.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get models by ID' })
    @ApiResponse({ status: 200, description: 'Models found', type: ModelDto })
    async findOne(@Param('id') mid: string) {
        return await this.service.findOne(mid);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update models by ID' })
    @ApiResponse({ status: 200, description: 'Models updated', type: ModelDto })
    async update(@Param('id') mid: string, @Body() body: ModelFileUrlsDto) {
        return await this.service.update(mid, body);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete models by ID' })
    @ApiResponse({ status: 204, description: 'Models deleted' })
    async remove(@Param('id') mid: string) {
        return await this.service.remove(mid);
    }
}
