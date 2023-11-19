import { Controller, Get, Inject, Query } from '@nestjs/common';
import { StatisticService } from './statistic.service';

@Controller('statistic')
export class StatisticController {

    @Inject(StatisticService)
    private statisticService: StatisticService;

    @Get('userBookingCount')
    async userBookignCount(@Query('startTime') startTime: string, @Query('endTime') endTime) {
        return this.statisticService.userBookingCount(startTime, endTime);
    }

    @Get('meetingRoomUsedCount')
    async meetingRoomUsedCount(@Query('startTime') startTime: string, @Query('endTime') endTime) {
        return this.statisticService.meetingRoomUsedCount(startTime, endTime);
    }
}
