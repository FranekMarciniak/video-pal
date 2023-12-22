import { Module } from '@nestjs/common';

import { TelegramModule } from './telegram/telegram.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), TelegramModule],
})
export class AppModule {}
