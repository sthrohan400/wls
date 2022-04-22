import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class LotteryWinnerService {
  constructor(private prisma: PrismaService) {}
  async checkWinner(ticket: string) {
    const createFilter = {
      where: {
        ticket: ticket,
      },
    };
    return this.prisma.lotteriesWinners.findUnique(createFilter);
  }
  async addWinner(ticket: string) {
    const createInput = {
      data: {
        ticket: ticket,
        winner: {
          connect: {
            ticket: ticket,
          },
        },
      },
    };
    const created = await this.prisma.lotteriesWinners.create(createInput);
    return created;
  }
}
