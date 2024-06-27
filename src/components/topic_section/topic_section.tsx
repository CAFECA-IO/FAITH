import Link from 'next/link';
import { ITopicBrief } from '@/interfaces/topic';
import { TopicCategory } from '@/constants/topic';
import TopicItem from '@/components/topic_item/topic_item';

interface ITopicBrowsePageBody {
  category: TopicCategory;
  topics: ITopicBrief[];
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
        href={`/discover/see-more?category=${category}`}
        className="text-base font-semibold text-link-text-primary"
      >
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
      <div className="grid flex-1 grid-cols-2 items-center gap-40px">{displayTopics}</div>
    </div>
  );
};

export default TopicSection;
