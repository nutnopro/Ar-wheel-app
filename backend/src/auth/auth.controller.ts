import { Controller, Post, Body, Query } from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.dto';
import { forgotPasswordDto } from './dto/forgot-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('Auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register' })
  async register(@Body() body: RegisterUserDto) {
    return await this.authservice.register(body);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 201, description: 'login', type: LoginDto })
  async create(@Body() body: LoginDto) {
    return await this.authservice.login(body);
  }

  @Post('Forgotpassword-auth')
  @ApiOperation({ summary: 'Forgotpassword' })
  async forgotpassword(@Body() forgotPasswordDto: forgotPasswordDto) {
    return this.authservice.forgotPassword(forgotPasswordDto.Email);
  }

  @Post('Changepassword')
  @ApiOperation({ summary: 'Changepassword' })
  async Changepassword(@Body() changepassword: ChangePasswordDto) {
    console.log('Changepassword DTO received in controller:', changepassword);
    return this.authservice.Changepassword(changepassword);
  }
}
