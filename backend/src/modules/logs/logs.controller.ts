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
import { LogsService } from './logs.service';
import {
    LogDetailsDto,
    CreateLogDto,
    LogDto,
} from './dto/logs.dto';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';


@Controller('logs')
export class LogsController {
    constructor(private readonly service: LogsService) { }

    @Post()
    @ApiOperation({ summary: 'Create new logs' })
    @ApiResponse({ status: 201, description: 'Logs created', type: LogDto })
    async create(@Body() body: CreateLogDto) {
        return await this.service.create(body);
    }

    @Get()
    @ApiOperation({ summary: 'Get all logs' })
    @ApiResponse({ status: 200, description: 'List of logs', type: [LogDto] })
    async findAll(@Param('limit') limit?: string) {
        const numLimit = limit ? parseInt(limit, 10) : 100;
        return await this.service.findAll(numLimit);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get logs by ID' })
    @ApiResponse({ status: 200, description: 'Logs found', type: LogDto })
    async findOne(@Param('id') lid: string) {
        return await this.service.findOne(lid);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update logs by ID' })
    @ApiResponse({ status: 200, description: 'Logs updated', type: LogDto })
    async update(@Param('id') lid: string, @Body() body: Partial<CreateLogDto>) {
        return await this.service.update(lid, body);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete logs by ID' })
    @ApiResponse({ status: 204, description: 'Logs deleted' })
    async remove(@Param('id') lid: string) {
        return await this.service.remove(lid);
    }
}
