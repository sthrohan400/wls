import { Module } from '@nestjs/common';
import { LotteryController } from './lottery.controller';
import { LotteryService } from './dao/lottery.service';
import { LotteryWinnerService } from './dao/lottery-winner.service';
import { LotteryWinnerTaskService } from './tasks/lottery-winner.task';

@Module({
  imports: [],
  controllers: [LotteryController],
  providers: [LotteryService, LotteryWinnerService, LotteryWinnerTaskService],
})
export class LotteryModule {}
