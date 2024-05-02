import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Transform } from "class-transformer";

export class User {
    @ApiProperty()
    id: number;

    @ApiProperty()
    username: string;

    @ApiHideProperty()
    @Exclude()
    password: string;

    @ApiProperty()
    @Expose()
    get xxx(): string {
        return `${this.username} ${this.email}`;
    }

    @ApiProperty()
    @Transform(({value}) => '邮箱是：' + value)
    email: string;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}

