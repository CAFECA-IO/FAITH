'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import { dummyTopicList } from '@/interfaces/topic';
import { TopicCategory } from '@/constants/topic';
import TopicSection from '@/components/topic_section/topic_section';
import { NATIVE_ROUTE } from '@/constants/url';
import { useTranslation } from 'react-i18next';

const TopicBrowsePageBody = () => {
  const { t } = useTranslation();
  const topicCategories = Object.values(TopicCategory);

  const [search, setSearch] = useState('');

  const searchChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const displayTopicCategories = topicCategories.map((category) => {
    return (
      <Link
        href={`${NATIVE_ROUTE.DISCOVER}#${category}`}
        key={`${category}_tab`}
        className="flex flex-col items-center whitespace-nowrap border-b-2 px-12px py-8px hover:border-tabs-stroke-hover hover:text-tabs-text-hover"
      >
        <p>{t(category)}</p>
      </Link>
    );
  });

  const displayTopics = topicCategories.map((category) => {
    // ToDo: (20240627 - Julian) replace dummy data with real data
    const topics = dummyTopicList.filter((topic) => topic.category.includes(category));
    return <TopicSection key={`${category}_section`} category={category} topics={topics} />;
  });

  return (
    <div className="mb-60px mt-100px flex w-screen flex-col items-center px-20px lg:mx-100px lg:my-180px">
      {/* Info: (20240905 - Julian) Desktop Title */}
      <h1 className="hidden text-48px font-bold text-text-neutral-primary lg:block">
        {t('DISCOVER.TITLE')}
      </h1>
      <p className="mt-20px hidden text-base font-semibold text-text-neutral-tertiary lg:block">
        {t('DISCOVER.SUB_TITLE')}
      </p>

      {/* Info: (20240905 - Julian) Mobile Title */}
      <h1 className="block text-2xl font-bold text-text-neutral-primary lg:hidden">
        {t('DISCOVER.HEADER_TITLE')}
      </h1>

      {/* Info: (20240905 - Julian) Body */}
      <div className="mt-40px flex w-full flex-col items-center">
        {/* Info: (20240626 - Julian) Chat box */}
        <div className="flex w-full items-center gap-16px rounded-sm border border-input-stroke-input bg-input-surface-input-background px-16px py-14px">
          <input
            type="text"
            className="flex-1 bg-transparent text-text-neutral-primary outline-none placeholder:text-input-text-input-placeholder"
            placeholder={t('DISCOVER.SEARCH_PLACEHOLDER')}
            value={search}
            onChange={searchChangeHandler}
          />

          <Image src="/icons/search.svg" width={20} height={20} alt="search_icon" />
        </div>
        {/* Info: (20240626 - Julian) Topic tabs */}
        <div className="mt-28px flex w-full justify-center text-center text-base font-medium text-tabs-text-default">
          <div className="flex items-end gap-20px overflow-x-auto lg:gap-40px">
            {displayTopicCategories}
          </div>
        </div>
        {/* Info: (20240626 - Julian) Topic list */}
        <div className="mt-40px flex w-full flex-col items-stretch gap-y-40px">{displayTopics}</div>
      </div>
    </div>
  );
};

export default TopicBrowsePageBody;
