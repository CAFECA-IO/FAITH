import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useOuterClick from '@/lib/hooks/use_outer_click';
import { timestampToString } from '@/lib/utils/common';
import Toggle from '@/components/toggle/toggle';
import { Button } from '@/components/button/button';
/* eslint-disable-next-line import/no-cycle */
import { useGlobalCtx } from '@/contexts/global_context';
import { MessageType } from '@/interfaces/message_modal';
import { ISharedLink, dummySharedLinks } from '@/interfaces/shared_link';
import Pagination from '../pagination/pagination';

interface IChatSettingModalProps {
  isModalVisible: boolean;
  modalVisibilityHandler: () => void;
}

enum ChatSettingTab {
  NORMAL_SETTING = 'normal_setting',
  SUBSCRIPTION = 'subscription',
}

enum ChatTheme {
  SYSTEM = 'System',
  LIGHT = 'Light',
  DARK = 'Dark',
}

const ChatSettingModal = ({ isModalVisible, modalVisibilityHandler }: IChatSettingModalProps) => {
  const { messageModalDataHandler, messageModalVisibilityHandler } = useGlobalCtx();

  const [currentTab, setCurrentTab] = useState(ChatSettingTab.NORMAL_SETTING);
  const [currentTheme, setCurrentTheme] = useState(ChatTheme.SYSTEM);
  const [isPrivateChat, setIsPrivateChat] = useState(false);
  const [isAutoRenewal, setIsAutoRenewal] = useState(true);

  const [isShowSharedLinksModal, setIsShowSharedLinksModal] = useState(false);
  const [currentLinkPage, setCurrentLinkPage] = useState(1);
  const totalLinkPages = Math.ceil(dummySharedLinks.length / 5);

  // ToDo: (20240625 - Julian) replace with actual data
  const hasSubscription = false;
  const subscriptionPlan = 'Beta';
  const monthlyFee = 'NTD 3000';
  const nextPaymentTimestamp = 1719131200;

  const isNormalSettingSelected = currentTab === ChatSettingTab.NORMAL_SETTING;
  const isSubscriptionSelected = currentTab === ChatSettingTab.SUBSCRIPTION;

  const {
    targetRef: themeRef,
    componentVisible: isThemeVisible,
    setComponentVisible: setThemeVisible,
  } = useOuterClick<HTMLDivElement>(false);

  useEffect(() => {
    if (isModalVisible) {
      setCurrentTab(ChatSettingTab.NORMAL_SETTING);
      setIsShowSharedLinksModal(false);
    }
  }, [isModalVisible]);

  const normalSettingClickHandler = () => setCurrentTab(ChatSettingTab.NORMAL_SETTING);
  const subscriptionClickHandler = () => setCurrentTab(ChatSettingTab.SUBSCRIPTION);

  const themeClickHandler = () => setThemeVisible(!isThemeVisible);
  const systemThemeClickHandler = () => setCurrentTheme(ChatTheme.SYSTEM);
  const lightThemeClickHandler = () => setCurrentTheme(ChatTheme.LIGHT);
  const darkThemeClickHandler = () => setCurrentTheme(ChatTheme.DARK);

  const privateChatToggleHandler = () => setIsPrivateChat(!isPrivateChat);
  const autoRenewalToggleHandler = () => setIsAutoRenewal(!isAutoRenewal);
  const showSharedLinkToggleHandler = () => setIsShowSharedLinksModal(!isShowSharedLinksModal);

  const deleteAllChatHandler = () => {
    messageModalDataHandler({
      messageType: MessageType.WARNING,
      title: 'Delete All Chat',
      redMsg: 'Are you sure you want to delete all Chat? This action cannot be undone!',
      backBtnStr: 'Cancel',
      submitBtnStr: 'Confirm',
      submitBtnFunction: () => {}, // ToDo: (20240625 - Julian) add delete all chat function
    });
    messageModalVisibilityHandler();
  };

  const cancelSubscriptionHandler = () => {
    messageModalDataHandler({
      messageType: MessageType.WARNING,
      title: 'Cancel Subscription',
      redMsg: 'Are you sure you want to cancel your subscription?',
      normalMsg: 'Once confirmed, the cancellation will take effect on the next billing date.',
      backBtnStr: 'Cancel',
      submitBtnStr: 'Confirm',
      submitBtnFunction: () => {}, // ToDo: (20240625 - Julian) add cancel subscription function
    });
    messageModalVisibilityHandler();
  };

  const autoRenewalConfirmHandler = () => {
    messageModalDataHandler({
      messageType: MessageType.WARNING,
      title: 'Auto-Renewal',
      normalMsg: 'Are you sure you want to Turn off Auto-Renewal ?',
      backBtnStr: 'Cancel',
      submitBtnStr: 'Confirm',
      submitBtnFunction: autoRenewalToggleHandler,
    });
    messageModalVisibilityHandler();
  };

  const subscriptionHint = `You have selected the ${subscriptionPlan} plan (monthly fee of ${monthlyFee}). Next payment date
    is ${timestampToString(nextPaymentTimestamp).date}.`;

  const themeOptions = (
    <div
      ref={themeRef}
      className={`absolute left-0 top-50px grid w-full grid-cols-1 overflow-hidden rounded-xs px-12px py-10px ${isThemeVisible ? 'grid-rows-1 opacity-100 shadow-dropmenu' : 'grid-rows-0 opacity-0'} bg-input-surface-input-background transition-all duration-300 ease-in-out`}
    >
      <div className="flex flex-col">
        <button
          type="button"
          className="flex w-full items-center justify-between px-12px py-10px text-base hover:bg-dropdown-surface-item-hover"
          onClick={systemThemeClickHandler}
        >
          <p>System</p>
        </button>
        <button
          type="button"
          className="flex w-full items-center justify-between px-12px py-10px text-base hover:bg-dropdown-surface-item-hover"
          onClick={lightThemeClickHandler}
        >
          <p>Light</p>
        </button>
        <button
          type="button"
          className="flex w-full items-center justify-between px-12px py-10px text-base hover:bg-dropdown-surface-item-hover"
          onClick={darkThemeClickHandler}
        >
          <p>Dark</p>
        </button>
      </div>
    </div>
  );

  const normalSettingTab = (
    <div className="flex w-full flex-col gap-y-40px text-xl text-text-neutral-primary">
      {/* Info: (20240625 - Julian) Theme Setting */}
      <div className="flex items-center justify-between">
        <p className="font-bold">Theme</p>
        <button
          type="button"
          className="relative flex w-256px items-center justify-between rounded-xs border border-input-stroke-input px-12px py-10px text-base"
          onClick={themeClickHandler}
        >
          <p className="text-input-text-input-placeholder">{currentTheme}</p>
          <Image src="/icons/chevron_down.svg" width={20} height={20} alt="chevron_down_icon" />

          {themeOptions}
        </button>
      </div>
      {/* Info: (20240703 - Julian) Shared Links */}
      <div className="flex items-center justify-between">
        <p className="font-bold">Shared Links</p>

        <Button
          id="shared-links-manage-button"
          type="button"
          variant="secondaryOutline"
          className="text-base"
          onClick={showSharedLinkToggleHandler}
        >
          Manage
        </Button>
      </div>
      {/* Info: (20240625 - Julian) Private Chat Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-18px">
          <p className="font-bold">Private Chat</p>
          <div className="rounded bg-badge-surface-soft-primary px-4px text-xs text-badge-text-primary-solid">
            Beta
          </div>
        </div>
        <Toggle id="private-chat-toggle" getToggledState={privateChatToggleHandler} />
      </div>
      {/* Info: (20240625 - Julian) Delete All Chat */}
      <div className="flex items-center justify-between">
        <p className="font-bold">Delete All Chat</p>

        <Button
          id="delete-all-chat-button"
          type="button"
          variant="secondaryOutline"
          className="text-base"
          onClick={deleteAllChatHandler}
        >
          Delete All
        </Button>
      </div>
    </div>
  );

  const subscriptionTab = hasSubscription ? (
    <div className="flex w-full flex-col gap-y-40px text-xl text-text-neutral-primary">
      {/* Info: (20240625 - Julian) Your Plan */}
      <div className="flex flex-col gap-y-8px">
        <div className="flex items-center justify-between">
          <p className="font-bold">Your Plan</p>
          <div className="flex items-center gap-8px rounded-full bg-badge-surface-soft-secondary p-10px text-sm text-badge-text-secondary-solid">
            <div className="h-6px w-6px rounded bg-badge-text-secondary-solid"></div>
            <p>{subscriptionPlan}</p>
          </div>
        </div>
        <p className="ml-auto text-sm text-text-neutral-tertiary">{subscriptionHint}</p>
      </div>
      {/* Info: (20240625 - Julian) Auto-Renewal Toggle */}
      <div className="flex items-center justify-between">
        <p className="font-bold">Auto-Renewal</p>
        <Toggle
          id="auto-renewal-toggle"
          toggleStateFromParent={isAutoRenewal}
          getToggledState={autoRenewalToggleHandler}
          // Info: (20240625 - Julian) 只有關閉的時候才會有 confirm modal
          onClick={isAutoRenewal ? autoRenewalConfirmHandler : undefined}
        />
      </div>
      {/* Info: (20240625 - Julian) Cancel Subscription */}
      <div className="flex items-center justify-between">
        <p className="font-bold">Cancel Subscription</p>

        <Button
          id="cancel-subscription-button"
          type="button"
          variant="secondaryOutline"
          className="text-base"
          onClick={cancelSubscriptionHandler}
        >
          Cancel
        </Button>
      </div>
    </div>
  ) : (
    <div className="flex flex-col gap-y-16px">
      <div className="flex items-center gap-x-10px">
        <div className="h-8px w-8px rounded-full bg-surface-support-strong-maple"></div>
        <p className="text-base text-text-neutral-primary">Upgrade Your Faith</p>
      </div>
      {/* Info: (20240625 - Julian) Beta plan introduction card */}
      <div className="relative flex h-350px flex-none flex-col items-center justify-between overflow-hidden rounded-sm p-20px shadow">
        {/* Info: (20240625 - Julian) Background (Beta) */}
        <div className="absolute left-0 top-0">
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="40" cy="40" r="80" fill="#002462" />
          </svg>
          <p className="absolute left-20px top-32px text-32px font-bold text-text-brand-primary-lv2">
            Beta
          </p>
        </div>
        {/* Info: (20240625 - Julian) Background (medal) */}
        <div className="absolute right-0 top-40px">
          <svg
            width="101"
            height="160"
            viewBox="0 0 101 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.2999 102.95L5.64985 130C5.21101 130.76 4.97998 131.622 4.97998 132.5C4.97998 133.378 5.21101 134.24 5.64985 135C6.09038 135.763 6.7247 136.396 7.48858 136.835C8.25247 137.274 9.1188 137.504 9.99985 137.5H27.2999L35.9999 152.5C36.4361 153.256 37.0626 153.884 37.8169 154.323C38.5713 154.761 39.4273 154.995 40.2999 155C41.1809 155.004 42.0472 154.774 42.8111 154.335C43.575 153.896 44.2093 153.263 44.6499 152.5L57.0499 131.05C42.3382 125.923 29.7574 116.034 21.2999 102.95Z"
              fill="#002462"
            />
            <path
              d="M85 52.4L80 42.4L75 52.4C74.6382 53.1185 74.1085 53.7392 73.4556 54.2092C72.8028 54.6793 72.0462 54.9848 71.25 55.1L60.5 56.7L68.3 64.4C68.8787 64.9621 69.3128 65.6558 69.5653 66.422C69.8178 67.1881 69.8812 68.0041 69.75 68.8L67.9 79.6L77.45 74.6C78.1807 74.2386 78.9848 74.0506 79.8 74.0506C80.6152 74.0506 81.4193 74.2386 82.15 74.6L91.7 79.6L90 68.8C89.8688 68.0041 89.9322 67.1881 90.1846 66.422C90.4371 65.6558 90.8713 64.9621 91.45 64.4L99.25 56.7L88.55 55C87.7992 54.8661 87.0889 54.5622 86.4736 54.1115C85.8583 53.6609 85.3542 53.0755 85 52.4Z"
              fill="#002462"
            />
            <path
              d="M140 65C140 53.1331 136.481 41.5328 129.888 31.6658C123.295 21.7989 113.925 14.1085 102.961 9.56726C91.9975 5.026 79.9335 3.8378 68.2946 6.15291C56.6558 8.46802 45.9648 14.1825 37.5736 22.5736C29.1825 30.9648 23.468 41.6558 21.1529 53.2946C18.8378 64.9335 20.026 76.9975 24.5673 87.961C29.1085 98.9246 36.7989 108.295 46.6658 114.888C56.5328 121.481 68.1331 125 80 125C95.913 125 111.174 118.679 122.426 107.426C133.679 96.1742 140 80.913 140 65ZM113.5 56.8L100.35 69.7L103.45 87.9C103.629 88.8374 103.535 89.8063 103.181 90.6923C102.826 91.5783 102.226 92.3443 101.45 92.9C100.606 93.5112 99.5921 93.8433 98.55 93.85C97.7293 93.8459 96.9222 93.6399 96.2 93.25L80 84.6L63.8 93.15C63.0095 93.5369 62.1309 93.7083 61.253 93.6468C60.3751 93.5853 59.5289 93.2932 58.8 92.8C58.0243 92.2443 57.4238 91.4783 57.0694 90.5923C56.715 89.7063 56.6215 88.7374 56.8 87.8L59.9 69.6L46.5 56.8C45.826 56.1511 45.3476 55.326 45.1192 54.4186C44.8909 53.5112 44.9217 52.558 45.2082 51.6673C45.4946 50.7765 46.0253 49.9841 46.7398 49.38C47.4544 48.7759 48.3241 48.3844 49.25 48.25L67.4 45.6L75.5 29.05C75.9095 28.2047 76.5487 27.4917 77.3446 26.9929C78.1405 26.4941 79.0607 26.2295 80 26.2295C80.9393 26.2295 81.8596 26.4941 82.6555 26.9929C83.4513 27.4917 84.0906 28.2047 84.5 29.05L92.6 45.6L110.75 48.25C111.676 48.3844 112.546 48.7759 113.26 49.38C113.975 49.9841 114.505 50.7765 114.792 51.6673C115.078 52.558 115.109 53.5112 114.881 54.4186C114.652 55.326 114.174 56.1511 113.5 56.8Z"
              fill="#002462"
            />
          </svg>
        </div>
        {/* Info: (20240625 - Julian) Content */}
        <div className="flex w-full items-end justify-center gap-x-50px pr-60px">
          <div className="flex flex-col items-center gap-y-10px font-bold">
            <p className="text-2xl text-text-brand-secondary-lv1">
              NTD$ <span className="text-48px text-text-brand-primary-lv2">3,000</span>
            </p>
            <p className="text-4xl text-text-brand-secondary-lv2">Monthly</p>
            <p className="text-xl text-text-brand-secondary-lv1">(30,000/Year)</p>
          </div>
          <ul className="list-disc text-lg font-semibold">
            <li>
              Users : <span className="text-text-support-baby">10</span>
            </li>
            <li>
              Scan Maximum : <span className="text-text-support-baby">Unlimited</span>
            </li>
            <li>
              Upload Space : <span className="text-text-support-baby">100 G</span>
            </li>
            <li>
              Live FinanceReports : <span className="text-text-support-baby">30</span>
            </li>
            <li>Data Dashboard</li>
            <li>Contract Management</li>
            <li>Accounting Service</li>
            <li className="text-text-support-baby">Employee Salary Management</li>
          </ul>
        </div>
        {/* Info: (20240625 - Julian) Get Beta Button */}
        <Link
          // ToDo: (20240625 - Julian) replace with actual link
          href={`/subscription/beta`}
          className="ml-auto w-fit text-lg"
          onClick={modalVisibilityHandler}
        >
          <Button id="get-beta-button" type="button" variant="tertiaryOutline">
            <p>Get Beta</p>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path
                  className="fill-current"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.7699 4.4556C12.2093 4.01626 12.9216 4.01626 13.3609 4.4556L20.1109 11.2056C20.5503 11.6449 20.5503 12.3573 20.1109 12.7966L13.3609 19.5466C12.9216 19.9859 12.2093 19.9859 11.7699 19.5466C11.3306 19.1073 11.3306 18.3949 11.7699 17.9556L17.7244 12.0011L11.7699 6.04659C11.3306 5.60725 11.3306 4.89494 11.7699 4.4556Z"
                  fill="#001840"
                />
                <path
                  className="fill-current"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.56543 12.0011C3.56543 11.3798 4.06911 10.8761 4.69043 10.8761H18.3779C18.9992 10.8761 19.5029 11.3798 19.5029 12.0011C19.5029 12.6224 18.9992 13.1261 18.3779 13.1261H4.69043C4.06911 13.1261 3.56543 12.6224 3.56543 12.0011Z"
                  fill="#001840"
                />
              </g>
            </svg>
          </Button>
        </Link>
      </div>
    </div>
  );

  const displayedSharedLinks = dummySharedLinks
    .slice((currentLinkPage - 1) * 5, currentLinkPage * 5)
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
              <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
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
              <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
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
    ));

  const overview = isNormalSettingSelected ? normalSettingTab : subscriptionTab;

  const isDisplayModal = isModalVisible ? (
    <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/50">
      <div
        id="chat-setting-modal"
        className="relative flex h-auto w-90vw flex-col rounded-sm bg-surface-neutral-surface-lv1 py-20px font-barlow"
      >
        {/* Info: (20240625 - Julian) Header */}
        <div className="flex items-center justify-between pl-40px pr-20px text-32px font-bold text-text-neutral-primary">
          <h1>Setting</h1>
          <button type="button" onClick={modalVisibilityHandler}>
            <Image src="/icons/cross.svg" width={32} height={32} alt="cross_icon" />
          </button>
        </div>

        <hr className="my-20px bg-divider-stroke-lv-4" />

        {/* Info: (20240625 - Julian) Content */}
        <div className="flex min-h-350px w-full gap-x-60px p-20px font-medium text-button-text-secondary">
          {/* Info: (20240625 - Julian) Sidebar */}
          <div className="flex flex-col items-start gap-20px">
            {/* Info: (20240625 - Julian) Normal Setting */}
            <button
              id="normal-setting-tab"
              type="button"
              className={`flex w-full items-center gap-20px whitespace-nowrap rounded-xs px-20px py-10px ${isNormalSettingSelected ? 'bg-surface-brand-primary-10' : ''}`}
              onClick={normalSettingClickHandler}
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
                  d="M14.5858 3.25098C13.3892 3.25098 12.4191 4.22103 12.4191 5.41764C12.4191 6.61426 13.3892 7.58431 14.5858 7.58431C15.7824 7.58431 16.7524 6.61426 16.7524 5.41764C16.7524 4.22103 15.7824 3.25098 14.5858 3.25098ZM12.2582 2.58431C12.8913 2.06361 13.7021 1.75098 14.5858 1.75098C16.6108 1.75098 18.2524 3.3926 18.2524 5.41764C18.2524 7.44269 16.6108 9.08431 14.5858 9.08431C13.7021 9.08431 12.8914 8.77168 12.2582 8.25098H4.58578C3.02097 8.25098 1.75244 6.98245 1.75244 5.41764C1.75244 3.85284 3.02097 2.58431 4.58577 2.58431H12.2582ZM11.1691 4.08431H4.58577C3.8494 4.08431 3.25244 4.68126 3.25244 5.41764C3.25244 6.15402 3.8494 6.75098 4.58578 6.75098H11.1691C11.0077 6.33773 10.9191 5.88803 10.9191 5.41764C10.9191 4.94725 11.0077 4.49755 11.1691 4.08431ZM1.75244 14.5843C1.75244 12.5593 3.39406 10.9176 5.41911 10.9176C6.30283 10.9176 7.11353 11.2303 7.74665 11.751H15.4191C16.9839 11.751 18.2524 13.0195 18.2524 14.5843C18.2524 16.1491 16.9839 17.4176 15.4191 17.4176H7.74665C7.11353 17.9383 6.30283 18.251 5.41911 18.251C3.39406 18.251 1.75244 16.6094 1.75244 14.5843ZM8.83581 15.9176H15.4191C16.1555 15.9176 16.7524 15.3207 16.7524 14.5843C16.7524 13.8479 16.1555 13.251 15.4191 13.251H8.83581C8.9972 13.6642 9.08577 14.1139 9.08577 14.5843C9.08577 15.0547 8.9972 15.5044 8.83581 15.9176ZM5.41911 12.4176C4.22249 12.4176 3.25244 13.3877 3.25244 14.5843C3.25244 15.7809 4.22249 16.751 5.41911 16.751C6.61573 16.751 7.58577 15.7809 7.58577 14.5843C7.58577 13.3877 6.61573 12.4176 5.41911 12.4176Z"
                  fill="#314362"
                />
              </svg>

              <p>Normal Setting</p>
            </button>
            {/* Info: (20240625 - Julian) Subscription */}
            <button
              id="normal-setting-tab"
              type="button"
              className={`flex w-full items-center gap-20px whitespace-nowrap rounded-xs px-20px py-10px ${isSubscriptionSelected ? 'bg-surface-brand-primary-10' : ''}`}
              onClick={subscriptionClickHandler}
            >
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
                  d="M4.30611 2.58447L4.33561 2.58447H15.6689L15.6984 2.58447C16.14 2.58446 16.516 2.58445 16.8247 2.60967C17.149 2.63617 17.4645 2.6942 17.7661 2.84787C18.2208 3.07957 18.5905 3.44927 18.8222 3.904C18.9759 4.20561 19.0339 4.5211 19.0604 4.8454C19.0856 5.15409 19.0856 5.53007 19.0856 5.97162V6.00114V7.08447C19.0856 7.49869 18.7498 7.83447 18.3356 7.83447C17.139 7.83447 16.1689 8.80452 16.1689 10.0011C16.1689 11.1978 17.139 12.1678 18.3356 12.1678C18.7498 12.1678 19.0856 12.5036 19.0856 12.9178V14.0011V14.0307C19.0856 14.4722 19.0856 14.8482 19.0604 15.1569C19.0339 15.4812 18.9759 15.7967 18.8222 16.0983C18.5905 16.553 18.2208 16.9227 17.7661 17.1544C17.4645 17.3081 17.149 17.3661 16.8247 17.3926C16.516 17.4178 16.14 17.4178 15.6985 17.4178H15.6689H4.33561H4.30609C3.86454 17.4178 3.48856 17.4178 3.17988 17.3926C2.85558 17.3661 2.54008 17.3081 2.23847 17.1544C1.78374 16.9227 1.41404 16.553 1.18235 16.0983C1.02867 15.7967 0.970641 15.4812 0.944144 15.1569C0.918923 14.8482 0.918934 14.4722 0.918946 14.0306L0.918946 14.0011V12.9178C0.918946 12.5036 1.25473 12.1678 1.66895 12.1678C2.86556 12.1678 3.83561 11.1978 3.83561 10.0011C3.83561 8.80452 2.86556 7.83447 1.66895 7.83447C1.25473 7.83447 0.918946 7.49869 0.918946 7.08447V6.00114L0.918946 5.97164C0.918934 5.53008 0.918923 5.1541 0.944144 4.8454C0.970641 4.5211 1.02867 4.20561 1.18235 3.904C1.41404 3.44927 1.78374 3.07957 2.23847 2.84787C2.54008 2.6942 2.85558 2.63617 3.17988 2.60967C3.48857 2.58445 3.86455 2.58446 4.30611 2.58447ZM3.30202 4.10469C3.07048 4.12361 2.97436 4.15641 2.91946 4.18438C2.74697 4.27227 2.60674 4.4125 2.51886 4.58498C2.49088 4.63989 2.45808 4.73601 2.43916 4.96755C2.41953 5.20785 2.41895 5.52205 2.41895 6.00114V6.41124C4.08428 6.75739 5.33561 8.23313 5.33561 10.0011C5.33561 11.7691 4.08428 13.2449 2.41895 13.591V14.0011C2.41895 14.4802 2.41953 14.7944 2.43916 15.0347C2.45808 15.2663 2.49088 15.3624 2.51886 15.4173L1.8506 15.7578L2.51886 15.4173C2.60674 15.5898 2.74697 15.73 2.91946 15.8179C2.97436 15.8459 3.07048 15.8787 3.30202 15.8976C3.54232 15.9172 3.85653 15.9178 4.33561 15.9178H15.6689C16.148 15.9178 16.4622 15.9172 16.7025 15.8976C16.9341 15.8787 17.0302 15.8459 17.0851 15.8179C17.2576 15.73 17.3978 15.5898 17.4857 15.4173C17.5137 15.3624 17.5465 15.2663 17.5654 15.0347C17.585 14.7944 17.5856 14.4802 17.5856 14.0011V13.591C15.9203 13.2449 14.6689 11.7691 14.6689 10.0011C14.6689 8.23313 15.9203 6.75739 17.5856 6.41124V6.00114C17.5856 5.52205 17.585 5.20785 17.5654 4.96755C17.5465 4.73601 17.5137 4.63989 17.4857 4.58498L18.154 4.24449L17.4857 4.58498C17.3978 4.4125 17.2576 4.27227 17.0851 4.18438C17.0302 4.15641 16.9341 4.12361 16.7025 4.10469C16.4622 4.08506 16.148 4.08447 15.6689 4.08447H4.33561C3.85653 4.08447 3.54232 4.08506 3.30202 4.10469ZM8.33561 5.08447C8.74983 5.08447 9.08561 5.42026 9.08561 5.83447V6.66781C9.08561 7.08202 8.74983 7.41781 8.33561 7.41781C7.9214 7.41781 7.58561 7.08202 7.58561 6.66781V5.83447C7.58561 5.42026 7.9214 5.08447 8.33561 5.08447ZM8.33561 8.83447C8.74983 8.83447 9.08561 9.17026 9.08561 9.58447V10.4178C9.08561 10.832 8.74983 11.1678 8.33561 11.1678C7.9214 11.1678 7.58561 10.832 7.58561 10.4178V9.58447C7.58561 9.17026 7.9214 8.83447 8.33561 8.83447ZM8.33561 12.5845C8.74983 12.5845 9.08561 12.9203 9.08561 13.3345V14.1678C9.08561 14.582 8.74983 14.9178 8.33561 14.9178C7.9214 14.9178 7.58561 14.582 7.58561 14.1678V13.3345C7.58561 12.9203 7.9214 12.5845 8.33561 12.5845Z"
                  fill="#314362"
                />
              </svg>

              <p>Subscription</p>
            </button>
          </div>
          {/* Info: (20240625 - Julian) Overview */}
          <div className="flex-1 px-20px">{overview}</div>
        </div>
      </div>

      <div
        id="shared-links-manage-modal"
        className={`absolute h-auto w-90vw flex-col rounded-sm ${isShowSharedLinksModal ? 'flex' : 'hidden'} bg-surface-neutral-surface-lv1 py-20px font-barlow`}
      >
        <div className="flex items-center justify-between pl-40px pr-20px text-32px font-bold text-text-neutral-primary">
          <h1>Shared Links</h1>
          <button type="button" onClick={showSharedLinkToggleHandler}>
            <Image src="/icons/cross.svg" width={32} height={32} alt="cross_icon" />
          </button>
        </div>

        <hr className="my-20px bg-divider-stroke-lv-4" />

        {/* Info: (20240625 - Julian) Content */}
        <div className="flex h-350px w-full flex-col items-center px-40px pt-40px">
          <div className="flex-1">
            <table className="w-full flex-1 table-fixed">
              <thead>
                <tr className="border-b border-divider-stroke-lv-3 font-bold text-text-neutral-primary">
                  <th className="py-8px text-left">Name</th>
                  <th>Date Shared</th>
                  <th className="py-8px text-right">Action</th>
                </tr>
              </thead>
              <tbody>{displayedSharedLinks}</tbody>
            </table>
          </div>

          <Pagination
            currentPage={currentLinkPage}
            setCurrentPage={setCurrentLinkPage}
            totalPages={totalLinkPages}
            pagePrefix="linkPage"
          />
        </div>
      </div>
    </div>
  ) : null;

  return isDisplayModal;
};

export default ChatSettingModal;
