import React from 'react';

interface ChatTopicOptionProps {
  title: string;
  description: string;
  onClick: () => void;
}

const ChatTopicOption = ({ title, description, onClick }: ChatTopicOptionProps) => {
  return (
    <div className="flex w-full flex-col">
      <div
        className="flex grow flex-col items-start justify-center rounded-sm border border-solid border-stroke-brand-secondary-soft py-5 pl-5 pr-20 hover:cursor-pointer hover:bg-surface-brand-primary-5 max-md:mt-5 max-md:pr-5"
        onClick={onClick}
      >
        <div className="text-2xl font-bold leading-8 text-text-neutral-primary">{title}</div>
        <div className="mt-6 text-lg font-normal leading-7 tracking-normal text-stroke-neutral-tertiary">
          {description}
        </div>
      </div>
    </div>
  );
};

export default ChatTopicOption;
