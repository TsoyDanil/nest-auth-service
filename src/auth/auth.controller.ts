import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from '../users/models/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post("/auth")
  async auth(@Body() userDto: UserDto){
    return await this.authService.auth(userDto)
  }

  @Post("/register")
  async register(@Body() userDto: UserDto){
    return await this.authService.register(userDto)
  }
}
