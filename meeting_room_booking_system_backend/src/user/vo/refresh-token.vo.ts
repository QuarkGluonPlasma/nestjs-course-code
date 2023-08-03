import { ApiProperty } from "@nestjs/swagger";

export class RefreshTokenVo {
    @ApiProperty()
    access_token: string;

    @ApiProperty()
    refresh_token: string;
}