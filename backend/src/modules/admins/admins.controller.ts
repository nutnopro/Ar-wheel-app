// src/modules/admins/admins.controller.ts
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
    InternalServerErrorException,
    UseGuards,
  } from '@nestjs/common';
  import { AdminsService } from './admins.service';
  import { CreateAdminDto, UpdateAdminDto, AdminDto } from './dto/admins.dto';
  import { ApiResponse, ApiOperation } from '@nestjs/swagger';
  import { FirebaseAuthGuard } from 'src/auth/firebase-auth.guard';
  import { RolesGuard } from 'src/auth/roles.guard';
  import { Roles } from 'src/auth/roles.decorator';
  
  // ✅ ป้องกันทั้งหมดด้วย token + role = admin
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles('admin')
  @Controller('admins')
  export class AdminsController {
    constructor(private readonly service: AdminsService) {}
  
    @Post()
    @ApiOperation({ summary: 'สร้างแอดมินใหม่' })
    @ApiResponse({ status: 201, description: 'สร้างแอดมินสำเร็จ', type: AdminDto })
    async create(@Body() body: CreateAdminDto) {
      try {
        const admin = await this.service.create(body);
        return admin;
      } catch (error) {
        throw new InternalServerErrorException(error.message);
      }
    }
  
    @Get()
    @ApiOperation({ summary: 'ดึงข้อมูลแอดมินทั้งหมด' })
    @ApiResponse({ status: 200, description: 'รายการแอดมินทั้งหมด', type: [AdminDto] })
    async findAll() {
      try {
        return await this.service.findAll();
      } catch (error) {
        throw new InternalServerErrorException(error.message);
      }
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'ดึงข้อมูลแอดมินตาม ID' })
    @ApiResponse({ status: 200, description: 'พบข้อมูลแอดมิน', type: AdminDto })
    async findOne(@Param('id') id: string) {
      try {
        return await this.service.findOne(id);
      } catch (error) {
        throw new InternalServerErrorException(error.message);
      }
    }
  
    @Patch(':id')
    @ApiOperation({ summary: 'อัพเดทข้อมูลแอดมินตาม ID' })
    @ApiResponse({ status: 200, description: 'อัพเดทแอดมินสำเร็จ', type: AdminDto })
    async update(@Param('id') id: string, @Body() body: UpdateAdminDto) {
      try {
        return await this.service.update(id, body);
      } catch (error) {
        throw new InternalServerErrorException(error.message);
      }
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'ลบแอดมินตาม ID' })
    @ApiResponse({ status: 204, description: 'ลบแอดมินสำเร็จ' })
    async remove(@Param('id') id: string) {
      try {
        await this.service.remove(id);
      } catch (error) {
        throw new InternalServerErrorException(error.message);
      }
    }
  }