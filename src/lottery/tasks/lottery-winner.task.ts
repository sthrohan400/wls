import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CommonService } from '../../common/common.service';
import { LotteryService } from '../dao/lottery.service';
import { LotteryWinnerService } from '../dao/lottery-winner.service';
import * as moment from 'moment';

@Injectable()
export class LotteryWinnerTaskService {
  private readonly logger = new Logger(LotteryWinnerTaskService.name);
  constructor(
    private lotteryService: LotteryService,
    private lotteryWinnerService: LotteryWinnerService,
    private commonService: CommonService,
  ) {}

  private async getActiveParticipants() {
    const contestants = await this.lotteryService.getActiveLotteryParticipants();
    return {
      ids: [...new Set(contestants.map((value) => value.lotteryId))],
      tickets: [...new Set(contestants.map((value) => value.ticket))],
    };
  }
  /**
   * Static configuration can be replaced with .env configuration
   * @returns
   */
  @Cron(CronExpression.EVERY_30_SECONDS)
  async declareWinner() {
    this.logger.debug('Running...');
    try {
      const lotteryTickets = await this.getActiveParticipants();
      if (lotteryTickets.ids.length > 1) {
        throw new Error('Duplicate Lottery ID found.');
      }
      if (lotteryTickets.tickets.length <= 0 || lotteryTickets.ids.length <= 0) {
        this.logger.debug('No new registered participants');
        return false;
      }
      const lotteryId = lotteryTickets.ids[0];
      console.log(lotteryId);
      const winnerTicket =
        lotteryTickets.tickets[this.commonService.getRandomInit(lotteryTickets.tickets.length, 0)];
      const result = await this.lotteryWinnerService.addWinner(winnerTicket);
      if (!result) {
        throw new Error('Declared Winner not set to db.');
      }
      await this.lotteryService.update(lotteryId, {
        drawDate: new Date(moment(Date.now()).format('YYYY-MM-DD hh:mm:ss')),
      });
      this.logger.debug('Winner Declaration task completed.');
    } catch (error) {
      this.logger.debug(`Failed to declare winner. - ${error.message}`);
    }
  }
}
