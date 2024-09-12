import ChatTopicOption from '@/components/chat_topic_option/chat_topic_option';
import { useChatCtx } from '@/contexts/chat_context';
import {
  IChatTopic,
  IMessageWithRole,
  MessageRole,
  DisplayedSender,
  dummyChatTopics,
} from '@/interfaces/chat';
import { cn } from '@/lib/utils/common';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import ChatMessage, { BotPendingMessage } from '@/components/chat_message/chat_message';
import { useUserCtx } from '@/contexts/user_context';
import { TopicIcons } from '@/constants/display';
import { useTranslation } from 'next-i18next';
import { ITranslateFunction } from '@/interfaces/locale';

const ChatThreadSection = () => {
  const { t }: { t: ITranslateFunction } = useTranslation('common');
  const { isSignedIn } = useUserCtx();
  const { selectedChat, addUserMessage, resendUserMessage, isLatestBotMsgPending } = useChatCtx();

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // TODO: dummy data (20240627 - Shirley)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [topicOptions, setTopicOptions] = useState<IChatTopic[]>(dummyChatTopics);

  const topicClickHandler = (title: string) => {
    addUserMessage({
      content: `${title}`,
    });
  };

  const displayedChatTopics = (
    <div className="mt-9 flex w-full justify-center lg:px-20">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {topicOptions.map((topic: IChatTopic) => (
          <ChatTopicOption
            key={topic.title}
            title={t(topic.title)}
            description={t(topic.description)}
            onClick={() => topicClickHandler(t(topic.title))}
            icon={isSignedIn ? TopicIcons[topic.type] : undefined}
          />
        ))}
      </div>
    </div>
  );

  // Info: if chat list is not empty, show chat list, otherwise show default chat content (20240626 - Shirley)
  const displayedChatContent =
    !selectedChat || selectedChat.messages.length === 0 ? (
      <div className="flex h-screen flex-col justify-center pt-40">
        {/* Info: logo, greetings, random chat topics (20240626 - Shirley) */}
        <div className="flex flex-col px-5">
          <div className="flex w-full justify-center">
            <div className="relative flex h-70px w-70px items-center justify-center lg:h-100px lg:w-100px">
              <Image
                src={'/logo/isunfa_logo_with_ring.svg'}
                fill
                objectFit="contain"
                alt="isunfa logo with ring border"
              />
            </div>
          </div>

          <div className="hidden self-center text-3xl font-bold text-stroke-neutral-secondary lg:block">
            {t('CHAT.I_AM_FAITH')}
          </div>

          {displayedChatTopics}
        </div>
      </div>
    ) : selectedChat.messages.length > 0 ? (
      <div
        ref={chatContainerRef}
        className={cn(
          'hideScrollbar overflow-y-auto overflow-x-hidden pt-200px lg:pt-20',
          selectedChat.messages.length > 1 ? 'h-screen pb-10' : 'pb-2'
        )}
      >
        <div className="mx-20px flex flex-col gap-10 lg:mx-20">
          {selectedChat.messages.map((message: IMessageWithRole, index: number) => (
            <ChatMessage
              resend={() => resendUserMessage(index)}
              sender={
                message.role === MessageRole.VISITOR
                  ? DisplayedSender.VISITOR
                  : message.role === MessageRole.BOT
                    ? DisplayedSender.BOT
                    : DisplayedSender.USER
              }
              key={message.messages[0].id}
              role={message.role}
              messages={message.messages}
            />
          ))}
          {selectedChat?.messages.at(-1)?.role !== MessageRole.BOT && isLatestBotMsgPending && (
            <BotPendingMessage sender={DisplayedSender.BOT} role={MessageRole.BOT} />
          )}
        </div>
      </div>
    ) : null;

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [selectedChat?.messages.length]);

  return <div>{displayedChatContent}</div>;
};

export default ChatThreadSection;
