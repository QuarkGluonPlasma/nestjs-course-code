import { ApiProperty } from "@nestjs/swagger";

export class CccVo {
    @ApiProperty({ name: 'aaa'})
    aaa: number;

    @ApiProperty({ name: 'bbb' })
    bbb: number;
}