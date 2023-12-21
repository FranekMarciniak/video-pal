import { Injectable } from '@nestjs/common';

@Injectable()
export class TelegramService {
  testBot(): { message: string } {
    return { message: 'Hello Telegram' };
  }
}
