import { IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator";
import { LoginRequest } from "../interfaces";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto implements LoginRequest{

    @ApiProperty({
        type: "string",
        required: true,
        example: "john_doe@example.com"
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty ({
        type: "string",
        required: true,
        example: "+998991210416",
        maxLength: 13,
        minLength: 13,
    })

    @IsPhoneNumber("UZ")
    @IsNotEmpty()
    phone: string;



}