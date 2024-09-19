'use client';

import { useTranslation } from 'react-i18next';

interface ISortToggleProps {
  currentSort: string;
  clickHandler: () => void;
}

const SortToggle = ({ currentSort, clickHandler }: ISortToggleProps) => {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={clickHandler}
      className="flex items-center gap-x-16px text-chat-bubbles-text-note"
    >
      <div className="flex items-center gap-x-8px">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.00244 2.58447C5.20135 2.58447 5.39212 2.66349 5.53277 2.80414L8.03277 5.30414C8.32566 5.59704 8.32566 6.07191 8.03277 6.3648C7.73988 6.6577 7.265 6.6577 6.97211 6.3648L5.75244 5.14513L5.75244 14.8571L6.97211 13.6375C7.265 13.3446 7.73988 13.3446 8.03277 13.6375C8.32566 13.9304 8.32566 14.4052 8.03277 14.6981L5.53277 17.1981C5.39212 17.3388 5.20135 17.4178 5.00244 17.4178C4.80353 17.4178 4.61276 17.3388 4.47211 17.1981L1.97211 14.6981C1.67922 14.4052 1.67922 13.9304 1.97211 13.6375C2.265 13.3446 2.73988 13.3446 3.03277 13.6375L4.25244 14.8571L4.25244 5.14513L3.03277 6.3648C2.73988 6.6577 2.265 6.6577 1.97211 6.3648C1.67922 6.07191 1.67922 5.59704 1.97211 5.30414L4.47211 2.80414C4.61276 2.66349 4.80353 2.58447 5.00244 2.58447ZM10.0858 5.00114C10.0858 4.58693 10.4216 4.25114 10.8358 4.25114H17.5024C17.9167 4.25114 18.2524 4.58693 18.2524 5.00114C18.2524 5.41535 17.9167 5.75114 17.5024 5.75114H10.8358C10.4216 5.75114 10.0858 5.41535 10.0858 5.00114ZM10.0858 8.33447C10.0858 7.92026 10.4216 7.58447 10.8358 7.58447H17.5024C17.9167 7.58447 18.2524 7.92026 18.2524 8.33447C18.2524 8.74869 17.9167 9.08447 17.5024 9.08447H10.8358C10.4216 9.08447 10.0858 8.74869 10.0858 8.33447ZM10.0858 11.6678C10.0858 11.2536 10.4216 10.9178 10.8358 10.9178H17.5024C17.9167 10.9178 18.2524 11.2536 18.2524 11.6678C18.2524 12.082 17.9167 12.4178 17.5024 12.4178H10.8358C10.4216 12.4178 10.0858 12.082 10.0858 11.6678ZM10.0858 15.0011C10.0858 14.5869 10.4216 14.2511 10.8358 14.2511H17.5024C17.9167 14.2511 18.2524 14.5869 18.2524 15.0011C18.2524 15.4154 17.9167 15.7511 17.5024 15.7511H10.8358C10.4216 15.7511 10.0858 15.4154 10.0858 15.0011Z"
            fill="#7F8A9D"
          />
        </svg>
        <p className="w-55px">{t(currentSort)}</p>
      </div>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.63112 2.42182C7.92402 2.12893 8.39889 2.12893 8.69178 2.42182L11.947 5.67702C12.2399 5.96992 12.2399 6.44479 11.947 6.73768C11.6541 7.03058 11.1792 7.03058 10.8863 6.73768L8.16145 4.01281L5.43658 6.73768C5.14369 7.03058 4.66881 7.03058 4.37592 6.73768C4.08303 6.44479 4.08303 5.96992 4.37592 5.67702L7.63112 2.42182ZM4.37592 9.58327C4.66881 9.29038 5.14369 9.29038 5.43658 9.58327L8.16145 12.3081L10.8863 9.58327C11.1792 9.29038 11.6541 9.29038 11.947 9.58327C12.2399 9.87616 12.2399 10.351 11.947 10.6439L8.69178 13.8991C8.39889 14.192 7.92402 14.192 7.63112 13.8991L4.37592 10.6439C4.08303 10.351 4.08303 9.87616 4.37592 9.58327Z"
          fill="#314362"
        />
      </svg>
    </button>
  );
};

export default SortToggle;
