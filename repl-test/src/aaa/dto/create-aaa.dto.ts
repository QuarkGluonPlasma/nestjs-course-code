import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateAaaDto {
    @IsNotEmpty()
    aaa: string;

    @IsEmail()
    bbb: string;
}
