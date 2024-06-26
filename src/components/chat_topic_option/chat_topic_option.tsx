import React from 'react';

interface ChatTopicOptionProps {
  title: string;
  description: string;
}

const ChatTopicOption = ({ title, description }: ChatTopicOptionProps) => {
  return (
    <div className="flex w-full flex-col max-md:ml-0 max-md:w-full">
      <div className="flex grow flex-col items-start justify-center rounded-sm border border-solid border-stroke-brand-secondary-soft py-7 pl-5 pr-20 hover:cursor-pointer hover:bg-surface-brand-primary-5 max-md:mt-5 max-md:pr-5">
        <div className="text-2xl font-bold leading-8 text-text-neutral-primary">{title}</div>
        <div className="mt-6 text-lg font-normal leading-7 tracking-normal text-stroke-neutral-tertiary">
          {description}
        </div>
      </div>
    </div>
  );
};

export default ChatTopicOption;
