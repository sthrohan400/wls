import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
// import { Exclude } from 'class-transformer';

export class LotteryParticipateDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
export class LotteryWinnerRequestDto {
  @IsNotEmpty()
  @IsString()
  ticket: string;
}
