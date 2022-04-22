import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { LotteryParticipateDto, LotteryWinnerRequestDto } from '../src/lottery/dto';

describe('Application E2E Test', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(process.env.APP_PORT);
    prisma = app.get(PrismaService);

    // Delete All data from the table
    await prisma.lotteriesContestants.deleteMany();
    await prisma.lotteriesWinners.deleteMany();
    await prisma.lotteries.deleteMany();
    await prisma.contestants.deleteMany();

    pactum.request.setBaseUrl(`http://localhost:${process.env.APP_PORT}`);
  });
  afterAll(() => {
    app.close();
  });
  describe('Lottery Participants', () => {
    describe('Participate to lottery', () => {
      const participateRequest: LotteryParticipateDto = {
        email: 'test@example.com',
      };
      const lottery: LotteryWinnerRequestDto = {
        ticket: `$S{ticket}`,
      };
      // False Case
      test('Should throw if email empty', () => {
        return pactum.spec().post('/lotteries/participate').withBody({}).expectStatus(400);
      });
      // Null Case
      test('Should throw if no body', () => {
        return pactum.spec().post('/lotteries/participate').expectStatus(400);
      });
      // True Case
      test('Should participate', () => {
        return pactum
          .spec()
          .post('/lotteries/participate')
          .withBody(participateRequest)
          .expectStatus(200)
          .stores('ticket', 'ticket');
      });
      // Duplicate Email Case
      test('Should throw if Duplicate Email', () => {
        return pactum
          .spec()
          .post('/lotteries/participate')
          .withBody(participateRequest)
          .expectStatus(403);
      });
      // Check Winner
      test('Should throw if no Ticket', () => {
        return pactum.spec().post('/lotteries/check/winner').withBody({}).expectStatus(400);
      });
      test('Should throw if no body', () => {
        return pactum.spec().post('/lotteries/check/winner').expectStatus(400);
      });
      test('Should return result if ticket', () => {
        return pactum.spec().post('/lotteries/check/winner').withBody(lottery).expectStatus(200);
      });
    });
  });
});
