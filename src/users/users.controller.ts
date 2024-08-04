import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserDto } from './models/user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwtAuthGuard';

@Controller('users')
export class UsersController {

  constructor(
    private usersService: UsersService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('get-user/:id')
  async getUser(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Post("/add-user")
  async createUser(@Body() userDto: UserDto) {
    return await this.usersService.createUser(userDto)
  }
}
