import TopicSection from '@/components/topic_section/topic_section';

const TopicBrowsePageBody = () => {
  return (
    <div className="mx-100px my-180px flex flex-col items-center">
      <h1 className="text-48px font-bold text-text-neutral-primary">Welcome to Discover</h1>
      <p className="mt-20px text-base font-semibold text-text-neutral-tertiary">
        Discover records publicly asked questions by users, allowing you to find answers from
        others' inquiries.
      </p>
      <div className="mt-40px">
        <TopicSection />
      </div>
    </div>
  );
};

export default TopicBrowsePageBody;
