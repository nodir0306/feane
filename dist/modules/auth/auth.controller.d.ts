import { AuthService } from "./auth.service";
import { LoginResponse } from "./interfaces";
import { LoginDto } from "./dtos/login.dto";
export declare class AuthController {
    #private;
    constructor(service: AuthService);
    signin(payload: LoginDto): Promise<LoginResponse>;
}
