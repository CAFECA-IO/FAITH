import {
  SetStateAction,
  Dispatch,
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  KeyboardEvent,
} from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/button/button';
import { useTranslation } from 'next-i18next';
import { ITranslateFunction } from '@/interfaces/locale';

interface IPaginationProps {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
  pagePrefix?: string;
}

const Pagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
  pagePrefix = 'page',
}: IPaginationProps) => {
  const { t }: { t: ITranslateFunction } = useTranslation('common');
  const [targetPage, setTargetPage] = useState<number>(currentPage);
  const router = useRouter();

  useEffect(() => {
    // Info: (20240419 - Julian) 更新當前頁數到 URL
    const handleUrlChange = () => {
      const url = new URL(window.location.href);
      const pageParam = url.searchParams.get(pagePrefix);
      const page = pageParam ? parseInt(pageParam, 10) : 1;
      if (!Number.isNaN(page) && page !== currentPage) {
        setCurrentPage(page);
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, [currentPage, setCurrentPage, pagePrefix]);

  const updateUrl = useCallback(
    (newPage: number) => {
      const queryKey = pagePrefix;
      const newQuery = { ...router.query, [queryKey]: newPage.toString() };
      router.replace({
        pathname: router.pathname,
        query: newQuery,
      });
    },
    [pagePrefix]
  );

  // Info: (20240419 - Julian) 當 currentPage 改變時，更新目標頁碼和 URL
  useEffect(() => {
    setTargetPage(currentPage);
    updateUrl(currentPage);
  }, [currentPage, setTargetPage, updateUrl]);

  // Info: (20240419 - Julian) 如果位於第一頁，則將第一頁和上一頁的按鈕設為 disabled
  const isFirstPage = currentPage === 1;
  // Info: (20240419 - Julian) 如果位於最後一頁，則將最後一頁和下一頁的按鈕設為 disabled
  const isLastPage = currentPage === totalPages;

  // Info: (20240419 - Julian)  限制輸入的頁數在 1 ~ totalPages 之間
  const handlePageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Math.max(1, parseInt(e.target.value, 10)), totalPages);
    if (!Number.isNaN(value)) {
      setTargetPage(value);
    }
  };

  // Info: (20240419 - Julian) 按下 Enter 鍵後，輸入頁數
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setCurrentPage(targetPage);
    }
  };

  const firstPageHandler = () => setCurrentPage(1);
  const previousPageHandler = () => setCurrentPage((prev) => prev - 1);
  const nextPageHandler = () => setCurrentPage((prev) => prev + 1);
  const lastPageHandler = () => setCurrentPage(totalPages);

  const displayFirstButton = (
    <Button
      type="button"
      onClick={firstPageHandler}
      disabled={isFirstPage}
      variant="secondaryOutline"
      className="h-40px w-40px p-0"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path
            className="fill-current"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.7369 4.08602L5.05348 9.88141C5.0352 9.89234 5.00244 9.92661 5.00244 10.001C5.00244 10.0753 5.03509 10.1095 5.05336 10.1205L14.7369 15.9159C14.7706 15.936 14.7952 15.9392 14.8126 15.9385C14.8324 15.9378 14.858 15.9312 14.8861 15.9129C14.9415 15.8769 15.0024 15.7964 15.0024 15.665V4.33691C15.0024 4.20552 14.9415 4.12509 14.8861 4.08906C14.858 4.07076 14.8324 4.06419 14.8126 4.06344C14.7952 4.06278 14.7706 4.06593 14.7369 4.08602ZM15.568 3.04141C15.9814 3.31046 16.2524 3.78706 16.2524 4.33691V15.665C16.2524 16.2149 15.9814 16.6915 15.568 16.9605C15.1493 17.233 14.5899 17.284 14.0961 16.9891L4.41168 11.1932C3.9566 10.9209 3.75244 10.4408 3.75244 10.001C3.75244 9.56113 3.95648 9.08111 4.41156 8.80883L14.0958 3.01296C14.5896 2.71808 15.1493 2.76892 15.568 3.04141Z"
            fill="#001840"
          />
          <path
            className="fill-current"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.37744 2.50098C4.72262 2.50098 5.00244 2.7808 5.00244 3.12598V16.876C5.00244 17.2212 4.72262 17.501 4.37744 17.501C4.03226 17.501 3.75244 17.2212 3.75244 16.876V3.12598C3.75244 2.7808 4.03226 2.50098 4.37744 2.50098Z"
            fill="#001840"
          />
        </g>
      </svg>
    </Button>
  );

  const displayPreviousButton = (
    <Button
      type="button"
      onClick={previousPageHandler}
      disabled={isFirstPage}
      variant="secondaryOutline"
      className="h-40px w-40px p-0"
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
          d="M13.4779 3.71306C13.844 4.07918 13.844 4.67277 13.4779 5.03889L8.51577 10.001L13.4779 14.9631C13.844 15.3292 13.844 15.9228 13.4779 16.2889C13.1117 16.655 12.5181 16.655 12.152 16.2889L6.52703 10.6639C6.16091 10.2978 6.16091 9.70418 6.52703 9.33806L12.152 3.71306C12.5181 3.34695 13.1117 3.34695 13.4779 3.71306Z"
          fill="#001840"
        />
      </svg>
    </Button>
  );

  const displayLastButton = (
    <Button
      type="button"
      onClick={lastPageHandler}
      disabled={isLastPage}
      variant="secondaryOutline"
      className="h-40px w-40px p-0"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path
            className="fill-current"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.43691 3.04141C4.85558 2.76892 5.41499 2.71793 5.90881 3.01281L15.5928 8.80876C16.0479 9.08104 16.2521 9.56113 16.2521 10.001C16.2521 10.4408 16.048 10.9208 15.5929 11.1931L5.90935 16.9888C5.41553 17.2837 4.85558 17.233 4.43691 16.9605C4.02351 16.6915 3.75244 16.2149 3.75244 15.665V4.33691C3.75244 3.78706 4.02351 3.31046 4.43691 3.04141ZM5.11876 4.08906C5.0634 4.12509 5.00244 4.20552 5.00244 4.33691V15.665C5.00244 15.7964 5.0634 15.8769 5.11876 15.9129C5.14688 15.9312 5.17245 15.9378 5.19223 15.9385C5.20967 15.9392 5.23427 15.936 5.26795 15.9159L14.9511 10.1205C14.9694 10.1095 15.0021 10.0753 15.0021 10.001C15.0021 9.92661 14.9694 9.89241 14.9511 9.88148L5.26795 4.08602C5.23435 4.066 5.20965 4.06278 5.19223 4.06344C5.17245 4.06419 5.14688 4.07076 5.11876 4.08906Z"
            fill="#001840"
          />
          <path
            className="fill-current"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.6274 2.50098C15.9726 2.50098 16.2524 2.7808 16.2524 3.12598V16.876C16.2524 17.2212 15.9726 17.501 15.6274 17.501C15.2823 17.501 15.0024 17.2212 15.0024 16.876V3.12598C15.0024 2.7808 15.2823 2.50098 15.6274 2.50098Z"
            fill="#001840"
          />
        </g>
      </svg>
    </Button>
  );

  const displayNextButton = (
    <Button
      type="button"
      onClick={nextPageHandler}
      disabled={isLastPage}
      variant="secondaryOutline"
      className="h-40px w-40px p-0"
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
          d="M6.52703 3.71306C6.89315 3.34695 7.48674 3.34695 7.85285 3.71306L13.4779 9.33806C13.844 9.70418 13.844 10.2978 13.4779 10.6639L7.85285 16.2889C7.48674 16.655 6.89315 16.655 6.52703 16.2889C6.16091 15.9228 6.16091 15.3292 6.52703 14.9631L11.4891 10.001L6.52703 5.03889C6.16091 4.67277 6.16091 4.07918 6.52703 3.71306Z"
          fill="#001840"
        />
      </svg>
    </Button>
  );

  const displayPageInput = (
    <input
      name="page"
      type="number"
      placeholder={`${currentPage}`}
      min={1}
      max={totalPages}
      value={targetPage}
      onChange={handlePageChange}
      onKeyDown={handleKeyDown}
      className="h-40px w-40px rounded border border-button-text-secondary bg-transparent text-center text-sm font-semibold outline-none placeholder:text-input-text-input-placeholder disabled:border-input-stroke-input disabled:bg-input-surface-input-disable disabled:text-input-text-disable"
    />
  );

  return (
    <ul className="flex items-start gap-10px">
      {/* Info: (20240419 - Julian) 最前一頁 */}
      <li>{displayFirstButton}</li>
      {/* Info: (20240419 - Julian) 上一頁 */}
      <li>{displayPreviousButton}</li>
      {/* Info: (20240419 - Julian) 手動輸入/顯示當前頁數 */}
      <li className="flex flex-col items-center text-input-text-input-filled">
        {displayPageInput}
        {/* Info: (20240419 - Julian) 顯示總頁數 */}
        <p>
          {t('COMMON.OF')} {totalPages}
        </p>
      </li>
      {/* Info: (20240419 - Julian) 下一頁 */}
      <li>{displayNextButton}</li>
      {/* Info: (20240419 - Julian) 最後一頁 */}
      <li>{displayLastButton}</li>
    </ul>
  );
};

export default Pagination;
