import { IsEmail, IsNotEmpty } from "class-validator";

export class UpdateUserDto {

    headPic: string;

    nickName: string;
    
    @IsNotEmpty({
        message: '邮箱不能为空'
    })
    @IsEmail({}, {
        message: '不是合法的邮箱格式'
    })
    email: string;
    
    @IsNotEmpty({
        message: '验证码不能为空'
    })
    captcha: string;
}