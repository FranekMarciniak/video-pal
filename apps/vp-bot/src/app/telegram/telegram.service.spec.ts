import { Test, TestingModule } from '@nestjs/testing';
import { TelegramService } from './telegram.service';
import { Context } from '../../interfaces/config.interface';

describe('TelegramService', () => {
  let service: TelegramService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TelegramService],
    }).compile();

    service = module.get<TelegramService>(TelegramService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should map context to message', () => {
    const ctx = {
      chat: { id: 'chatId' },
      message: {
        text: 'https://www.instagram.com/p/CFQZ3Y5nZ6z/',
        message_id: 'messageId',
      },
      from: { id: 'senderId' },
    };

    const expectedMessage = {
      chatId: 'chatId',
      platform: 'instagram',
      sourceUrl: 'https://www.instagram.com/p/CFQZ3Y5nZ6z/',
      senderId: 'senderId',
      messageId: 'messageId',
    };

    const result = service.mapContextToMessage(ctx as unknown as Context);

    expect(result).toEqual(expectedMessage);
  });

  it('should return null if platform is not supported', () => {
    const ctx = {
      chat: { id: 'chatId' },
      message: { text: 'https://www.example.com' },
      from: { id: 'senderId' },
    };

    const result = service.mapContextToMessage(ctx as unknown as Context);

    expect(result).toBeNull();
  });

  it('should map Instagram URL to platform', () => {
    const url = 'https://www.instagram.com/p/CFQZ3Y5nZ6z/';

    const result = service.mapUrlToPlatform(url);

    expect(result).toBe('instagram');
  });

  it('should return null if URL is not an Instagram URL', () => {
    const url = 'https://www.example.com';

    const result = service.mapUrlToPlatform(url);

    expect(result).toBeNull();
  });
});
