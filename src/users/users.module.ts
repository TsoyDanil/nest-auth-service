import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule
  ],
  exports: [UsersService]
})
export class UsersModule {}
