'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { timestampToString } from '@/lib/utils/common';
import { ISharedLink, dummySharedLinks } from '@/interfaces/shared_link';
import Pagination from '@/components/pagination/pagination';
import { useTranslation } from 'react-i18next';

interface ISharedLinksModalProps {
  isModalVisible: boolean;
  modalVisibilityHandler: () => void;
}

const LINK_PER_PAGE_DESKTOP = 5;
const LINK_PER_PAGE_MOBILE = 10;

const SharedLinksModal = ({ isModalVisible, modalVisibilityHandler }: ISharedLinksModalProps) => {
  const { t } = useTranslation();
  // ToDo: (20240904 - Julian) Fetch shared links from API
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sharedLinkList, setSharedLinkList] = useState<ISharedLink[]>(dummySharedLinks);
  const [currentLinkPage, setCurrentLinkPage] = useState(1);

  const totalLinkPages = Math.ceil(sharedLinkList.length / LINK_PER_PAGE_DESKTOP);
  const totalLinkPagesMobile = Math.ceil(sharedLinkList.length / LINK_PER_PAGE_MOBILE);

  useEffect(() => {
    if (!isModalVisible) {
      setCurrentLinkPage(1);
    }
  }, [isModalVisible]);

  const displayedSharedLinks =
    dummySharedLinks.length > 0 ? (
      dummySharedLinks
        .slice(
          (currentLinkPage - 1) * LINK_PER_PAGE_DESKTOP,
          currentLinkPage * LINK_PER_PAGE_DESKTOP
        )
        .map((sharedLink: ISharedLink) => (
          <tr key={sharedLink.id}>
            <td className="p-4px text-left text-lg font-semibold text-link-text-primary">
              {sharedLink.name}
            </td>
            <td className="p-4px text-center text-base font-semibold text-text-neutral-primary">
              {timestampToString(sharedLink.sharedTimestamp).date}
            </td>
            <td className="p-4px align-middle text-text-neutral-primary">
              <div className="flex items-center justify-end gap-16px">
                <button
                  id={`${sharedLink.id}-watch-button`}
                  type="button"
                  className="flex items-center gap-x-16px text-icon-surface-single-color-primary hover:text-icon-surface-accent"
                // ToDo: (20240703 - Julian) watch shared link function
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="fill-current"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.55229 5.79027C3.58252 6.59965 2.90266 7.55209 2.55885 8.09649C2.54217 8.12289 2.52941 8.14312 2.51875 8.16031C2.52941 8.17751 2.54217 8.19773 2.55885 8.22414C2.90266 8.76854 3.58252 9.72098 4.55229 10.5304C5.5203 11.3383 6.73197 11.9676 8.16188 11.9676C9.59178 11.9676 10.8035 11.3383 11.7715 10.5304C12.7412 9.72098 13.4211 8.76853 13.7649 8.22414C13.7816 8.19773 13.7943 8.17751 13.805 8.16031C13.7943 8.14312 13.7816 8.12289 13.7649 8.09649C13.4211 7.55209 12.7412 6.59965 11.7715 5.79027C10.8035 4.98235 9.59178 4.35303 8.16188 4.35303C6.73197 4.35303 5.5203 4.98235 4.55229 5.79027ZM3.59115 4.63866C4.72765 3.69012 6.26822 2.85303 8.16188 2.85303C10.0555 2.85303 11.5961 3.69012 12.7326 4.63866C13.8673 5.58573 14.6443 6.67978 15.0332 7.29552C15.0384 7.30379 15.0438 7.31231 15.0494 7.3211C15.1258 7.44118 15.2337 7.61082 15.2879 7.8473C15.3318 8.0389 15.3318 8.28172 15.2879 8.47333C15.2337 8.70981 15.1258 8.87945 15.0494 8.99953C15.0438 9.00831 15.0384 9.01684 15.0332 9.0251C14.6443 9.64085 13.8673 10.7349 12.7326 11.682C11.5961 12.6305 10.0555 13.4676 8.16188 13.4676C6.26822 13.4676 4.72765 12.6305 3.59115 11.682C2.4564 10.7349 1.67947 9.64085 1.2906 9.0251C1.28538 9.01684 1.27995 9.00831 1.27436 8.99952C1.19798 8.87944 1.09007 8.70981 1.03587 8.47333C0.99195 8.28172 0.99195 8.0389 1.03587 7.8473C1.09007 7.61082 1.19798 7.44118 1.27436 7.3211C1.27995 7.31231 1.28538 7.30379 1.2906 7.29552C1.67947 6.67978 2.4564 5.58573 3.59115 4.63866ZM8.16188 6.95719C7.49741 6.95719 6.95875 7.49585 6.95875 8.16031C6.95875 8.82478 7.49741 9.36344 8.16188 9.36344C8.82634 9.36344 9.365 8.82478 9.365 8.16031C9.365 7.49585 8.82634 6.95719 8.16188 6.95719ZM5.45875 8.16031C5.45875 6.66742 6.66898 5.45719 8.16188 5.45719C9.65477 5.45719 10.865 6.66742 10.865 8.16031C10.865 9.65321 9.65477 10.8634 8.16188 10.8634C6.66898 10.8634 5.45875 9.65321 5.45875 8.16031Z"
                    />
                  </svg>
                </button>
                <button
                  id={`${sharedLink.id}-delete-button`}
                  type="button"
                  className="flex items-center gap-x-16px text-icon-surface-single-color-primary hover:text-icon-surface-accent"
                // ToDo: (20240703 - Julian) delete shared link function
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.61274 0.899903L7.64078 0.899904H8.68245L8.71049 0.899903C9.05112 0.899888 9.35076 0.899875 9.59872 0.920135C9.86223 0.941664 10.1327 0.989758 10.3953 1.12357C10.7814 1.32031 11.0954 1.63424 11.2921 2.02036C11.4259 2.28298 11.474 2.55345 11.4955 2.81696C11.5117 3.01488 11.515 3.24573 11.5156 3.50407H12.7189H14.021C14.4352 3.50407 14.771 3.83985 14.771 4.25407C14.771 4.66828 14.4352 5.00407 14.021 5.00407H13.4689V11.5457V11.5761C13.4689 12.0972 13.4689 12.5332 13.4398 12.8896C13.4094 13.2617 13.3436 13.6125 13.1743 13.9448C12.9151 14.4534 12.5016 14.8669 11.993 15.1261C11.6607 15.2954 11.3099 15.3612 10.9378 15.3916C10.5814 15.4207 10.1453 15.4207 9.62419 15.4207H9.5939H6.72932H6.69903C6.1779 15.4207 5.74187 15.4207 5.38544 15.3916C5.01337 15.3612 4.66251 15.2954 4.33026 15.1261C3.82163 14.8669 3.40811 14.4534 3.14895 13.9448C2.97966 13.6125 2.91383 13.2617 2.88343 12.8896C2.85431 12.5332 2.85432 12.0972 2.85433 11.576L2.85433 11.5457V5.00407H2.30225C1.88803 5.00407 1.55225 4.66828 1.55225 4.25407C1.55225 3.83985 1.88803 3.50407 2.30225 3.50407H3.60433H4.80761C4.80825 3.24573 4.81151 3.01488 4.82768 2.81696C4.84921 2.55345 4.8973 2.28298 5.03111 2.02036C5.22785 1.63424 5.54178 1.32031 5.92791 1.12357C6.19052 0.989758 6.461 0.941664 6.7245 0.920135C6.97247 0.899875 7.27211 0.899888 7.61274 0.899903ZM5.55745 5.00407H4.35433V11.5457C4.35433 12.105 4.35491 12.4794 4.37845 12.7675C4.40127 13.0468 4.44187 13.1783 4.48546 13.2638C4.60081 13.4902 4.78486 13.6742 5.01124 13.7896C5.09679 13.8332 5.22828 13.8738 5.50759 13.8966C5.79565 13.9201 6.17002 13.9207 6.72932 13.9207H9.5939C10.1532 13.9207 10.5276 13.9201 10.8156 13.8966C11.0949 13.8738 11.2264 13.8332 11.312 13.7896C11.5384 13.6742 11.7224 13.4902 11.8378 13.2638C11.8814 13.1783 11.922 13.0468 11.9448 12.7675C11.9683 12.4794 11.9689 12.105 11.9689 11.5457V5.00407H10.7658H5.55745ZM10.0155 3.50407H6.30768C6.30839 3.25463 6.31126 3.07917 6.3227 2.9391C6.33665 2.76836 6.35951 2.71726 6.36762 2.70135C6.42055 2.59747 6.50501 2.51301 6.60889 2.46008C6.62481 2.45197 6.67591 2.4291 6.84665 2.41515C7.02615 2.40049 7.26379 2.3999 7.64078 2.3999H8.68245C9.05944 2.3999 9.29708 2.40049 9.47658 2.41515C9.64732 2.4291 9.69842 2.45197 9.71434 2.46008C9.81822 2.51301 9.90267 2.59747 9.9556 2.70135C9.96371 2.71726 9.98658 2.76836 10.0005 2.9391C10.012 3.07917 10.0148 3.25463 10.0155 3.50407ZM6.85953 7.08479C7.27375 7.08479 7.60953 7.42058 7.60953 7.83479V11.09C7.60953 11.5042 7.27375 11.84 6.85953 11.84C6.44532 11.84 6.10953 11.5042 6.10953 11.09V7.83479C6.10953 7.42058 6.44532 7.08479 6.85953 7.08479ZM9.4637 7.08479C9.87791 7.08479 10.2137 7.42058 10.2137 7.83479V11.09C10.2137 11.5042 9.87791 11.84 9.4637 11.84C9.04948 11.84 8.7137 11.5042 8.7137 11.09V7.83479C8.7137 7.42058 9.04948 7.08479 9.4637 7.08479Z"
                    />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        ))
    ) : (
      // Info: (20240904 - Julian) No shared links
      <tr>
        <td colSpan={3} className="text-center">
          {t('SETTING.NO_LINK_DATA')}
        </td>
      </tr>
    );

  const displayedSharedLinksMobile =
    dummySharedLinks.length > 0 ? (
      dummySharedLinks
        .slice((currentLinkPage - 1) * LINK_PER_PAGE_MOBILE, currentLinkPage * LINK_PER_PAGE_MOBILE)
        .map((sharedLink: ISharedLink) => (
          <tr key={sharedLink.id}>
            <td className="flex items-center gap-8px px-4px py-8px text-left">
              <p className="text-sm font-semibold text-link-text-primary">{sharedLink.name}</p>
              <div className="rounded-full bg-badge-surface-soft-primary px-3px py-2px text-xs text-badge-text-primary-solid">
                {timestampToString(sharedLink.sharedTimestamp).date}
              </div>
            </td>
            <td className="p-4px align-middle text-text-neutral-primary">
              <div className="flex items-center justify-end gap-16px">
                <button
                  id={`${sharedLink.id}-watch-button-mobile`}
                  type="button"
                  className="flex items-center gap-x-16px text-icon-surface-single-color-primary hover:text-icon-surface-accent"
                // ToDo: (20240703 - Julian) watch shared link function
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="fill-current"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.55229 5.79027C3.58252 6.59965 2.90266 7.55209 2.55885 8.09649C2.54217 8.12289 2.52941 8.14312 2.51875 8.16031C2.52941 8.17751 2.54217 8.19773 2.55885 8.22414C2.90266 8.76854 3.58252 9.72098 4.55229 10.5304C5.5203 11.3383 6.73197 11.9676 8.16188 11.9676C9.59178 11.9676 10.8035 11.3383 11.7715 10.5304C12.7412 9.72098 13.4211 8.76853 13.7649 8.22414C13.7816 8.19773 13.7943 8.17751 13.805 8.16031C13.7943 8.14312 13.7816 8.12289 13.7649 8.09649C13.4211 7.55209 12.7412 6.59965 11.7715 5.79027C10.8035 4.98235 9.59178 4.35303 8.16188 4.35303C6.73197 4.35303 5.5203 4.98235 4.55229 5.79027ZM3.59115 4.63866C4.72765 3.69012 6.26822 2.85303 8.16188 2.85303C10.0555 2.85303 11.5961 3.69012 12.7326 4.63866C13.8673 5.58573 14.6443 6.67978 15.0332 7.29552C15.0384 7.30379 15.0438 7.31231 15.0494 7.3211C15.1258 7.44118 15.2337 7.61082 15.2879 7.8473C15.3318 8.0389 15.3318 8.28172 15.2879 8.47333C15.2337 8.70981 15.1258 8.87945 15.0494 8.99953C15.0438 9.00831 15.0384 9.01684 15.0332 9.0251C14.6443 9.64085 13.8673 10.7349 12.7326 11.682C11.5961 12.6305 10.0555 13.4676 8.16188 13.4676C6.26822 13.4676 4.72765 12.6305 3.59115 11.682C2.4564 10.7349 1.67947 9.64085 1.2906 9.0251C1.28538 9.01684 1.27995 9.00831 1.27436 8.99952C1.19798 8.87944 1.09007 8.70981 1.03587 8.47333C0.99195 8.28172 0.99195 8.0389 1.03587 7.8473C1.09007 7.61082 1.19798 7.44118 1.27436 7.3211C1.27995 7.31231 1.28538 7.30379 1.2906 7.29552C1.67947 6.67978 2.4564 5.58573 3.59115 4.63866ZM8.16188 6.95719C7.49741 6.95719 6.95875 7.49585 6.95875 8.16031C6.95875 8.82478 7.49741 9.36344 8.16188 9.36344C8.82634 9.36344 9.365 8.82478 9.365 8.16031C9.365 7.49585 8.82634 6.95719 8.16188 6.95719ZM5.45875 8.16031C5.45875 6.66742 6.66898 5.45719 8.16188 5.45719C9.65477 5.45719 10.865 6.66742 10.865 8.16031C10.865 9.65321 9.65477 10.8634 8.16188 10.8634C6.66898 10.8634 5.45875 9.65321 5.45875 8.16031Z"
                    />
                  </svg>
                </button>
                <button
                  id={`${sharedLink.id}-delete-button`}
                  type="button"
                  className="flex items-center gap-x-16px text-icon-surface-single-color-primary hover:text-icon-surface-accent"
                // ToDo: (20240703 - Julian) delete shared link function
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.61274 0.899903L7.64078 0.899904H8.68245L8.71049 0.899903C9.05112 0.899888 9.35076 0.899875 9.59872 0.920135C9.86223 0.941664 10.1327 0.989758 10.3953 1.12357C10.7814 1.32031 11.0954 1.63424 11.2921 2.02036C11.4259 2.28298 11.474 2.55345 11.4955 2.81696C11.5117 3.01488 11.515 3.24573 11.5156 3.50407H12.7189H14.021C14.4352 3.50407 14.771 3.83985 14.771 4.25407C14.771 4.66828 14.4352 5.00407 14.021 5.00407H13.4689V11.5457V11.5761C13.4689 12.0972 13.4689 12.5332 13.4398 12.8896C13.4094 13.2617 13.3436 13.6125 13.1743 13.9448C12.9151 14.4534 12.5016 14.8669 11.993 15.1261C11.6607 15.2954 11.3099 15.3612 10.9378 15.3916C10.5814 15.4207 10.1453 15.4207 9.62419 15.4207H9.5939H6.72932H6.69903C6.1779 15.4207 5.74187 15.4207 5.38544 15.3916C5.01337 15.3612 4.66251 15.2954 4.33026 15.1261C3.82163 14.8669 3.40811 14.4534 3.14895 13.9448C2.97966 13.6125 2.91383 13.2617 2.88343 12.8896C2.85431 12.5332 2.85432 12.0972 2.85433 11.576L2.85433 11.5457V5.00407H2.30225C1.88803 5.00407 1.55225 4.66828 1.55225 4.25407C1.55225 3.83985 1.88803 3.50407 2.30225 3.50407H3.60433H4.80761C4.80825 3.24573 4.81151 3.01488 4.82768 2.81696C4.84921 2.55345 4.8973 2.28298 5.03111 2.02036C5.22785 1.63424 5.54178 1.32031 5.92791 1.12357C6.19052 0.989758 6.461 0.941664 6.7245 0.920135C6.97247 0.899875 7.27211 0.899888 7.61274 0.899903ZM5.55745 5.00407H4.35433V11.5457C4.35433 12.105 4.35491 12.4794 4.37845 12.7675C4.40127 13.0468 4.44187 13.1783 4.48546 13.2638C4.60081 13.4902 4.78486 13.6742 5.01124 13.7896C5.09679 13.8332 5.22828 13.8738 5.50759 13.8966C5.79565 13.9201 6.17002 13.9207 6.72932 13.9207H9.5939C10.1532 13.9207 10.5276 13.9201 10.8156 13.8966C11.0949 13.8738 11.2264 13.8332 11.312 13.7896C11.5384 13.6742 11.7224 13.4902 11.8378 13.2638C11.8814 13.1783 11.922 13.0468 11.9448 12.7675C11.9683 12.4794 11.9689 12.105 11.9689 11.5457V5.00407H10.7658H5.55745ZM10.0155 3.50407H6.30768C6.30839 3.25463 6.31126 3.07917 6.3227 2.9391C6.33665 2.76836 6.35951 2.71726 6.36762 2.70135C6.42055 2.59747 6.50501 2.51301 6.60889 2.46008C6.62481 2.45197 6.67591 2.4291 6.84665 2.41515C7.02615 2.40049 7.26379 2.3999 7.64078 2.3999H8.68245C9.05944 2.3999 9.29708 2.40049 9.47658 2.41515C9.64732 2.4291 9.69842 2.45197 9.71434 2.46008C9.81822 2.51301 9.90267 2.59747 9.9556 2.70135C9.96371 2.71726 9.98658 2.76836 10.0005 2.9391C10.012 3.07917 10.0148 3.25463 10.0155 3.50407ZM6.85953 7.08479C7.27375 7.08479 7.60953 7.42058 7.60953 7.83479V11.09C7.60953 11.5042 7.27375 11.84 6.85953 11.84C6.44532 11.84 6.10953 11.5042 6.10953 11.09V7.83479C6.10953 7.42058 6.44532 7.08479 6.85953 7.08479ZM9.4637 7.08479C9.87791 7.08479 10.2137 7.42058 10.2137 7.83479V11.09C10.2137 11.5042 9.87791 11.84 9.4637 11.84C9.04948 11.84 8.7137 11.5042 8.7137 11.09V7.83479C8.7137 7.42058 9.04948 7.08479 9.4637 7.08479Z"
                    />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        ))
    ) : (
      // Info: (20240904 - Julian) No shared links
      <tr>
        <td colSpan={3} className="text-center">
          {t('SETTING.NO_LINK_DATA')}
        </td>
      </tr>
    );

  const isDisplayModal = isModalVisible ? (
    <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/50">
      <div
        id="shared-links-manage-modal"
        className={`relative h-auto w-90vw flex-col rounded-sm bg-surface-neutral-main-background py-20px font-barlow md:bg-surface-neutral-surface-lv1`}
      >
        <div className="flex items-center justify-center pl-40px pr-20px text-2xl font-bold text-text-neutral-primary md:justify-between md:text-32px">
          <h1>{t('SETTING.SHARED_LINKS')}</h1>
          <button type="button" onClick={modalVisibilityHandler} className="absolute right-20px">
            <Image src="/icons/cross.svg" width={32} height={32} alt="cross_icon" />
          </button>
        </div>

        <hr className="my-20px hidden bg-divider-stroke-lv-4 md:block" />

        {/* Info: (20240625 - Julian) Content */}
        <div className="flex h-500px w-full flex-col items-center px-20px pt-20px md:h-350px md:px-40px">
          <div className="flex-1">
            <table className="w-full flex-1 table-fixed">
              <thead>
                {/* Info: (20240904 - Julian) Desktop Table Header */}
                <tr className="hidden border-b border-divider-stroke-lv-3 font-bold text-text-neutral-primary md:table-row">
                  <th className="py-8px text-left">{t('SETTING.LINK_NAME')}</th>
                  <th>{t('SETTING.LINK_DATE')}</th>
                  <th className="py-8px text-right">{t('SETTING.LINK_ACTION')}</th>
                </tr>
                {/* Info: (20240904 - Julian) Mobile Table Header */}
                <tr className="table-row border-b border-divider-stroke-lv-3 font-bold text-text-neutral-primary md:hidden">
                  <th className="w-4/5 py-8px text-left">{t('SETTING.LINK_NAME_AND_DATE')}</th>
                  <th className="py-8px text-right">{t('SETTING.LINK_ACTION')}</th>
                </tr>
              </thead>
              {/* Info: (20240904 - Julian) Desktop Table Body */}
              <tbody className="hidden md:table-row-group">{displayedSharedLinks}</tbody>
              {/* Info: (20240904 - Julian) Mobile Table Body */}
              <tbody className="table-row-group md:hidden">{displayedSharedLinksMobile}</tbody>
            </table>
          </div>

          {/* Info: (20240904 - Julian) Desktop Pagination */}
          <div className="hidden md:block">
            <Pagination
              currentPage={currentLinkPage}
              setCurrentPage={setCurrentLinkPage}
              totalPages={totalLinkPages}
              pagePrefix="linkPage"
            />
          </div>
          {/* Info: (20240904 - Julian) Mobile Pagination */}
          <div className="block md:hidden">
            <Pagination
              currentPage={currentLinkPage}
              setCurrentPage={setCurrentLinkPage}
              totalPages={totalLinkPagesMobile}
              pagePrefix="linkPage"
            />
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return isDisplayModal;
};

export default SharedLinksModal;
