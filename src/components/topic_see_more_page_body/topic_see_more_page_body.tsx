import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { TopicCategory } from '@/constants/topic';
import TopicItem from '../topic_item/topic_item';
import { dummyTopicList } from '@/interfaces/topic';

const TopicSeeMorePageBody = () => {
  const topicCategories = Object.values(TopicCategory);

  const { query } = useRouter();
  const defaultCategory = query.category ? (query.category as TopicCategory) : topicCategories[0];

  const [search, setSearch] = useState('');
  const [currentCategory, setCurrentCategory] = useState(defaultCategory);
  // ToDo: (20240626 - Julian) sorting function
  const [sort, setSort] = useState('Newest');

  const sortSwitchHandler = () => {
    setSort((prevSort) => (prevSort === 'Newest' ? 'Oldest' : 'Newest'));
  };

  const searchChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const displayTopicCategories = topicCategories.map((category) => {
    const clickHandler = () => {
      setCurrentCategory(category);
    };
    return (
      <button
        key={`${category}_tab`}
        type="button"
        className={`flex flex-col items-center border-b-2 px-12px py-8px hover:border-tabs-stroke-hover hover:text-tabs-text-hover ${currentCategory === category ? 'border-tabs-stroke-active text-tabs-text-active' : 'border-tabs-stroke-default text-tabs-text-default'}`}
        onClick={clickHandler}
      >
        <p>{category}</p>
      </button>
    );
  });

  // ToDo: (20240627 - Julian) replace dummy data with real data
  const currentTopics = dummyTopicList.filter((topic) => topic.category.includes(currentCategory));

  const displayTopics =
    currentTopics.length > 0 ? (
      currentTopics.map((topic) => <TopicItem key={topic.id} topic={topic} />)
    ) : (
      <div className="col-span-2 mx-auto flex-1 py-40px text-text-neutral-tertiary">
        <p>No topics yet.</p>
      </div>
    );

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
        <div className="mt-40px flex w-full flex-col items-stretch">
          {/* Info: (20240626 - Julian) Category title */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-text-neutral-secondary">{currentCategory}</h2>
            {/* Info: (20240626 - Julian) Sort */}
            <button
              type="button"
              className="flex items-center gap-x-16px text-chat-bubbles-text-note"
              onClick={sortSwitchHandler}
            >
              <div className="flex items-center gap-x-8px">
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
                      d="M5.00244 2.58447C5.20135 2.58447 5.39212 2.66349 5.53277 2.80414L8.03277 5.30414C8.32566 5.59704 8.32566 6.07191 8.03277 6.3648C7.73988 6.6577 7.265 6.6577 6.97211 6.3648L5.75244 5.14513L5.75244 14.8571L6.97211 13.6375C7.265 13.3446 7.73988 13.3446 8.03277 13.6375C8.32566 13.9304 8.32566 14.4052 8.03277 14.6981L5.53277 17.1981C5.39212 17.3388 5.20135 17.4178 5.00244 17.4178C4.80353 17.4178 4.61276 17.3388 4.47211 17.1981L1.97211 14.6981C1.67922 14.4052 1.67922 13.9304 1.97211 13.6375C2.265 13.3446 2.73988 13.3446 3.03277 13.6375L4.25244 14.8571L4.25244 5.14513L3.03277 6.3648C2.73988 6.6577 2.265 6.6577 1.97211 6.3648C1.67922 6.07191 1.67922 5.59704 1.97211 5.30414L4.47211 2.80414C4.61276 2.66349 4.80353 2.58447 5.00244 2.58447ZM10.0858 5.00114C10.0858 4.58693 10.4216 4.25114 10.8358 4.25114H17.5024C17.9167 4.25114 18.2524 4.58693 18.2524 5.00114C18.2524 5.41535 17.9167 5.75114 17.5024 5.75114H10.8358C10.4216 5.75114 10.0858 5.41535 10.0858 5.00114ZM10.0858 8.33447C10.0858 7.92026 10.4216 7.58447 10.8358 7.58447H17.5024C17.9167 7.58447 18.2524 7.92026 18.2524 8.33447C18.2524 8.74869 17.9167 9.08447 17.5024 9.08447H10.8358C10.4216 9.08447 10.0858 8.74869 10.0858 8.33447ZM10.0858 11.6678C10.0858 11.2536 10.4216 10.9178 10.8358 10.9178H17.5024C17.9167 10.9178 18.2524 11.2536 18.2524 11.6678C18.2524 12.082 17.9167 12.4178 17.5024 12.4178H10.8358C10.4216 12.4178 10.0858 12.082 10.0858 11.6678ZM10.0858 15.0011C10.0858 14.5869 10.4216 14.2511 10.8358 14.2511H17.5024C17.9167 14.2511 18.2524 14.5869 18.2524 15.0011C18.2524 15.4154 17.9167 15.7511 17.5024 15.7511H10.8358C10.4216 15.7511 10.0858 15.4154 10.0858 15.0011Z"
                      fill="#7F8A9D"
                    />
                  </g>
                </svg>
                <p className="w-55px">{sort}</p>
              </div>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.63112 2.42182C7.92402 2.12893 8.39889 2.12893 8.69178 2.42182L11.947 5.67702C12.2399 5.96992 12.2399 6.44479 11.947 6.73768C11.6541 7.03058 11.1792 7.03058 10.8863 6.73768L8.16145 4.01281L5.43658 6.73768C5.14369 7.03058 4.66881 7.03058 4.37592 6.73768C4.08303 6.44479 4.08303 5.96992 4.37592 5.67702L7.63112 2.42182ZM4.37592 9.58327C4.66881 9.29038 5.14369 9.29038 5.43658 9.58327L8.16145 12.3081L10.8863 9.58327C11.1792 9.29038 11.6541 9.29038 11.947 9.58327C12.2399 9.87616 12.2399 10.351 11.947 10.6439L8.69178 13.8991C8.39889 14.192 7.92402 14.192 7.63112 13.8991L4.37592 10.6439C4.08303 10.351 4.08303 9.87616 4.37592 9.58327Z"
                    fill="#314362"
                  />
                </g>
              </svg>
            </button>
          </div>
          <div className="mt-20px grid w-full grid-flow-row grid-cols-2 gap-40px">
            {displayTopics}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicSeeMorePageBody;
