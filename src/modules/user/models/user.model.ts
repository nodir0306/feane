import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { Order, Review } from '@modules'; // Ensure these are correctly imported

export enum UserRoles {
  user = 'user',
  admin = 'admin'
}

@Table({ tableName: 'users', timestamps: true })
export class User extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.TEXT, allowNull: false, unique: true })
  name: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  phone: string;

  @Column({
    type: DataType.ENUM(...Object.values(UserRoles)),
    allowNull: false,
    defaultValue: UserRoles.user
  })
  role: UserRoles;

  @Column({ type: DataType.TEXT, allowNull: false, unique: true }) 
  email: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  image?: string;

  @HasMany(() => Order)
  orders: Order[];

  @HasMany(() => Review)
  reviews: Review[];
}
