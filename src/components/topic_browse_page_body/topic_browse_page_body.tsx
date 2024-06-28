import Link from 'next/link';
import React, { useState } from 'react';
import { dummyTopicList } from '@/interfaces/topic';
import { TopicCategory } from '@/constants/topic';
import TopicSection from '@/components/topic_section/topic_section';

const TopicBrowsePageBody = () => {
  const topicCategories = Object.values(TopicCategory);

  const [search, setSearch] = useState('');

  const searchChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
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
    // ToDo: (20240627 - Julian) replace dummy data with real data
    const topics = dummyTopicList.filter((topic) => topic.category.includes(category));
    return <TopicSection key={`${category}_section`} category={category} topics={topics} />;
  });

  return (
    <div className="mx-100px my-180px flex w-screen flex-col items-center">
      <h1 className="text-48px font-bold text-text-neutral-primary">Welcome to Discover</h1>
      <p className="mt-20px text-base font-semibold text-text-neutral-tertiary">
        Discover records publicly asked questions by users, allowing you to find answers from
        others&apos; inquiries.
      </p>
      <div className="mt-40px flex w-full flex-col items-center">
        {/* Info: (20240626 - Julian) Chat box */}
        <div className="flex w-full items-center gap-16px rounded-sm border border-input-stroke-input bg-input-surface-input-background px-16px py-14px">
          <input
            type="text"
            className="flex-1 bg-transparent text-text-neutral-primary outline-none placeholder:text-input-text-input-placeholder"
            placeholder="Search topics..."
            value={search}
            onChange={searchChangeHandler}
          />

          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.16911 3.25098C5.90142 3.25098 3.25244 5.89996 3.25244 9.16764C3.25244 12.4353 5.90142 15.0843 9.16911 15.0843C10.7655 15.0843 12.2142 14.4521 13.2786 13.4243C13.2993 13.3969 13.3221 13.3706 13.3471 13.3456C13.3721 13.3207 13.3984 13.2978 13.4258 13.2771C14.4535 12.2128 15.0858 10.764 15.0858 9.16764C15.0858 5.89996 12.4368 3.25098 9.16911 3.25098ZM14.9171 13.855C15.9602 12.5774 16.5858 10.9456 16.5858 9.16764C16.5858 5.07153 13.2652 1.75098 9.16911 1.75098C5.073 1.75098 1.75244 5.07153 1.75244 9.16764C1.75244 13.2638 5.073 16.5843 9.16911 16.5843C10.947 16.5843 12.5789 15.9587 13.8564 14.9156L16.9721 18.0313C17.265 18.3242 17.7399 18.3242 18.0328 18.0313C18.3257 17.7384 18.3257 17.2635 18.0328 16.9706L14.9171 13.855Z"
                fill="#314362"
              />
            </g>
          </svg>
        </div>
        {/* Info: (20240626 - Julian) Topic tabs */}
        <div className="mt-28px flex items-end gap-40px text-center text-base font-medium text-tabs-text-default">
          {displayTopicCategories}
        </div>
        {/* Info: (20240626 - Julian) Topic list */}
        <div className="mt-40px flex w-full flex-col items-stretch gap-y-40px">{displayTopics}</div>
      </div>
    </div>
  );
};

export default TopicBrowsePageBody;
