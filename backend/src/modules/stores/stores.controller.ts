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
import { StoresService } from './stores.service';
import { CreateStoreDto, UpdateStoreDto, StoreDto, WheelDto } from './dto/stores.dto';
import { ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Stores')
@Controller('stores')
export class StoresController {
    constructor(private readonly storesService: StoresService) {}

    @Post()
    @ApiOperation({ summary: 'สร้างร้านค้าใหม่' })
    @ApiResponse({ 
        status: 201, 
        description: 'สร้างร้านค้าสำเร็จ', 
        type: StoreDto 
    })
    @ApiResponse({ 
        status: 400, 
        description: 'ข้อมูลไม่ถูกต้อง' 
    })
    async create(@Body() createStoreDto: CreateStoreDto) {
        return await this.storesService.create(createStoreDto);
    }

    @Get()
    @ApiOperation({ summary: 'ดึงข้อมูลร้านค้าทั้งหมด' })
    @ApiResponse({ 
        status: 200, 
        description: 'รายการร้านค้าทั้งหมด', 
        type: [StoreDto] 
    })
    async findAll() {
        return await this.storesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'ดึงข้อมูลร้านค้าตาม ID' })
    @ApiResponse({ 
        status: 200, 
        description: 'พบข้อมูลร้านค้า', 
        type: StoreDto 
    })
    @ApiResponse({ 
        status: 404, 
        description: 'ไม่พบร้านค้า' 
    })
    async findOne(@Param('id') storeId: string) {
        return await this.storesService.findOne(storeId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'อัพเดทข้อมูลร้านค้าตาม ID' })
    @ApiResponse({ 
        status: 200, 
        description: 'อัพเดทร้านค้าสำเร็จ', 
        type: StoreDto 
    })
    @ApiResponse({ 
        status: 404, 
        description: 'ไม่พบร้านค้า' 
    })
    @ApiResponse({ 
        status: 400, 
        description: 'ข้อมูลไม่ถูกต้อง' 
    })
    async update(@Param('id') storeId: string, @Body() updateStoreDto: UpdateStoreDto) {
        return await this.storesService.update(storeId, updateStoreDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'ลบร้านค้าตาม ID' })
    @ApiResponse({ 
        status: 204, 
        description: 'ลบร้านค้าสำเร็จ' 
    })
    @ApiResponse({ 
        status: 404, 
        description: 'ไม่พบร้านค้า' 
    })
    async remove(@Param('id') storeId: string) {
        return await this.storesService.remove(storeId);
    }
}
