import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class LoginUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Length(6)
    code: string;
}