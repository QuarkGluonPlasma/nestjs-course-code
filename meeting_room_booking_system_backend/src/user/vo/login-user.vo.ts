interface UserInfo {
    id: number;

    username: string;

    nickName: string;

    email: string;

    headPic: string;

    phoneNumber: string;

    isFrozen: boolean;

    isAdmin: boolean;

    createTime: number;

    roles: string[];

    permissions: string[]
}
export class LoginUserVo {

    userInfo: UserInfo;

    accessToken: string;

    refreshToken: string;
}
