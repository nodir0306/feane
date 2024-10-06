import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "../user";
import { LoginRequest, LoginResponse } from "./interfaces";
import { InjectModel } from "@nestjs/sequelize";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(@InjectModel(User) private userModel: typeof User, private config: ConfigService, private jwt: JwtService){}

    async login(payload: LoginRequest): Promise<LoginResponse>{
        const foundedUser = await this.userModel.findOne({
            where: {email: payload.email, phone: payload.phone}
        });

        if(!foundedUser){
            throw new NotFoundException("User not found")
        }

        const accesToken = await this.jwt.signAsync({
            id: foundedUser.id,
            role: foundedUser.role,
        },{
            expiresIn: this.config.get<number>('jwt.accessKey'),
            secret: this.config.get<string>('jwt.accessTime')
        });

        const refreshToken = await this.jwt.signAsync({
            id: foundedUser.id,
            role: foundedUser.role,
        },{
            expiresIn: this.config.get<string>('jwt.refreshTime'),
            secret: this.config.get<string>('jwt.refreshKey')
        });

        return {
            accesToken: accesToken,
            refreshToken: refreshToken,
            message: "ok"
        }



    }

    async register(){}


    async logout(){}


    async refresh(){}
}