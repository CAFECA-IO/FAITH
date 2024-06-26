import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';

enum TopicCategory {
  TRENDING = 'Trending topics',
  AI_FINANCE = 'AI Finance',
  FINANCIAL_INSIGHTS = 'Financial Insights',
  OTHER = 'Other',
  MY_FAVORITES = 'My Favorites',
}

const dummyTopicData = [
  {
    id: '1',
    title: 'How to invest in the stock market',
    imageId: '/icons/info.svg',
    creator: 'John Doe',
    category: [TopicCategory.FINANCIAL_INSIGHTS, TopicCategory.TRENDING],
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: '2',
    title: 'What is the future of AI in finance?',
    imageId: '/icons/info.svg',
    creator: 'John Doe',
    category: [TopicCategory.AI_FINANCE, TopicCategory.TRENDING],
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: '3',
    title: 'The impact of COVID-19 on the stock market',
    imageId: '/icons/info.svg',
    creator: 'John Doe',
    category: [TopicCategory.FINANCIAL_INSIGHTS, TopicCategory.TRENDING],
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: '4',
    title: 'How much should I save for retirement?',
    imageId: '/icons/info.svg',
    creator: 'John Doe',
    category: [TopicCategory.FINANCIAL_INSIGHTS, TopicCategory.OTHER],
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: '5',
    title: 'Top 10 investment strategies for beginners',
    imageId: '/icons/info.svg',
    creator: 'John Doe',
    category: [TopicCategory.FINANCIAL_INSIGHTS, TopicCategory.TRENDING],
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
];

const TopicSection = () => {
  const topicCategories = Object.values(TopicCategory);

  const [searchValue, setSearchValue] = useState('');

  const searchChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const displayTopicCategories = topicCategories.map((category) => {
    return (
      <Link
        href={`/discover#${category}`}
        key={`${category}_tab`}
        className="flex flex-col items-center border-b-2 px-12px py-8px hover:border-tabs-stroke-hover hover:text-tabs-text-hover"
      >
        <p>{category}</p>
      </Link>
    );
  });

  const displayTopics = topicCategories.map((category) => {
    return (
      <div key={`${category}`} className="flex flex-col gap-y-20px">
        {/* Info: (20240626 - Julian) Topic title */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-text-neutral-secondary">{category}</h2>
          <p className="text-base font-semibold text-link-text-primary">See More</p>
        </div>
        <div className="grid grid-cols-2 items-center gap-x-40px">
          {/* Info: (20240626 - Julian) Topic card */}
          {dummyTopicData
            .filter((topic) => topic.category.includes(category))
            .slice(0, 2)
            .map((topic) => (
              <div className="flex h-160px items-center gap-x-40px rounded-sm bg-surface-neutral-surface-lv2 px-20px py-16px">
                <div className="">
                  <Image src={topic.imageId} alt="icon" width={64} height={64} />
                </div>
                <div className="flex flex-col gap-y-8px">
                  <h3 className="text-2xl font-bold text-text-neutral-primary">{topic.title}</h3>
                  <p className="line-clamp-3 text-xs font-medium text-text-neutral-secondary">
                    {topic.content}
                  </p>
                  <p className="ml-auto text-xs font-semibold text-text-neutral-tertiary">
                    {topic.creator}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  });

  return (
    <div className="flex flex-col items-center">
      {/* Info: (20240626 - Julian) Search bar */}
      <div className="flex w-full items-center gap-16px rounded-sm border border-input-stroke-input bg-input-surface-input-background px-16px py-14px">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.0029 3.75098C6.99887 3.75098 3.75293 6.99691 3.75293 11.001C3.75293 15.005 6.99887 18.251 11.0029 18.251C12.9635 18.251 14.7424 17.4727 16.0474 16.2083C16.0698 16.1776 16.0949 16.1483 16.1226 16.1206C16.1503 16.093 16.1796 16.0679 16.2102 16.0454C17.4747 14.7404 18.2529 12.9616 18.2529 11.001C18.2529 6.99691 15.007 3.75098 11.0029 3.75098ZM17.6978 16.6352C18.9802 15.113 19.7529 13.1472 19.7529 11.001C19.7529 6.16848 15.8354 2.25098 11.0029 2.25098C6.17044 2.25098 2.25293 6.16848 2.25293 11.001C2.25293 15.8335 6.17044 19.751 11.0029 19.751C13.1492 19.751 15.1149 18.9783 16.6372 17.6959L20.4726 21.5313C20.7655 21.8242 21.2404 21.8242 21.5333 21.5313C21.8262 21.2384 21.8262 20.7635 21.5333 20.4706L17.6978 16.6352Z"
              fill="#314362"
            />
          </g>
        </svg>

        <input
          type="text"
          className="flex-1 bg-transparent outline-none"
          value={searchValue}
          onChange={searchChangeHandler}
          placeholder="Search for topics..."
        />
      </div>
      {/* Info: (20240626 - Julian) Topic tabs */}
      <div className="mt-28px flex items-end gap-40px text-center text-base font-medium text-tabs-text-default">
        {displayTopicCategories}
      </div>
      {/* Info: (20240626 - Julian) Topic list */}
      <div className="mt-40px flex flex-col items-stretch gap-y-40px">{displayTopics}</div>
    </div>
  );
};

export default TopicSection;
