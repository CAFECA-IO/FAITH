import { MessageRole, Sender } from '@/interfaces/chat';
import Image from 'next/image';
import React from 'react';

interface ChatMessageProps {
  sender: Sender;
  role: MessageRole;
  content: string;
}

const ChatMessage = ({ sender, role, content }: ChatMessageProps) => {
  const displayedAvatar =
    role === MessageRole.VISITOR ? (
      <div className="relative flex shrink-0 items-start justify-center">
        <Image
          src={'/elements/anonymous_avatar.svg'}
          width={60}
          height={60}
          alt="isunfa logo with ring border"
        />
      </div>
    ) : role === MessageRole.BOT ? (
      <div className="relative flex h-60px w-60px shrink-0 items-center justify-center">
        <Image
          src={'/logo/isunfa_pure_logo.svg'}
          width={30}
          height={30}
          alt="isunfa logo"
          className="z-10 h-30px w-30px"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="60"
          height="60"
          fill="none"
          viewBox="0 0 60 60"
          className="absolute"
        >
          <circle cx="30" cy="30" r="29" stroke="#CDD1D9" strokeWidth="2"></circle>
        </svg>
      </div>
    ) : (
      <p>user</p>
    );

  const displayedMessage = (
    <div>
      <div className="mt-0 flex gap-5 self-start whitespace-nowrap font-barlow">
        {displayedAvatar}
        <div className="flex w-1200px flex-col overflow-x-auto">
          <div className="text-xl font-bold leading-8">{sender}</div>
          <div className="mt-2 whitespace-pre-wrap text-base leading-6 tracking-normal">
            {content}
          </div>
        </div>
      </div>
    </div>
  );

  return displayedMessage;
};

export default ChatMessage;
