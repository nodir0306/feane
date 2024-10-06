import { User } from "../user";
import { LoginRequest, LoginResponse } from "./interfaces";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private userModel;
    private config;
    private jwt;
    constructor(userModel: typeof User, config: ConfigService, jwt: JwtService);
    login(payload: LoginRequest): Promise<LoginResponse>;
    register(): Promise<void>;
    logout(): Promise<void>;
    refresh(): Promise<void>;
}
