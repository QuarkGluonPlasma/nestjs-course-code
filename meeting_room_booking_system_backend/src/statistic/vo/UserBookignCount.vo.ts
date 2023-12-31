import { ApiProperty } from "@nestjs/swagger";

export class UserBookignCount {

    @ApiProperty()
    userId: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    bookingCount: string;
}
