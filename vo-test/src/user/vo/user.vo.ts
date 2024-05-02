export class UserVo {
    id: number;

    username: string;

    email: string;

    constructor(partial: Partial<UserVo>) {
        Object.assign(this, partial);
    }
}
