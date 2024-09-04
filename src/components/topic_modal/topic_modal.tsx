import { useState } from 'react';
import Image from 'next/image';
import { ITopic } from '@/interfaces/topic';
import SortToggle from '@/components/sort_toggle/sort_toggle';
// eslint-disable-next-line import/no-cycle
import CommentItem from '@/components/comment_item/comment_item';
import { SortOptions } from '@/constants/display';

interface ITopicModalProps {
  isModalVisible: boolean;
  modalVisibilityHandler: () => void;
  topicData: ITopic;
}

const TopicModal = ({ isModalVisible, modalVisibilityHandler, topicData }: ITopicModalProps) => {
  const { title, summary, mainQuestion, bestAnswers, comments, isFavorite } = topicData;

  const [commentSort, setCommentSort] = useState(SortOptions.NEWEST);
  const [commentInput, setCommentInput] = useState('');
  const [countOfShowComments, setCountOfShowComments] = useState(3);

  const commentSortSwitchHandler = () => {
    setCommentSort((prevSort) => {
      return prevSort === SortOptions.NEWEST ? SortOptions.OLDEST : SortOptions.NEWEST;
    });
  };

  const commentInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentInput(event.target.value);
  };

  const seeMoreClickHandler = () => {
    // Info: (20240627 - Julian) Show 3 more comments
    setCountOfShowComments((prevCount) => prevCount + 3);
  };

  const displayComments =
    comments.length > 0 ? (
      comments
        .slice(0, countOfShowComments)
        .sort((a, b) => {
          if (commentSort === SortOptions.NEWEST) return a.createTimestamp - b.createTimestamp;
          else return b.createTimestamp - a.createTimestamp;
        })
        .map((comment) => <CommentItem key={comment.id} commentData={comment} />)
    ) : (
      <div className="mx-auto p-20px text-text-neutral-primary">
        <p>No comments yet.</p>
      </div>
    );

  const isDisplaySeeMoreButton =
    comments.length > countOfShowComments ? (
      <button
        type="button"
        className="ml-auto text-sm font-semibold text-link-text-primary"
        onClick={seeMoreClickHandler}
      >
        See More....
      </button>
    ) : null;

  const isDisplayModal = isModalVisible ? (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 font-barlow">
      <div
        className={`relative flex h-fit w-90vw flex-col rounded-xs bg-surface-neutral-surface-lv2 p-20px md:w-600px`}
      >
        {/* Info: (20240627 - Julian) close button */}
        <div className="ml-auto">
          <button type="button" onClick={modalVisibilityHandler}>
            <Image src="/icons/cross.svg" width={32} height={32} alt="cross_icon" />
          </button>
        </div>
        {/* Info: (20240627 - Julian) header */}
        <div className="flex flex-col items-center gap-20px px-60px">
          <div className="flex items-center gap-16px">
            <h1 className="text-32px font-bold text-text-neutral-primary">{title}</h1>
            {/* Info: (20240627 - Julian) Favorite Button */}
            <button
              id="favorite-button"
              type="button"
              className={`rounded-xs border p-10px ${isFavorite ? 'border-transparent bg-button-surface-strong-primary text-button-text-primary-solid' : 'border-button-stroke-primary text-button-text-primary'}`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="fill-current"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.53601 1.10986C7.83094 0.96924 8.17357 0.96924 8.4685 1.10986C8.72674 1.23299 8.86705 1.44575 8.93424 1.55548C9.00395 1.66935 9.07498 1.81333 9.14198 1.94915C9.14568 1.95664 9.14936 1.96411 9.15303 1.97154L10.5605 4.82283L13.7087 5.28299L13.7334 5.2866C13.8832 5.30845 14.042 5.33163 14.1718 5.36284C14.2969 5.39292 14.5425 5.4608 14.7392 5.66844C14.9639 5.9056 15.0696 6.23147 15.0268 6.55534C14.9893 6.83891 14.8303 7.03798 14.7467 7.13575C14.6599 7.23718 14.5449 7.34915 14.4364 7.45476L14.4185 7.47216L12.1415 9.69L12.6788 12.8226C12.6802 12.8308 12.6816 12.839 12.683 12.8472C12.7086 12.9965 12.7358 13.1548 12.7464 13.2879C12.7565 13.4162 12.7681 13.6708 12.6315 13.9223C12.4755 14.2094 12.1983 14.4108 11.877 14.4704C11.5956 14.5225 11.357 14.4328 11.2382 14.3835C11.1148 14.3323 10.9727 14.2576 10.8387 14.187C10.8313 14.1831 10.8239 14.1792 10.8166 14.1754L8.00226 12.6954L5.18795 14.1754L5.16584 14.187C5.03178 14.2576 4.88967 14.3323 4.76633 14.3835C4.64748 14.4328 4.40887 14.5225 4.12752 14.4704C3.80623 14.4108 3.52898 14.2094 3.37301 13.9223C3.23644 13.6708 3.248 13.4162 3.25816 13.2879C3.2687 13.1548 3.29588 12.9965 3.32153 12.8472C3.32294 12.839 3.32435 12.8308 3.32575 12.8226L3.86303 9.69L1.58598 7.47216C1.58005 7.46638 1.57408 7.46057 1.5681 7.45475C1.45963 7.34914 1.34462 7.23718 1.25784 7.13575C1.17419 7.03798 1.01516 6.83891 0.977717 6.55534C0.934946 6.23147 1.04061 5.9056 1.26529 5.66844C1.462 5.4608 1.70759 5.39292 1.83269 5.36284C1.96248 5.33163 2.12131 5.30845 2.27111 5.2866C2.27937 5.28539 2.2876 5.28419 2.2958 5.28299L5.44406 4.82283L6.85148 1.97154C6.85515 1.96411 6.85883 1.95664 6.86253 1.94915C6.92953 1.81333 7.00056 1.66935 7.07027 1.55548C7.13745 1.44575 7.27777 1.23299 7.53601 1.10986ZM8.00225 3.02908L6.73876 5.58879C6.73643 5.59351 6.73368 5.59922 6.73051 5.60581C6.69951 5.67023 6.62817 5.81848 6.51448 5.94085C6.4191 6.04351 6.3047 6.12669 6.17764 6.18578C6.02618 6.25621 5.86316 6.27837 5.79232 6.288C5.78507 6.28898 5.77879 6.28984 5.77359 6.2906L2.9469 6.70376L4.99127 8.69498C4.99504 8.69865 4.99963 8.70304 5.00493 8.70809C5.05671 8.75753 5.17589 8.87129 5.25726 9.01743C5.32552 9.14003 5.36931 9.27472 5.3862 9.41402C5.40634 9.58006 5.37685 9.74217 5.36404 9.81261C5.36273 9.81981 5.3616 9.82605 5.36071 9.83124L4.87839 12.6434L7.40493 11.3147C7.40959 11.3123 7.41517 11.3093 7.42162 11.3058C7.48463 11.2718 7.62966 11.1937 7.79377 11.1615C7.93145 11.1345 8.07306 11.1345 8.21074 11.1615C8.37485 11.1937 8.51988 11.2718 8.58289 11.3058C8.58934 11.3093 8.59492 11.3123 8.59958 11.3147L11.1261 12.6434L10.6438 9.83124C10.6429 9.82605 10.6418 9.81981 10.6405 9.8126C10.6277 9.74216 10.5982 9.58006 10.6183 9.41402C10.6352 9.27472 10.679 9.14003 10.7473 9.01743C10.8286 8.87129 10.9478 8.75752 10.9996 8.70809C11.0049 8.70304 11.0095 8.69865 11.0132 8.69498L13.0576 6.70376L10.2309 6.2906C10.2257 6.28984 10.2194 6.28898 10.2122 6.288C10.1413 6.27837 9.97833 6.25621 9.82687 6.18578C9.69981 6.12669 9.58541 6.04351 9.49003 5.94085C9.37634 5.81848 9.305 5.67023 9.274 5.60581C9.27083 5.59922 9.26808 5.59351 9.26575 5.58879L8.00225 3.02908Z"
                />
              </svg>
            </button>
          </div>
          <p className="text-xs font-medium text-text-neutral-secondary">{summary}</p>
        </div>
        {/* Info: (20240627 - Julian) content */}
        <div className="my-40px flex max-h-450px flex-col gap-40px overflow-y-auto">
          {/* Info: (20240627 - Julian) Q & A */}
          <div className="flex flex-col gap-20px px-20px">
            {/* Info: (20240627 - Julian) Main Question */}
            <div className="flex flex-col gap-20px">
              <h3 className="text-xl font-bold text-text-neutral-secondary">Main Question</h3>
              <div className="rounded-xl bg-surface-brand-secondary-soft px-40px py-12px text-base font-semibold text-text-neutral-primary">
                {mainQuestion}
              </div>
            </div>
            {/* Info: (20240627 - Julian) Best Answers */}
            <div className="flex flex-col">
              <h3 className="text-xl font-bold text-text-neutral-secondary">Best Answers</h3>
              <div className="mt-20px rounded-xl bg-surface-brand-primary-soft px-40px py-12px text-base font-semibold text-text-neutral-primary">
                {bestAnswers.answer}
              </div>
              {/* Info: (20240627 - Julian) Tools& Like and Dislike */}
              <div className="ml-auto mt-8px flex items-center gap-16px">
                {/* Info: (20240627 - Julian) Audio Button */}
                <button
                  id="answer-audio-button"
                  type="button"
                  className="text-icon-surface-single-color-primary hover:text-icon-surface-accent"
                  // ToDo: (20240627 - Julian) Add onClick event
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="fill-current"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.41907 4.31223L5.92326 6.80804C5.91358 6.81773 5.90374 6.82761 5.89374 6.83765C5.78094 6.95097 5.64746 7.08507 5.48452 7.18492C5.34285 7.27173 5.18841 7.3357 5.02685 7.37449C4.84102 7.4191 4.65182 7.41867 4.49193 7.4183C4.47776 7.41827 4.46381 7.41824 4.45012 7.41824H3.0024C2.75667 7.41824 2.61748 7.41882 2.51615 7.4271C2.48416 7.42971 2.46403 7.43263 2.4528 7.43461C2.44619 7.43951 2.44034 7.44536 2.43544 7.45197C2.43346 7.4632 2.43055 7.48333 2.42793 7.51531C2.41965 7.61665 2.41907 7.75584 2.41907 8.00157V12.0016C2.41907 12.2473 2.41965 12.3865 2.42793 12.4878C2.43055 12.5198 2.43346 12.5399 2.43544 12.5512C2.44034 12.5578 2.44619 12.5636 2.4528 12.5685C2.46403 12.5705 2.48416 12.5734 2.51615 12.576C2.61748 12.5843 2.75667 12.5849 3.0024 12.5849H4.45012C4.46381 12.5849 4.47776 12.5849 4.49193 12.5848C4.65182 12.5845 4.84102 12.584 5.02685 12.6287C5.18841 12.6674 5.34285 12.7314 5.48452 12.8182C5.64746 12.9181 5.78094 13.0522 5.89374 13.1655C5.90374 13.1755 5.91358 13.1854 5.92326 13.1951L8.41907 15.6909V4.31223ZM8.66087 2.34442C9.03317 2.31512 9.397 2.46583 9.63954 2.7498C9.85396 3.00086 9.88973 3.30503 9.90366 3.46228C9.91913 3.63678 9.9191 3.85483 9.91907 4.082L9.91907 4.11105V15.8921L9.91907 15.9211C9.9191 16.1483 9.91913 16.3664 9.90366 16.5409C9.88973 16.6981 9.85396 17.0023 9.63954 17.2533C9.397 17.5373 9.03317 17.688 8.66087 17.6587C8.33173 17.6328 8.09136 17.443 7.97031 17.3417C7.83598 17.2292 7.6818 17.075 7.52117 16.9143L7.50067 16.8938L4.8626 14.2558C4.78592 14.1791 4.74571 14.1391 4.71472 14.1108C4.70552 14.1024 4.69954 14.0973 4.69621 14.0946C4.69159 14.0921 4.68674 14.0901 4.68174 14.0886C4.67744 14.0882 4.6696 14.0876 4.65715 14.087C4.61524 14.0851 4.55856 14.0849 4.45012 14.0849H3.0024L2.97759 14.0849C2.76566 14.0849 2.56396 14.0849 2.394 14.0711C2.20866 14.0559 1.99607 14.0206 1.78359 13.9123C1.48566 13.7605 1.24344 13.5183 1.09164 13.2204C0.983379 13.0079 0.948058 12.7953 0.932915 12.61C0.919028 12.44 0.919048 12.2383 0.919069 12.0264L0.919071 12.0016V8.00157L0.919069 7.97677C0.919048 7.76484 0.919028 7.56313 0.932915 7.39317C0.948058 7.20782 0.983379 6.99523 1.09164 6.78275C1.24344 6.48483 1.48566 6.24261 1.78359 6.09081C1.99607 5.98255 2.20866 5.94723 2.394 5.93208C2.56397 5.9182 2.76567 5.91822 2.97761 5.91824C2.98586 5.91824 2.99412 5.91824 3.0024 5.91824H4.45012C4.55856 5.91824 4.61524 5.91806 4.65715 5.91614C4.6696 5.91557 4.67744 5.91496 4.68174 5.91455C4.68674 5.91301 4.69159 5.911 4.69621 5.90856C4.69954 5.9058 4.70552 5.90069 4.71472 5.8923C4.74571 5.86402 4.78592 5.82406 4.8626 5.74738L7.50067 3.10931C7.50752 3.10246 7.51437 3.09561 7.5212 3.08878C7.68182 2.92812 7.83599 2.77392 7.97031 2.66146C8.09136 2.56012 8.33173 2.37033 8.66087 2.34442ZM16.021 3.55941C16.3573 3.31752 16.8259 3.39401 17.0678 3.73026C18.3377 5.49547 19.0857 7.66227 19.0857 10.0016C19.0857 12.3409 18.3377 14.5077 17.0678 16.2729C16.8259 16.6091 16.3573 16.6856 16.021 16.4437C15.6848 16.2018 15.6083 15.7332 15.8502 15.3969C16.9425 13.8784 17.5857 12.0162 17.5857 10.0016C17.5857 7.98693 16.9425 6.12473 15.8502 4.60621C15.6083 4.26997 15.6848 3.80129 16.021 3.55941ZM12.6944 6.0531C13.0342 5.81613 13.5017 5.89943 13.7386 6.23916C14.4826 7.30581 14.9191 8.60385 14.9191 10.0016C14.9191 11.3993 14.4826 12.6973 13.7386 13.764C13.5017 14.1037 13.0342 14.187 12.6944 13.95C12.3547 13.7131 12.2714 13.2456 12.5084 12.9058C13.0825 12.0828 13.4191 11.0826 13.4191 10.0016C13.4191 8.92055 13.0825 7.92039 12.5084 7.09731C12.2714 6.75758 12.3547 6.29007 12.6944 6.0531Z"
                    />
                  </svg>
                </button>
                {/* Info: (20240627 - Julian) Copy Button */}
                <button
                  id="answer-copy-button"
                  type="button"
                  className="text-icon-surface-single-color-primary hover:text-icon-surface-accent"
                  // ToDo: (20240627 - Julian) Add onClick event
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="fill-current"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.30623 0.917969L9.33574 0.91797H15.6691L15.6986 0.917969C16.1401 0.917957 16.5161 0.917946 16.8248 0.943168C17.1491 0.969664 17.4646 1.02769 17.7662 1.18137C18.2209 1.41307 18.5906 1.78277 18.8223 2.23749C18.976 2.5391 19.034 2.8546 19.0605 3.1789C19.0858 3.48759 19.0858 3.86357 19.0857 4.30512V4.33464V10.668V10.6975C19.0858 11.139 19.0858 11.515 19.0605 11.8237C19.034 12.148 18.976 12.4635 18.8223 12.7651C18.5906 13.2198 18.2209 13.5895 17.7662 13.8212C17.4646 13.9749 17.1491 14.0329 16.8248 14.0594C16.5161 14.0847 16.1401 14.0846 15.6986 14.0846H15.6691H14.0857V15.668V15.6975C14.0857 16.139 14.0858 16.515 14.0605 16.8237C14.034 17.148 13.976 17.4635 13.8223 17.7651C13.5906 18.2198 13.2209 18.5895 12.7662 18.8212C12.4646 18.9749 12.1491 19.0329 11.8248 19.0594C11.5161 19.0847 11.1401 19.0847 10.6986 19.0846H10.6691H4.33574H4.30622C3.86467 19.0847 3.48869 19.0847 3.18 19.0594C2.8557 19.0329 2.5402 18.9749 2.23859 18.8212C1.78387 18.5895 1.41416 18.2198 1.18247 17.7651C1.02879 17.4635 0.970763 17.148 0.944266 16.8237C0.919045 16.515 0.919056 16.139 0.919068 15.6975L0.919069 15.668V9.33464L0.919068 9.30513C0.919056 8.86358 0.919045 8.48759 0.944266 8.1789C0.970763 7.8546 1.02879 7.5391 1.18247 7.23749C1.41416 6.78277 1.78387 6.41306 2.23859 6.18137C2.5402 6.02769 2.8557 5.96966 3.18 5.94317C3.48869 5.91795 3.86468 5.91796 4.30624 5.91797L4.33574 5.91797H5.91907V4.33464L5.91907 4.30514C5.91906 3.86358 5.91904 3.48759 5.94427 3.1789C5.97076 2.8546 6.02879 2.5391 6.18247 2.23749C6.41416 1.78277 6.78387 1.41306 7.23859 1.18137C7.5402 1.02769 7.8557 0.969664 8.18 0.943168C8.48869 0.917946 8.86468 0.917957 9.30623 0.917969ZM6.66907 7.41797H4.33574C3.85665 7.41797 3.54244 7.41855 3.30215 7.43819C3.07061 7.4571 2.97449 7.4899 2.91958 7.51788C2.7471 7.60576 2.60686 7.746 2.51898 7.91848C2.491 7.97339 2.4582 8.06951 2.43928 8.30105C2.41965 8.54134 2.41907 8.85555 2.41907 9.33464V15.668C2.41907 16.1471 2.41965 16.4613 2.43928 16.7016C2.4582 16.9331 2.491 17.0292 2.51898 17.0841C2.60686 17.2566 2.74709 17.3968 2.91958 17.4847C2.97449 17.5127 3.07061 17.5455 3.30215 17.5644C3.54244 17.5841 3.85665 17.5846 4.33574 17.5846H10.6691C11.1482 17.5846 11.4624 17.5841 11.7027 17.5644C11.9342 17.5455 12.0303 17.5127 12.0852 17.4847C12.2577 17.3968 12.3979 17.2566 12.4858 17.0841C12.5138 17.0292 12.5466 16.9331 12.5655 16.7016C12.5852 16.4613 12.5857 16.1471 12.5857 15.668V13.3346V9.33464C12.5857 8.85555 12.5852 8.54134 12.5655 8.30105C12.5466 8.06951 12.5138 7.97339 12.4858 7.91848C12.3979 7.746 12.2577 7.60576 12.0852 7.51788C12.0303 7.4899 11.9342 7.4571 11.7027 7.43819C11.4624 7.41855 11.1482 7.41797 10.6691 7.41797H6.66907ZM14.0857 12.5846V9.33464V9.30512C14.0857 8.86357 14.0858 8.48759 14.0605 8.1789C14.034 7.8546 13.976 7.5391 13.8223 7.23749C13.5906 6.78277 13.2209 6.41306 12.7662 6.18137C12.4646 6.02769 12.1491 5.96966 11.8248 5.94317C11.5161 5.91795 11.1401 5.91796 10.6986 5.91797L10.6691 5.91797H7.41907V4.33464C7.41907 3.85555 7.41965 3.54134 7.43928 3.30105C7.4582 3.06951 7.491 2.97339 7.51898 2.91848C7.60686 2.746 7.7471 2.60576 7.91958 2.51788C7.97449 2.4899 8.07061 2.4571 8.30215 2.43819C8.54244 2.41855 8.85665 2.41797 9.33574 2.41797H15.6691C16.1482 2.41797 16.4624 2.41855 16.7027 2.43819C16.9342 2.4571 17.0303 2.4899 17.0852 2.51788L17.4257 1.84963L17.0852 2.51788C17.2577 2.60576 17.3979 2.746 17.4858 2.91848C17.5138 2.97339 17.5466 3.06951 17.5655 3.30105C17.5852 3.54134 17.5857 3.85555 17.5857 4.33464V10.668C17.5857 11.1471 17.5852 11.4613 17.5655 11.7016C17.5466 11.9331 17.5138 12.0292 17.4858 12.0841C17.3979 12.2566 17.2577 12.3968 17.0852 12.4847C17.0303 12.5127 16.9342 12.5455 16.7027 12.5644C16.4624 12.5841 16.1482 12.5846 15.6691 12.5846H14.0857Z"
                    />
                  </svg>
                </button>
                {/* Info: (20240627 - Julian) Like Button */}
                <button
                  id="answer-like-button"
                  type="button"
                  className="flex items-center gap-4px rounded-full border border-badge-text-primary p-6px text-icon-surface-single-color-primary hover:text-icon-surface-accent"
                  // ToDo: (20240627 - Julian) Add onClick event
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="stroke-current"
                      d="M5.83329 18.3337V9.16699M1.66663 10.8337V16.667C1.66663 17.5875 2.41282 18.3337 3.33329 18.3337H14.5218C15.7558 18.3337 16.8051 17.4334 16.9928 16.2138L17.8902 10.3805C18.1232 8.86607 16.9515 7.50033 15.4193 7.50033H12.5C12.0397 7.50033 11.6666 7.12723 11.6666 6.66699V3.72186C11.6666 2.58699 10.7466 1.66699 9.61176 1.66699C9.34107 1.66699 9.09578 1.8264 8.98584 2.07376L6.05324 8.67211C5.91949 8.97305 5.62106 9.16699 5.29173 9.16699H3.33329C2.41282 9.16699 1.66663 9.91318 1.66663 10.8337Z"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <p className="min-w-20px">{bestAnswers.countOfLikes}</p>
                </button>
                {/* Info: (20240627 - Julian) Dislike Button */}
                <button
                  id="answer-dislike-button"
                  type="button"
                  className="flex items-center gap-4px rounded-full border border-badge-text-primary p-6px text-icon-surface-single-color-primary hover:text-icon-surface-accent"
                  // ToDo: (20240627 - Julian) Add onClick event
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="stroke-current"
                      d="M14.1667 1.66699V10.8337M18.3333 8.16699V4.33366C18.3333 3.40024 18.3333 2.93353 18.1517 2.57701C17.9919 2.2634 17.7369 2.00844 17.4233 1.84865C17.0668 1.66699 16.6001 1.66699 15.6667 1.66699H6.76501C5.54711 1.66699 4.93816 1.66699 4.44632 1.88985C4.01284 2.08627 3.64442 2.40234 3.38437 2.80092C3.08931 3.25315 2.99672 3.85502 2.81153 5.05876L2.37563 7.8921C2.13137 9.47975 2.00925 10.2736 2.24484 10.8913C2.45162 11.4334 2.84054 11.8867 3.34494 12.1735C3.91961 12.5003 4.72278 12.5003 6.32912 12.5003H7C7.46671 12.5003 7.70007 12.5003 7.87833 12.5912C8.03513 12.671 8.16261 12.7985 8.24251 12.9553C8.33334 13.1336 8.33334 13.3669 8.33334 13.8337V16.2788C8.33334 17.4137 9.25333 18.3337 10.3882 18.3337C10.6589 18.3337 10.9042 18.1742 11.0141 17.9269L13.8148 11.6255C13.9421 11.3389 14.0058 11.1956 14.1065 11.0905C14.1955 10.9976 14.3048 10.9266 14.4258 10.883C14.5627 10.8337 14.7195 10.8337 15.0332 10.8337H15.6667C16.6001 10.8337 17.0668 10.8337 17.4233 10.652C17.7369 10.4922 17.9919 10.2372 18.1517 9.92364C18.3333 9.56712 18.3333 9.10041 18.3333 8.16699Z"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <p className="min-w-20px">{bestAnswers.countOfDislikes}</p>
                </button>
              </div>
            </div>
          </div>
          {/* Info: (20240627 - Julian) Comments */}
          <div className="flex flex-col gap-20px px-20px">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-text-neutral-secondary">Comment</h3>
              <SortToggle currentSort={commentSort} clickHandler={commentSortSwitchHandler} />
            </div>
            <div className="flex flex-col gap-20px">
              {displayComments}
              {isDisplaySeeMoreButton}
            </div>
          </div>
        </div>
        {/* Info: (20240627 - Julian) Add Comment Input */}
        <div className="flex flex-col gap-8px px-20px text-sm text-input-text-primary">
          <p className="font-semibold">Add Comment</p>
          <div className="flex items-center rounded-sm border border-input-stroke-input px-12px py-10px font-medium">
            <input
              id="add-comment-input"
              type="type"
              value={commentInput}
              onChange={commentInputChangeHandler}
              placeholder="Say something..."
              className="flex-1 bg-transparent text-text-neutral-primary outline-none placeholder:text-input-text-input-placeholder"
            />
            <button
              id="add-comment-button"
              type="button"
              className="text-icon-surface-single-color-primary hover:text-icon-surface-accent"
              // ToDo: (20240627 - Julian) Add onClick event
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="fill-current"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.77083 2.25098L7.80293 2.25098H16.2029L16.235 2.25098C17.0479 2.25097 17.7035 2.25096 18.2344 2.29434C18.781 2.339 19.2612 2.43336 19.7054 2.6597C20.411 3.01923 20.9847 3.5929 21.3442 4.29851C21.5705 4.74273 21.6649 5.22287 21.7096 5.76951C21.7529 6.30041 21.7529 6.95602 21.7529 7.76885V7.80098V16.201V16.2331C21.7529 17.0459 21.7529 17.7015 21.7096 18.2324C21.6649 18.7791 21.5705 19.2592 21.3442 19.7034C20.9847 20.409 20.411 20.9827 19.7054 21.3423C19.2612 21.5686 18.781 21.663 18.2344 21.7076C17.7035 21.751 17.0479 21.751 16.2351 21.751H16.2029H7.80293H7.77081C6.95798 21.751 6.30237 21.751 5.77146 21.7076C5.22483 21.663 4.74468 21.5686 4.30047 21.3423C3.59486 20.9827 3.02118 20.409 2.66166 19.7034C2.43532 19.2592 2.34096 18.7791 2.29629 18.2324C2.25292 17.7015 2.25292 17.0459 2.25293 16.2331L2.25293 16.201V7.80098L2.25293 7.76887C2.25292 6.95603 2.25292 6.30042 2.29629 5.76951C2.34096 5.22287 2.43532 4.74273 2.66166 4.29851C3.02118 3.5929 3.59486 3.01923 4.30047 2.6597C4.74468 2.43336 5.22483 2.339 5.77146 2.29434C6.30237 2.25096 6.95799 2.25097 7.77083 2.25098ZM5.89361 3.78936C5.43973 3.82644 5.17897 3.89557 4.98145 3.99621C4.55809 4.21193 4.21388 4.55613 3.99817 4.9795C3.89753 5.17702 3.8284 5.43778 3.79131 5.89166C3.75351 6.35429 3.75293 6.94852 3.75293 7.80098V16.201C3.75293 17.0534 3.75351 17.6477 3.79131 18.1103C3.8284 18.5642 3.89753 18.8249 3.99817 19.0225C4.21388 19.4458 4.55809 19.79 4.98145 20.0057C5.17897 20.1064 5.43973 20.1755 5.89361 20.2126C6.35624 20.2504 6.95048 20.251 7.80293 20.251H16.2029C17.0554 20.251 17.6496 20.2504 18.1122 20.2126C18.5661 20.1755 18.8269 20.1064 19.0244 20.0057C19.4478 19.79 19.792 19.4458 20.0077 19.0225C20.1083 18.8249 20.1775 18.5642 20.2145 18.1103C20.2523 17.6477 20.2529 17.0534 20.2529 16.201V7.80098C20.2529 6.94852 20.2523 6.35429 20.2145 5.89166C20.1775 5.43778 20.1083 5.17702 20.0077 4.9795C19.792 4.55613 19.4478 4.21193 19.0244 3.99621C18.8269 3.89557 18.5661 3.82644 18.1122 3.78936C17.6496 3.75156 17.0554 3.75098 16.2029 3.75098H7.80293C6.95048 3.75098 6.35624 3.75156 5.89361 3.78936ZM11.4726 7.47065C11.7655 7.17775 12.2404 7.17775 12.5333 7.47065L16.5333 11.4706C16.8262 11.7635 16.8262 12.2384 16.5333 12.5313C16.2404 12.8242 15.7655 12.8242 15.4726 12.5313L12.7529 9.81164V16.001C12.7529 16.4152 12.4171 16.751 12.0029 16.751C11.5887 16.751 11.2529 16.4152 11.2529 16.001V9.81164L8.53326 12.5313C8.24037 12.8242 7.76549 12.8242 7.4726 12.5313C7.17971 12.2384 7.17971 11.7635 7.4726 11.4706L11.4726 7.47065Z"
                />
              </svg>
            </button>
          </div>
          <p className="text-sm text-text-state-error">
            Attention! Faith prohibits posting comments that harm others.
          </p>
        </div>
      </div>
    </div>
  ) : null;

  return isDisplayModal;
};
export default TopicModal;
