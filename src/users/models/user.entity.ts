import { Column, Model, Table, DataType } from 'sequelize-typescript';
import { UserDto } from './user.dto';


@Table
export class User extends Model<User, UserDto> {

  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number

  @Column({type: DataType.STRING, allowNull: false})
  name: string;

  @Column({type: DataType.STRING, unique: true, allowNull: false})
  email: string

  @Column({type: DataType.STRING, allowNull: false})
  password: string;
}