import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegramController } from './telegram.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { sessionMiddleware } from '../../middleware/session.middleware';
import { ConfigEnvironmentVariables } from '../../interfaces/config.interface';
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
  providers: [TelegramService],
  controllers: [TelegramController],
})
export class TelegramModule {}
