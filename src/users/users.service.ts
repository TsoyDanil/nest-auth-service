import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.entity';
import { UserDto } from './models/user.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User) private readonly userRepository: typeof User
  ) {}

  async createUser(userDto: UserDto): Promise<User> {
    return await this.userRepository.create(userDto)
  }

  async getUserById(id: string): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } })
  }
}
