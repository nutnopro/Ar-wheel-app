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
import { UsersService } from './users.service';
import {
    CreateUserDto,
    UpdateUserDto,
    UpdateUserRoleDto,
    ResponseUserDto,
} from './dto/users.dto';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
    constructor(private readonly service: UsersService) { }

    @Post()
    @ApiOperation({ summary: 'สร้างผู้ใช้ใหม่' })
    @ApiResponse({ status: 201, description: 'สร้างผู้ใช้สำเร็จ', type: ResponseUserDto })
    async create(@Body() body: CreateUserDto) {
        return await this.service.create(body);
    }

    @Get()
    @ApiOperation({ summary: 'ดึงข้อมูลผู้ใช้ทั้งหมด' })
    @ApiResponse({ status: 200, description: 'รายการผู้ใช้ทั้งหมด', type: [ResponseUserDto] })
    async findAll() {
        return await this.service.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'ดึงข้อมูลผู้ใช้ตาม ID' })
    @ApiResponse({ status: 200, description: 'พบข้อมูลผู้ใช้', type: ResponseUserDto })
    async findOne(@Param('id') uid: string) {
        return await this.service.findOne(uid);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'อัพเดทข้อมูลผู้ใช้ตาม ID' })
    @ApiResponse({ status: 200, description: 'อัพเดทผู้ใช้สำเร็จ', type: ResponseUserDto })
    async update(@Param('id') uid: string, @Body() body: UpdateUserDto) {
        return await this.service.update(uid, body);
    }

    @Patch(':id/role')
    @ApiOperation({ summary: 'เปลี่ยน Role ของผู้ใช้ (สำหรับ Admin)' })
    @ApiResponse({ status: 200, description: 'เปลี่ยน Role สำเร็จ', type: ResponseUserDto })
    async updateUserRole(@Param('id') uid: string, @Body() body: UpdateUserRoleDto) {
        return await this.service.updateUserRole(uid, body.role);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'ลบผู้ใช้ตาม ID' })
    @ApiResponse({ status: 204, description: 'ลบผู้ใช้สำเร็จ' })
    async remove(@Param('id') uid: string) {
        return await this.service.remove(uid);
    }
}
