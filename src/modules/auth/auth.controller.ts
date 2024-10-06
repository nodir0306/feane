import { Body, Controller } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginResponse } from "./interfaces";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { LoginDto } from "./dtos/login.dto";


@ApiTags('Auth')
@Controller('auth')
export class AuthController{
    #_service: AuthService
    constructor(service: AuthService){
        this.#_service = service
    }


    @ApiConsumes("Auth Login")
    async signin(@Body() payload: LoginDto): Promise<LoginResponse>{
        return await this.#_service.login(payload)
    }
}