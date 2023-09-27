import { Controller, Request, Post, Body, UseGuards, Get } from '@nestjs/common';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UsersService } from './users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';

@Controller()
export class AppController {
  constructor(
      private readonly usersService: UsersService,
      private authService: AuthService
  ) {}

  @Get()
  hello() {
    return 'Hello World!';
  }

  @Post('auth/register')
  register(@Body() data: CreateUserDto) {
    return this.usersService.register(data);
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}