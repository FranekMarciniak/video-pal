export interface Message {
  chatId: number;
  platform: Platform;
  sourceUrl: string;
  senderId: string;
  messageId: string;
}

export type Platform = 'instagram';
