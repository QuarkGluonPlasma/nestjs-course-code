import { IsNotEmpty } from "class-validator";

export class FriendAddDto {

    @IsNotEmpty({
        message: "添加好友的 username 不能为空"
    })
    username: string;

    reason: string;    
}
