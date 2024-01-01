import { Update, Ctx, On } from 'nestjs-telegraf';
import { Context } from '../../interfaces/config.interface';
import { TelegramService } from './telegram.service';

@Update()
export class TelegramUpdate {
  constructor(private readonly telegramService: TelegramService) {}
  @On('text')
  async text(@Ctx() ctx: Context) {
    const message = this.telegramService.mapContextToMessage(ctx);
    if (!message) {
      return;
    }
    await ctx.reply(message.platform + ' ' + message.sourceUrl);
  }
}
