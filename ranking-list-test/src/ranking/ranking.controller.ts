import { Controller, Get, Inject, Query } from '@nestjs/common';
import { RankingService } from './ranking.service';

@Controller('ranking')
export class RankingController {

    @Inject(RankingService)
    rankingService: RankingService;

    @Get('join')
    async join(@Query('name') name: string) {
        await this.rankingService.join(name);
        return 'success';
    }

    @Get('learn')
    async addLearnTime(@Query('name') name:string, @Query('time') time: string) {
        await this.rankingService.addLearnTime(name, parseFloat(time));
        return 'success';
    }

    @Get('monthRanking')
    async getMonthRanking() {
        return this.rankingService.getMonthRanking();
    }

    @Get('yearRanking')
    async getYearRanking() {
        return this.rankingService.getYearRanking();
    }   
}
