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
import { StatisticsService } from './statistics.service';
import {
    CreateStoreStatisticsDto,
    UpdateStoreStatisticsDto,
    StoreStatisticsDto,
} from './dto/store-statistics.dto';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';


@Controller('statistics')
export class StatisticsController {
    constructor(private readonly service: StatisticsService) {}

    @Post()
    @ApiOperation({ summary: 'Create new store statistics' })
    @ApiResponse({ status: 201, description: 'Store statistics created', type: StoreStatisticsDto })
    async create(@Body() body: CreateStoreStatisticsDto) {
        return await this.service.create(body);
    }

    @Get()
    @ApiOperation({ summary: 'Get all store statistics' })
    @ApiResponse({ status: 200, description: 'List of store statistics', type: [StoreStatisticsDto] })
    async findAll() {
        return await this.service.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get store statistics by ID' })
    @ApiResponse({ status: 200, description: 'Store statistics found', type: StoreStatisticsDto })
    async findOne(@Param('id') sid: string) {
        return await this.service.findOne(sid);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update store statistics by ID' })
    @ApiResponse({ status: 200, description: 'Store statistics updated', type: StoreStatisticsDto })
    async update(@Param('id') sid: string, @Body() body: UpdateStoreStatisticsDto) {
        return await this.service.update(sid, body);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete store statistics by ID' })
    @ApiResponse({ status: 204, description: 'Store statistics deleted' })
    async remove(@Param('id') sid: string) {
        return await this.service.remove(sid);
    }
}
