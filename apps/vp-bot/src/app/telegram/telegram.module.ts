import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { sessionMiddleware } from '../../middleware/session.middleware';
import { ConfigEnvironmentVariables } from '../../interfaces/config.interface';
import { TelegramUpdate } from './telegram.update';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (
        configService: ConfigService<ConfigEnvironmentVariables>
      ) => ({
        token: configService.get('telegram'),
        middlewares: [sessionMiddleware],
      }),
    }),
  ],
  providers: [TelegramService, TelegramUpdate],
})
export class TelegramModule {}
