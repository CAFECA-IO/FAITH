import { v4 as uuidv4 } from 'uuid';
import ChatTopicOption from '@/components/chat_topic_option/chat_topic_option';
import { useChatCtx } from '@/contexts/chat_context';
import {
  IChatTopic,
  IMessageWithRole,
  MessageRole,
  DisplayedSender,
  dummyChatTopics,
} from '@/interfaces/chat';
import { cn, getTimestamp } from '@/lib/utils/common';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import ChatMessage, { BotPendingMessage } from '@/components/chat_message/chat_message';
import { useUserCtx } from '@/contexts/user_context';
import { TopicIcons } from '@/constants/display';

const ChatThreadSection = () => {
  const { signedIn } = useUserCtx();
  const { selectedChat, userAddMessage, resendMessage, isPendingBotMsg } = useChatCtx();

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // TODO: dummy data (20240627 - Shirley)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [topicOptions, setTopicOptions] = useState<IChatTopic[]>(dummyChatTopics);

  const topicClickHandler = (title: string) => {
    userAddMessage({
      id: uuidv4(),
      content: `${title}`,
      createdAt: getTimestamp(),
    });
  };

  const displayedChatTopics = (
    <div className="mt-9 flex w-full justify-center px-20">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {topicOptions.map((topic: IChatTopic) => (
          <ChatTopicOption
            key={topic.title}
            title={topic.title}
            description={topic.description}
            onClick={() => topicClickHandler(topic.title)}
            icon={signedIn ? TopicIcons[topic.type] : undefined}
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
            <div className="relative flex items-center justify-center">
              <Image
                src={'/logo/isunfa_logo_with_ring.svg'}
                width={100}
                height={100}
                alt="isunfa logo with ring border"
              />
            </div>
          </div>

          <div className="self-center text-3xl font-bold text-stroke-neutral-secondary">
            Hi, I am Faith, the AI Accountant.
          </div>

          {displayedChatTopics}
        </div>
      </div>
    ) : selectedChat.messages.length > 0 ? (
      <div
        ref={chatContainerRef}
        className={cn(
          'hideScrollbar overflow-y-auto overflow-x-hidden pt-20',
          selectedChat.messages.length > 1 ? 'h-screen pb-10' : 'pb-2'
        )}
      >
        <div className="mx-20 flex flex-col gap-10">
          {selectedChat.messages.map((message: IMessageWithRole, index: number) => (
            <ChatMessage
              resend={() => resendMessage(index)}
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
          {selectedChat?.messages.at(-1)?.role !== MessageRole.BOT && isPendingBotMsg && (
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
