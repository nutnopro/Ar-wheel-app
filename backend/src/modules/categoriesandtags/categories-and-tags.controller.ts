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
import { CategoriesandtagsService } from './categories-and-tags.service';
import {
    CreateCategoryDto,
    UpdateCategoryDto,
   FullCategoryDto,
} from './dto/categories.dto';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';


@Controller('categoriesandtags')
export class CategoriesandtagsController {
    constructor(private readonly service: CategoriesandtagsService) {}

    @Post()
    @ApiOperation({ summary: 'Create new categories' })
    @ApiResponse({ status: 201, description: 'Categories created', type: FullCategoryDto })
    async create(@Body() body: CreateCategoryDto) {
        return await this.service.create(body);
    }

    @Get()
    @ApiOperation({ summary: 'Get all categories' })
    @ApiResponse({ status: 200, description: 'List of categories', type: [FullCategoryDto] })
    async findAll() {
        return await this.service.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get categories by ID' })
    @ApiResponse({ status: 200, description: 'Categories found', type: FullCategoryDto })
    async findOne(@Param('id') cid: string) {
        return await this.service.findOne(cid);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update categories by ID' })
    @ApiResponse({ status: 200, description: 'Categories updated', type: FullCategoryDto })
    async update(@Param('id') cid: string, @Body() body: UpdateCategoryDto) {
        return await this.service.update(cid, body);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete categories by ID' })
    @ApiResponse({ status: 204, description: 'categories deleted' })
    async remove(@Param('id') cid: string) {
        return await this.service.remove(cid);
    }
}
