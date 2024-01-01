import { Test, TestingModule } from '@nestjs/testing';
import { QueueService } from './queue.service';
import { Message } from '@video-pal/vp-common';

describe('QueueService', () => {
  let service: QueueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueueService],
    }).compile();

    service = module.get<QueueService>(QueueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should enqueue a video message', () => {
    const videoMessage: Message = {
      chatId: 1,
      platform: 'instagram',
      sourceUrl: 'https://www.instagram.com/p/CLyqz1QjZ5X/',
      senderId: '123456789',
      messageId: '1234567890',
    };
    service.enqueue(videoMessage);
    const queue = service['videoQueue'];
    expect(queue.length).toBe(1);
    expect(queue[0]).toEqual(videoMessage);
  });

  it('should dequeue a video message', () => {
    const videoMessage1: Message = {
      chatId: 1,
      platform: 'instagram',
      sourceUrl: 'https://www.instagram.com/p/CLyqz1QjZ5X/',
      senderId: '123456789',
      messageId: '1234567890',
    };
    const videoMessage2: Message = {
      chatId: 2,
      platform: 'instagram',
      sourceUrl: 'https://www.instagram.com/p/CLyqz1QjZ5X/',
      senderId: '123456789',
      messageId: '1234567890',
    };
    service.enqueue(videoMessage1);
    service.enqueue(videoMessage2);
    service.dequeue();
    const queue = service['videoQueue'];
    expect(queue.length).toBe(1);
    expect(queue[0]).toEqual(videoMessage2);
  });

  it('should not dequeue a video message if the queue is empty', () => {
    service.dequeue();
    const queue = service['videoQueue'];
    expect(queue.length).toBe(0);
  });

  it('should return the queue as an observable', () => {
    const queueObservable = service.getQueueObservable();
    expect(queueObservable).toBeDefined();
    expect(queueObservable.subscribe).toBeDefined();
  });
});
