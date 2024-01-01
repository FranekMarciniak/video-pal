import { Context as C } from 'telegraf';

export interface ConfigEnvironmentVariables {
  telegram: TelegramEnvironmentVariables;
}

export interface TelegramEnvironmentVariables {
  token: string;
}

export type Context = C & { message: { text: string } };
