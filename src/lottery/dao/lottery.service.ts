import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { LotteryParticipateDto } from '../dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LotteryService {
  constructor(private prisma: PrismaService) {}
  async addParticipant(input: LotteryParticipateDto) {
    try {
      const createData: any = {
        data: {
          ticket: uuidv4(),
          lottery: {
            connectOrCreate: {
              where: {
                drawDate: new Date('1970-01-01 00:00:00'),
              },
              create: {
                drawDate: new Date('1970-01-01 00:00:00'),
              },
            },
          },
          contestant: {
            connectOrCreate: {
              where: {
                email: input.email,
              },
              create: {
                email: input.email,
              },
            },
          },
        },
      };
      const result = await this.prisma.lotteriesContestants.create(createData);
      return result;
    } catch (e) {
      /** Handling Unique Constraint Violation Issue */
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ForbiddenException(e);
          return;
        }
      }
      throw e;
    }
  }
  async getActiveLotteryParticipants() {
    const inputFilter: any = {
      where: {
        lottery: {
          drawDate: {
            lte: new Date('1970-01-01 00:00:00'),
          },
        },
      },
      select: {
        ticket: true,
        lotteryId: true,
      },
    };
    const result = this.prisma.lotteriesContestants.findMany(inputFilter);
    return result;
  }
  async update(id: number, input: any) {
    const updateInput = {
      where: {
        id: id,
      },
      data: {
        drawDate: input.drawDate,
      },
    };
    const result = this.prisma.lotteries.update(updateInput);
    return result;
  }
}
