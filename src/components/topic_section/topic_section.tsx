'use client';

import Link from 'next/link';
import { ITopicBrief } from '@/interfaces/topic';
import { TopicCategory } from '@/constants/topic';
import TopicItem from '@/components/topic_item/topic_item';
import { NATIVE_ROUTE } from '@/constants/url';
import { useTranslation } from 'react-i18next';

interface ITopicBrowsePageBody {
  category: TopicCategory;
  topics: ITopicBrief[];
}

const TopicSection = ({ category, topics }: ITopicBrowsePageBody) => {
  const { t } = useTranslation();

  const topicEmptyHint =
    category === TopicCategory.MY_FAVORITES
      ? t('DISCOVER.NO_FAVORITE_YET')
      : t('DISCOVER.NO_TOPIC_FOUND');

  const displayTopics =
    topics.length > 0 ? (
      topics.slice(0, 2).map((topic) => (
        // Info: (20240626 - Julian) Topic card
        <TopicItem key={topic.id} topic={topic} />
      ))
    ) : (
      <div className="col-span-2 mx-auto py-40px text-text-neutral-tertiary">
        <p>{topicEmptyHint}</p>
      </div>
    );

  const isShowSeeMore =
    topics.length > 3 ? (
      // ToDo: (20240626 - Julian) link
      <Link
        id="see-more-link"
        href={`${NATIVE_ROUTE.DISCOVER}/see-more?category=${category}`}
        className="text-base font-semibold text-link-text-primary"
      >
        {t('DISCOVER.SEE_MORE')}
      </Link>
    ) : null;

  return (
    <div className="relative flex flex-col gap-y-20px">
      {/* Info: (20240626 - Julian) For anchor link */}
      <div id={category} className="absolute -top-80px"></div>
      {/* Info: (20240626 - Julian) Topic title */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-text-neutral-secondary">{t(category)}</h2>
        {isShowSeeMore}
      </div>
      <div className="grid flex-1 grid-cols-1 items-center gap-20px md:grid-cols-2 md:gap-40px">
        {displayTopics}
      </div>
    </div>
  );
};

export default TopicSection;
