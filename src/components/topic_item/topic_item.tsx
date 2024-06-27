import Image from 'next/image';
import { ITopicBrief, dummyTopicList, defaultTopicData } from '@/interfaces/topic';
import { useGlobalCtx } from '@/contexts/global_context';

interface ITopicItem {
  topic: ITopicBrief;
}

const TopicItem = ({ topic }: ITopicItem) => {
  const { topicModalVisibilityHandler, topicModalDataHandler } = useGlobalCtx();

  // ToDo: (20240627 - Julian) If API call here
  const topicDetailData = dummyTopicList.find((item) => item.id === topic.id) || defaultTopicData;

  const clickHandler = () => {
    topicModalDataHandler(topicDetailData);
    topicModalVisibilityHandler();
  };

  return (
    <button
      type="button"
      onClick={clickHandler}
      className="flex h-180px items-center gap-x-40px rounded-sm border border-transparent bg-surface-neutral-surface-lv2 px-20px py-16px shadow-custom1 hover:border-stroke-brand-primary hover:bg-surface-brand-primary-10"
    >
      <div className="w-70px">
        <Image src={topic.imageId} alt="icon" width={64} height={64} />
      </div>
      <div className="flex flex-1 flex-col items-start gap-y-8px">
        <h3 className="text-2xl font-bold text-text-neutral-primary">{topic.title}</h3>
        <p className="line-clamp-3 h-50px text-left text-xs font-medium text-text-neutral-secondary">
          {topic.summary}
        </p>
        <p className="ml-auto text-xs font-semibold text-text-neutral-tertiary">
          Made by {topic.creator}
        </p>
      </div>
    </button>
  );
};

export default TopicItem;
