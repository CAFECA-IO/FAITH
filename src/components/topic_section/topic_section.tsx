import Image from 'next/image';
import { ITopic } from '@/interfaces/topic';
import { TopicCategory } from '@/constants/topic';
import Link from 'next/link';

interface ITopicBrowsePageBody {
  category: TopicCategory;
  topics: ITopic[];
}

const TopicSection = ({ category, topics }: ITopicBrowsePageBody) => {
  const topicEmptyHint =
    category === TopicCategory.MY_FAVORITES
      ? "You don't have any favorite topics yet."
      : 'No topics found.';

  const displayTopics =
    topics.length > 0 ? (
      topics.slice(0, 2).map((topic) => (
        // Info: (20240626 - Julian) Topic card
        <div className="flex h-180px items-center gap-x-40px rounded-sm border border-transparent bg-surface-neutral-surface-lv2 px-20px py-16px shadow-custom1 hover:border-stroke-brand-primary hover:bg-surface-brand-primary-10">
          <div className="">
            <Image src={topic.imageId} alt="icon" width={64} height={64} />
          </div>
          <div className="flex w-7/10 flex-col gap-y-8px">
            <h3 className="text-2xl font-bold text-text-neutral-primary">{topic.title}</h3>
            <p className="line-clamp-3 h-50px text-xs font-medium text-text-neutral-secondary">
              {topic.content}
            </p>
            <p className="ml-auto text-xs font-semibold text-text-neutral-tertiary">
              Made by {topic.creator}
            </p>
          </div>
        </div>
      ))
    ) : (
      <div className="col-span-2 mx-auto py-40px text-text-neutral-tertiary">
        <p>{topicEmptyHint}</p>
      </div>
    );

  const isShowSeeMore =
    topics.length > 3 ? (
      // ToDo: (20240626 - Julian) link
      <Link href="" className="text-base font-semibold text-link-text-primary">
        See More
      </Link>
    ) : null;

  return (
    <div className="relative flex flex-col gap-y-20px">
      {/* Info: (20240626 - Julian) For anchor link */}
      <div id={category} className="absolute -top-80px"></div>
      {/* Info: (20240626 - Julian) Topic title */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-text-neutral-secondary">{category}</h2>
        {isShowSeeMore}
      </div>
      <div className="grid grid-cols-2 items-center gap-x-40px">{displayTopics}</div>
    </div>
  );
};

export default TopicSection;
