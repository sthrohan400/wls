import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LotteryParticipateDto, LotteryWinnerRequestDto } from './dto';
import { LotteryService } from './dao/lottery.service';
import { LotteryWinnerService } from './dao/lottery-winner.service';

@Controller('lotteries')
export class LotteryController {
  constructor(
    private lotteryService: LotteryService,
    private lotteryWinnerService: LotteryWinnerService,
  ) {}
  @HttpCode(HttpStatus.OK)
  @Post('participate')
  async participate(@Body() lotteryParticipatedto: LotteryParticipateDto) {
    return await this.lotteryService.addParticipant(lotteryParticipatedto);
  }
  @HttpCode(HttpStatus.OK)
  @Post('check/winner')
  async checkWinner(@Body() lotteryWinnerRequest: LotteryWinnerRequestDto) {
    const response = await this.lotteryWinnerService.checkWinner(lotteryWinnerRequest.ticket);
    if (response) {
      return { msg: 'You are a winner.' };
    } else {
      return { msg: 'Sorry , try next time.' };
    }
  }
}
