import { Update, Ctx, Start } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Update()
export class TelegramUpdate {
  @Start()
  async start(@Ctx() ctx: Context) {
    console.log(ctx.chat.id);
    await ctx.reply('Welcome');
  }
}
