import { Model } from 'sequelize-typescript';
import { Order, Review } from '@modules';
export declare enum UserRoles {
    user = "user",
    admin = "admin"
}
export declare class User extends Model {
    id: number;
    name: string;
    phone: string;
    role: UserRoles;
    email: string;
    image?: string;
    orders: Order[];
    reviews: Review[];
}
