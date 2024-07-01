import { ChatTopicType } from '@/interfaces/chat';

export const DELAYED_RESPONSE_MILLISECONDS = 100;
export const DEFAULT_USER_NAME = 'User';
export const DEFAULT_DISPLAYED_USER_NAME = 'User';
export const TopicIcons = {
  [ChatTopicType.AI]: '/elements/ai_topic.svg',
  [ChatTopicType.TRENDING]: '/elements/trending_topic.svg',
  [ChatTopicType.OTHERS]: '/elements/others_topic.svg',
};
export enum SortOptions {
  NEWEST = 'Newest',
  OLDEST = 'Oldest',
}

// Info: (20240628 - Julian) checkbox CSS style
export const checkboxStyle =
  'relative h-16px w-16px appearance-none rounded-xxs border border-navyBlue2 bg-white outline-none after:absolute after:top-0 after:-mt-3px after:ml-px after:hidden after:text-sm after:text-white after:content-checked checked:bg-navyBlue2 checked:after:block';

export const DELAYED_FILE_UPLOAD_MILLISECONDS = 1000;
export const DELAYED_BOT_ACTION_SUCCESS_MILLISECONDS = 1000;
