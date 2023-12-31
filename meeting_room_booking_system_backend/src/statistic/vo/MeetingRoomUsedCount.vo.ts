import { ApiProperty } from "@nestjs/swagger";

export class MeetingRoomUsedCount {

    @ApiProperty()
    meetingRoomId: string;

    @ApiProperty()
    meetingRoomName: string;

    @ApiProperty()
    usedCount: string;
}
