import { Module } from '@nestjs/common';

import { TelegramModule } from './telegram/telegram.module';
import { ConfigModule } from '@nestjs/config';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [ConfigModule.forRoot(), TelegramModule, QueueModule],
})
export class AppModule {}
