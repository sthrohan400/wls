import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  getRandomInit(max: number, min: number) {
    return Math.floor(Math.random() * (Math.ceil(max) - Math.floor(min) + 1)) + Math.ceil(min);
  }
}
