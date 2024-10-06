import { CreateUserRequest } from '../interfaces';
export declare class CreateUserDto implements Omit<CreateUserRequest, 'image'> {
    email: string;
    name: string;
    phone: string;
    image?: any;
}
