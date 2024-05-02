import { Exclude, Expose, Transform } from "class-transformer";

export class User {
    id: number;

    username: string;

    @Exclude()
    password: string;

    @Expose()
    get xxx(): string {
        return `${this.username} ${this.email}`;
    }

    @Transform(({value}) => '邮箱是：' + value)
    email: string;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}
