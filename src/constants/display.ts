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
