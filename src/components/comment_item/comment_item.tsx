import Image from 'next/image';
// eslint-disable-next-line import/no-cycle
import { useGlobalCtx } from '@/contexts/global_context';

interface ICommentItemProps {
  commentData: {
    id: string;
    userName: string;
    userAvatar: string;
    comment: string;
    countOfLikes: number;
    countOfDislikes: number;
    createTimestamp: number;
  };
}

const CommentItem = ({ commentData }: ICommentItemProps) => {
  const { reportCommentModalVisibilityHandler } = useGlobalCtx();
  const { userName, userAvatar, comment, countOfLikes, countOfDislikes } = commentData;

  return (
    <div className="flex items-center gap-20px">
      {/* Info: (20240905 - Julian) Avatar */}
      <div className="w-45px">
        <Image src={userAvatar} alt="avatar" width={40} height={40} />
      </div>
      {/* Info: (20240627 - Julian) Name & Comment */}
      <div className="flex flex-1 flex-col gap-8px">
        <div className="flex flex-1 flex-col items-start font-semibold">
          <p className="text-sm text-text-neutral-mute">{userName}</p>
          <p className="text-xs text-text-neutral-primary">{comment}</p>
        </div>
        {/* Info: (20240627 - Julian) Like and Dislike & Report */}
        <div className="flex items-center justify-end gap-16px">
          {/* Info: (20240627 - Julian) Like Button */}
          <button
            id={`answer-like-button-${commentData.id}`}
            type="button"
            className="flex items-center rounded-full border border-badge-stroke-primary p-6px text-xs text-icon-surface-single-color-primary hover:text-icon-surface-accent md:gap-4px md:text-base"
            // ToDo: (20240627 - Julian) Add onClick event
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="scale-75 stroke-current md:scale-100"
            >
              <path
                d="M5.83329 18.3337V9.16699M1.66663 10.8337V16.667C1.66663 17.5875 2.41282 18.3337 3.33329 18.3337H14.5218C15.7558 18.3337 16.8051 17.4334 16.9928 16.2138L17.8902 10.3805C18.1232 8.86607 16.9515 7.50033 15.4193 7.50033H12.5C12.0397 7.50033 11.6666 7.12723 11.6666 6.66699V3.72186C11.6666 2.58699 10.7466 1.66699 9.61176 1.66699C9.34107 1.66699 9.09578 1.8264 8.98584 2.07376L6.05324 8.67211C5.91949 8.97305 5.62106 9.16699 5.29173 9.16699H3.33329C2.41282 9.16699 1.66663 9.91318 1.66663 10.8337Z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <p className="min-w-20px">{countOfLikes}</p>
          </button>
          {/* Info: (20240627 - Julian) Dislike Button */}
          <button
            id={`answer-dislike-button-${commentData.id}`}
            type="button"
            className="flex items-center rounded-full border border-badge-stroke-primary p-6px text-xs text-icon-surface-single-color-primary hover:text-icon-surface-accent md:gap-4px md:text-base"
            // ToDo: (20240627 - Julian) Add onClick event
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="scale-75 stroke-current md:scale-100"
            >
              <path
                d="M14.1667 1.66699V10.8337M18.3333 8.16699V4.33366C18.3333 3.40024 18.3333 2.93353 18.1517 2.57701C17.9919 2.2634 17.7369 2.00844 17.4233 1.84865C17.0668 1.66699 16.6001 1.66699 15.6667 1.66699H6.76501C5.54711 1.66699 4.93816 1.66699 4.44632 1.88985C4.01284 2.08627 3.64442 2.40234 3.38437 2.80092C3.08931 3.25315 2.99672 3.85502 2.81153 5.05876L2.37563 7.8921C2.13137 9.47975 2.00925 10.2736 2.24484 10.8913C2.45162 11.4334 2.84054 11.8867 3.34494 12.1735C3.91961 12.5003 4.72278 12.5003 6.32912 12.5003H7C7.46671 12.5003 7.70007 12.5003 7.87833 12.5912C8.03513 12.671 8.16261 12.7985 8.24251 12.9553C8.33334 13.1336 8.33334 13.3669 8.33334 13.8337V16.2788C8.33334 17.4137 9.25333 18.3337 10.3882 18.3337C10.6589 18.3337 10.9042 18.1742 11.0141 17.9269L13.8148 11.6255C13.9421 11.3389 14.0058 11.1956 14.1065 11.0905C14.1955 10.9976 14.3048 10.9266 14.4258 10.883C14.5627 10.8337 14.7195 10.8337 15.0332 10.8337H15.6667C16.6001 10.8337 17.0668 10.8337 17.4233 10.652C17.7369 10.4922 17.9919 10.2372 18.1517 9.92364C18.3333 9.56712 18.3333 9.10041 18.3333 8.16699Z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <p className="min-w-20px">{countOfDislikes}</p>
          </button>
          {/* Info: (20240627 - Julian) Report Button */}
          <button
            id={`answer-report-button-${commentData.id}`}
            type="button"
            className="text-icon-surface-single-color-primary hover:text-icon-surface-accent"
            onClick={reportCommentModalVisibilityHandler}
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
                d="M9.9927 2.83161C9.97814 2.8477 9.95325 2.87744 9.91747 2.92795C9.81649 3.07051 9.69428 3.28011 9.49747 3.62005L2.64339 15.4589L1.99432 15.0831L2.64339 15.4589C2.4459 15.8 2.32448 16.0113 2.25083 16.1705C2.22471 16.2269 2.21125 16.2635 2.20451 16.2842C2.20705 16.2901 2.21025 16.2957 2.21406 16.3008C2.23538 16.3054 2.27378 16.312 2.33574 16.3177C2.51042 16.3337 2.75405 16.3345 3.14823 16.3345H16.8564C17.2505 16.3345 17.4942 16.3337 17.6689 16.3177C17.7308 16.312 17.7692 16.3054 17.7905 16.3008C17.7943 16.2957 17.7975 16.2901 17.8001 16.2842C17.7933 16.2635 17.7799 16.2269 17.7538 16.1705C17.6801 16.0112 17.5587 15.8 17.3612 15.4589L10.5071 3.62005C10.3103 3.2801 10.1881 3.07051 10.0871 2.92795C10.0514 2.87744 10.0265 2.8477 10.0119 2.83161C10.0055 2.83087 9.99908 2.83087 9.9927 2.83161ZM9.35899 1.46763C9.76853 1.28553 10.2361 1.28553 10.6456 1.46763C10.9576 1.60637 11.1632 1.85198 11.3112 2.06094C11.4569 2.26665 11.6136 2.53736 11.789 2.84035L11.8053 2.86849L18.6593 14.7073L18.6756 14.7355C18.8517 15.0396 19.009 15.3112 19.1151 15.5406C19.2229 15.7735 19.3339 16.0749 19.2984 16.4153L18.5524 16.3376L19.2984 16.4154C19.2518 16.8619 19.0179 17.2677 18.6547 17.5318C18.3779 17.7331 18.0614 17.788 17.8059 17.8114C17.5542 17.8345 17.2403 17.8345 16.8889 17.8345L16.8564 17.8345H3.14823L3.11567 17.8345C2.76425 17.8345 2.45044 17.8345 2.1987 17.8114C1.94317 17.788 1.62671 17.7331 1.34989 17.5318C0.986735 17.2677 0.752765 16.8619 0.706206 16.4154C0.670715 16.0749 0.781718 15.7735 0.889458 15.5406C0.995601 15.3112 1.15285 15.0396 1.32894 14.7355L1.34526 14.7073L8.19933 2.86849L8.21563 2.84033C8.39101 2.53735 8.54772 2.26665 8.69342 2.06094C8.84143 1.85198 9.04699 1.60637 9.35899 1.46763ZM10.0023 6.75117C10.4165 6.75117 10.7523 7.08695 10.7523 7.50117V10.8345C10.7523 11.2487 10.4165 11.5845 10.0023 11.5845C9.58809 11.5845 9.2523 11.2487 9.2523 10.8345V7.50117C9.2523 7.08695 9.58809 6.75117 10.0023 6.75117ZM9.2523 14.1678C9.2523 13.7536 9.58809 13.4178 10.0023 13.4178H10.0106C10.4248 13.4178 10.7606 13.7536 10.7606 14.1678C10.7606 14.582 10.4248 14.9178 10.0106 14.9178H10.0023C9.58809 14.9178 9.2523 14.582 9.2523 14.1678Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
