import Image from 'next/image';
import React from 'react';

interface ChatTopicOptionProps {
  title: string;
  description: string;
  onClick: () => void;
  icon?: string;
}

const ChatTopicOption = ({ title, description, onClick, icon }: ChatTopicOptionProps) => {
  return (
    <div className="flex w-full flex-col">
      <div
        className="flex grow flex-col items-start justify-center rounded-sm border border-solid border-stroke-brand-secondary-soft px-5 py-5 hover:cursor-pointer hover:bg-surface-brand-primary-5 max-md:mt-5 max-md:pr-5"
        onClick={onClick}
      >
        <div className="flex w-full gap-5">
          <div className="text-2xl font-bold leading-8 text-text-neutral-primary">{title}</div>
          {icon && <Image src={icon} alt="icon" width={24} height={24} />}
        </div>
        <div className="mt-6 text-lg font-normal leading-7 tracking-normal text-stroke-neutral-tertiary">
          {description}
        </div>
      </div>
    </div>
  );
};

export default ChatTopicOption;
