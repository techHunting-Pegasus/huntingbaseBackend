import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';


import { UsersService } from './users.service';
import { LoginDto, RegisterDto } from '../dto/register.dto';
import { loginResponseDto, RegisterResponseDto } from '../ResponseDto/registerResponse';
import { AuthService } from '../Login/login.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly loginservice: AuthService
  ) { }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterDto): Promise<RegisterResponseDto> {
    return this.usersService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto): Promise<loginResponseDto> {

    return this.loginservice.login(dto)
  }
}
