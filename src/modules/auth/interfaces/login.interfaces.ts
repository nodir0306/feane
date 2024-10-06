export declare interface LoginRequest {
    email: string;
    phone: string;
}

export declare interface LoginResponse {
    accesToken: string;
    refreshToken: string;
    message: string;
}