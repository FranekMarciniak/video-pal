import { Injectable } from '@nestjs/common';
import { Message } from '@video-pal/vp-common';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class QueueService {
  private videoQueue: Message[] = [];
  private queueSubject = new BehaviorSubject<Message[]>([]);

  enqueue(videoMessage: Message): void {
    this.videoQueue.push(videoMessage);
    this.queueSubject.next([...this.videoQueue]);
  }

  dequeue(): void {
    if (this.videoQueue.length > 0) {
      this.videoQueue.shift();
      this.queueSubject.next([...this.videoQueue]);
    }
  }

  getQueueObservable(): Observable<Message[]> {
    return this.queueSubject.asObservable();
  }
}
