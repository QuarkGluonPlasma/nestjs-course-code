import { IsNotEmpty, MinLength } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class CreateUserDto {
    @IsNotEmpty({
        message: "validate.usernameNotEmpty"
    })
    username: string;
    
    @IsNotEmpty({
        message: 'validate.passwordNotEmpty'
    })
    @MinLength(6, {
        message: i18nValidationMessage("validate.passwordNotLessThan6", {
            num: 88
        })
    })
    password: string;                    
}
