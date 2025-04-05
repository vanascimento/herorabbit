import { QueueAndStreamsToggles } from '@/components/popup/configs/queue-and-streams-toggles';
import { RabbitMqCredentials } from '@/components/popup/credentials-form';

export enum MESSAGE_TYPES {
  GENERAL_SETTINGS_UPDATED = 'GENERAL_SETTINGS_UPDATED',
  OPEN_OPTIONS = 'OPEN_OPTIONS',
}

export type Theme = 'dark' | 'light';

export interface Message {
  type: MESSAGE_TYPES;
  data?: unknown;
}

export const GENERAL_SETTINGS_KEY = 'generalSettings';

export interface GeneralSettings {
  theme: Theme;
  hide_sidebar_button: boolean;
  credentials: RabbitMqCredentials[];
  toggleSettings: QueueAndStreamsToggles;
  language: 'en' | 'pt_br';
}
