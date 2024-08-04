
import { Body, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDto } from '../users/models/user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcryptjs"
import { User } from '../users/models/user.entity';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async auth(userDto: UserDto){
    const user = await this.validateUser(userDto)

    return this.generateToken(user)
  }

  async register(userDto: UserDto){
    const candidate = await this.userService.getUserByEmail(userDto.email)
    if (candidate) throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)

    const hashPassword = await bcrypt.hash(userDto.password, 5)
    const user = await this.userService.createUser({ ...userDto, password: hashPassword})
    return this.generateToken(user)
  }

  async generateToken(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
      name: user.name
    }

    return {
      token: this.jwtService.sign(payload)
    }
  }

  async validateUser(userDto: UserDto){
      const user = await this.userService.getUserByEmail(userDto.email)
      const passwordValid = bcrypt.compare(userDto.password, user.password)
      if (user && passwordValid) return user
      
    throw new UnauthorizedException({ messaage: "Invalid password" })
  }
}
