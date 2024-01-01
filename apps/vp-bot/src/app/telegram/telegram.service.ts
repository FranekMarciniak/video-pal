import { Injectable } from '@nestjs/common';
import { Context } from '../../interfaces/config.interface';
import { Message, Platform } from 'vp-common/src';
import tldjs from 'tldjs';

@Injectable()
export class TelegramService {
  mapContextToMessage(ctx: Context): Message | null {
    const platform = this.mapUrlToPlatform(ctx.message.text);
    if (!platform) {
      return null;
    }

    return {
      chatId: ctx.message.chat.id,
      platform: platform,
      sourceUrl: ctx.message.text,
      senderId: ctx.message.from.id.toString(),
      messageId: ctx.message.message_id.toString(),
    };
  }

  mapUrlToPlatform(url: string): Platform | null {
    const domain = tldjs.getDomain(url);
    if (this.#isInstagramUrl(domain)) {
      return 'instagram';
    }
    return null;
  }

  #isInstagramUrl(url: string) {
    return (
      url === 'instagram.com' || url === 'instagram.pl' || url === 'instagr.am'
    );
  }
}
