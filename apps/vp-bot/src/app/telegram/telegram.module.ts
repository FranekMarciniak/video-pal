import { Module } from '@nestjs/common';
import { TelegramModule as TgModule } from 'nestjs-telegram';
import { TelegramService } from './telegram.service';
import { TelegramController } from './telegram.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getTelegramConfig } from '../../config/telegram.config';

@Module({
  imports: [
    ConfigModule,
    TgModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getTelegramConfig,
      inject: [ConfigService],
    }),
  ],
  providers: [TelegramService],
  controllers: [TelegramController],
})
export class TelegramModule {}
