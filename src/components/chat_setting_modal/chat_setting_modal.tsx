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
import Pagination from '@/components/pagination/pagination';

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
      <div className="flex flex-col items-start justify-between gap-y-12px md:flex-row md:items-center">
        <p className="font-semibold md:font-bold">Theme</p>
        <button
          type="button"
          className="relative flex w-full items-center justify-between rounded-xs border border-input-stroke-input bg-input-surface-input-background px-12px py-10px text-base md:w-256px"
          onClick={themeClickHandler}
        >
          <p className="text-input-text-input-placeholder">{currentTheme}</p>
          <Image src="/icons/chevron_down.svg" width={20} height={20} alt="chevron_down_icon" />

          {themeOptions}
        </button>
      </div>
      {/* Info: (20240703 - Julian) Shared Links */}
      <div className="flex items-center justify-between">
        <p className="font-semibold md:font-bold">Shared Links</p>
        {/* Info: (20240904 - Julian) Desktop manage button */}
        <Button
          id="shared-links-manage-button-desktop"
          type="button"
          variant="secondaryOutline"
          className="hidden text-base md:block"
          onClick={showSharedLinkToggleHandler}
        >
          Manage
        </Button>
        {/* Info: (20240904 - Julian) Mobile manage button */}
        <Button
          id="shared-links-manage-button-mobile"
          type="button"
          variant="secondaryOutline"
          className="flex h-44px w-44px p-0 text-base md:hidden"
          onClick={showSharedLinkToggleHandler}
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
              d="M14.8888 1.55409C15.872 0.570838 17.4662 0.570839 18.4494 1.55409C19.4327 2.53734 19.4327 4.1315 18.4494 5.11475L10.4805 13.0837C10.4647 13.0995 10.4491 13.1151 10.4337 13.1305C10.1916 13.373 9.98727 13.5777 9.74146 13.7283C9.52523 13.8608 9.2895 13.9584 9.04291 14.0176C8.76257 14.0849 8.47339 14.0847 8.13072 14.0845C8.10888 14.0844 8.08682 14.0844 8.06454 14.0844H6.66908C6.25487 14.0844 5.91908 13.7486 5.91908 13.3344V11.939C5.91908 11.9167 5.91907 11.8946 5.91905 11.8728C5.91878 11.5301 5.91855 11.241 5.98586 10.9606C6.04506 10.714 6.1427 10.4783 6.2752 10.2621C6.42584 10.0162 6.63049 9.81193 6.87298 9.56982C6.88844 9.55438 6.90405 9.5388 6.91981 9.52304L14.8888 1.55409ZM17.3888 2.61475C16.9913 2.21728 16.3469 2.21728 15.9494 2.61475L7.98046 10.5837C7.66697 10.8972 7.60006 10.9709 7.55416 11.0458C7.5039 11.1278 7.46687 11.2173 7.44441 11.3108C7.4239 11.3962 7.41908 11.4956 7.41908 11.939V12.5844H8.06454C8.50788 12.5844 8.60732 12.5796 8.69274 12.5591C8.78628 12.5366 8.87569 12.4996 8.95771 12.4493C9.03261 12.4034 9.10633 12.3365 9.41982 12.023L17.3888 4.05409C17.7862 3.65663 17.7862 3.01221 17.3888 2.61475ZM5.63769 2.58442L5.66911 2.58442H9.16911C9.58332 2.58442 9.91911 2.9202 9.91911 3.33442C9.91911 3.74863 9.58332 4.08442 9.16911 4.08442H5.66911C4.95667 4.08442 4.46744 4.085 4.08818 4.11599C3.71769 4.14626 3.51866 4.20177 3.37462 4.27516C3.04534 4.44294 2.77762 4.71065 2.60984 5.03993C2.53645 5.18397 2.48095 5.383 2.45068 5.7535C2.41969 6.13275 2.41911 6.62198 2.41911 7.33442V14.3344C2.41911 15.0469 2.41969 15.5361 2.45068 15.9153C2.48095 16.2858 2.53645 16.4849 2.60984 16.6289C2.77762 16.9582 3.04534 17.2259 3.37462 17.3937C3.51866 17.4671 3.71769 17.5226 4.08818 17.5528C4.46744 17.5838 4.95666 17.5844 5.66911 17.5844H12.6691C13.3815 17.5844 13.8708 17.5838 14.25 17.5528C14.6205 17.5226 14.8196 17.4671 14.9636 17.3937C15.2929 17.2259 15.5606 16.9582 15.7284 16.6289C15.8018 16.4849 15.8573 16.2858 15.8875 15.9153C15.9185 15.5361 15.9191 15.0469 15.9191 14.3344V10.8344C15.9191 10.4202 16.2549 10.0844 16.6691 10.0844C17.0833 10.0844 17.4191 10.4202 17.4191 10.8344V14.3344V14.3658C17.4191 15.0392 17.4191 15.5899 17.3826 16.0375C17.3447 16.5007 17.264 16.9191 17.0649 17.3099C16.7533 17.9214 16.2561 18.4186 15.6446 18.7302C15.2538 18.9293 14.8354 19.01 14.3722 19.0479C13.9246 19.0844 13.3739 19.0844 12.7005 19.0844H12.6691H5.66911H5.63767C4.9643 19.0844 4.4136 19.0844 3.96604 19.0479C3.50278 19.01 3.08438 18.9293 2.69364 18.7302C2.08211 18.4186 1.58492 17.9214 1.27334 17.3099C1.07424 16.9191 0.993507 16.5007 0.955657 16.0375C0.91909 15.5899 0.919097 15.0392 0.919106 14.3658L0.919106 14.3344V7.33442L0.919106 7.303C0.919097 6.62962 0.91909 6.07891 0.955657 5.63135C0.993507 5.16809 1.07424 4.74969 1.27333 4.35895C1.58492 3.74742 2.08211 3.25024 2.69364 2.93865C3.08438 2.73955 3.50278 2.65882 3.96604 2.62097C4.4136 2.5844 4.96431 2.58441 5.63769 2.58442Z"
              className="fill-current"
            />
          </svg>
        </Button>
      </div>
      {/* Info: (20240625 - Julian) Private Chat Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-18px">
          <p className="font-semibold md:font-bold">Private Chat</p>
          <div className="rounded bg-badge-surface-soft-primary px-4px text-xs text-badge-text-primary-solid">
            Beta
          </div>
        </div>
        <Toggle id="private-chat-toggle" getToggledState={privateChatToggleHandler} />
      </div>
      {/* Info: (20240625 - Julian) Delete All Chat */}
      <div className="flex items-center justify-between">
        <p className="font-semibold md:font-bold">Delete All Chat</p>
        {/* Info: (20240904 - Julian) Desktop delete button */}
        <Button
          id="delete-all-chat-button-desktop"
          type="button"
          variant="secondaryOutline"
          className="hidden text-base md:block"
          onClick={deleteAllChatHandler}
        >
          Delete All
        </Button>
        {/* Info: (20240904 - Julian) Mobile delete button */}
        <Button
          id="delete-all-chat-button-mobile"
          type="button"
          variant="secondaryOutline"
          className="flex h-44px w-44px p-0 text-base md:hidden"
          onClick={deleteAllChatHandler}
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
              d="M9.30627 0.917725L9.33577 0.917726H10.6691L10.6986 0.917725C11.1402 0.917713 11.5162 0.917702 11.8248 0.942924C12.1491 0.96942 12.4646 1.02745 12.7663 1.18113C13.221 1.41282 13.5907 1.78252 13.8224 2.23725C13.9761 2.53886 14.0341 2.85435 14.0606 3.17866C14.0848 3.47473 14.0857 3.8327 14.0858 4.25106H15.8358H17.5024C17.9167 4.25106 18.2524 4.58685 18.2524 5.00106C18.2524 5.41527 17.9167 5.75106 17.5024 5.75106H16.5858V14.3344V14.3658C16.5858 15.0392 16.5858 15.5899 16.5492 16.0375C16.5114 16.5007 16.4306 16.9191 16.2315 17.3099C15.92 17.9214 15.4228 18.4186 14.8112 18.7302C14.4205 18.9293 14.0021 19.01 13.5388 19.0478C13.0913 19.0844 12.5406 19.0844 11.8672 19.0844H11.8358H8.16911H8.13767C7.4643 19.0844 6.9136 19.0844 6.46604 19.0478C6.00278 19.01 5.58438 18.9293 5.19364 18.7302C4.58211 18.4186 4.08493 17.9214 3.77334 17.3099C3.57424 16.9191 3.49351 16.5007 3.45566 16.0375C3.41909 15.5899 3.4191 15.0392 3.41911 14.3658L3.41911 14.3344V5.75106H2.50244C2.08823 5.75106 1.75244 5.41527 1.75244 5.00106C1.75244 4.58685 2.08823 4.25106 2.50244 4.25106H4.16911H5.91911C5.91914 3.8327 5.92012 3.47473 5.94431 3.17866C5.9708 2.85435 6.02883 2.53886 6.18251 2.23725C6.4142 1.78252 6.78391 1.41282 7.23863 1.18113C7.54024 1.02745 7.85574 0.96942 8.18004 0.942924C8.48873 0.917702 8.86471 0.917713 9.30627 0.917725ZM6.66911 5.75106H4.91911V14.3344C4.91911 15.0468 4.91969 15.5361 4.95068 15.9153C4.98095 16.2858 5.03646 16.4848 5.10985 16.6289C5.27762 16.9582 5.54534 17.2259 5.87462 17.3937L5.53413 18.0619L5.87463 17.3937C6.01866 17.467 6.21769 17.5226 6.58819 17.5528C6.96744 17.5838 7.45667 17.5844 8.16911 17.5844H11.8358C12.5482 17.5844 13.0374 17.5838 13.4167 17.5528C13.7872 17.5226 13.9862 17.467 14.1303 17.3937C14.4595 17.2259 14.7273 16.9582 14.895 16.6289C14.9684 16.4848 15.0239 16.2858 15.0542 15.9153C15.0852 15.5361 15.0858 15.0468 15.0858 14.3344V5.75106H13.3358H6.66911ZM12.5858 4.25106H7.41912C7.41924 3.81838 7.42085 3.52688 7.43932 3.3008C7.45824 3.06926 7.49104 2.97314 7.51902 2.91823C7.6069 2.74575 7.74713 2.60552 7.91962 2.51764C7.97453 2.48966 8.07065 2.45686 8.30219 2.43794C8.54248 2.41831 8.85669 2.41773 9.33577 2.41773H10.6691C11.1482 2.41773 11.4624 2.41831 11.7027 2.43794C11.9342 2.45686 12.0304 2.48966 12.0853 2.51764C12.2577 2.60552 12.398 2.74575 12.4859 2.91823C12.5138 2.97314 12.5466 3.06926 12.5656 3.3008C12.584 3.52688 12.5856 3.81838 12.5858 4.25106ZM8.33577 8.83439C8.74999 8.83439 9.08577 9.17018 9.08577 9.58439V13.7511C9.08577 14.1653 8.74999 14.5011 8.33577 14.5011C7.92156 14.5011 7.58577 14.1653 7.58577 13.7511V9.58439C7.58577 9.17018 7.92156 8.83439 8.33577 8.83439ZM11.6691 8.83439C12.0833 8.83439 12.4191 9.17018 12.4191 9.58439V13.7511C12.4191 14.1653 12.0833 14.5011 11.6691 14.5011C11.2549 14.5011 10.9191 14.1653 10.9191 13.7511V9.58439C10.9191 9.17018 11.2549 8.83439 11.6691 8.83439Z"
              className="fill-current"
            />
          </svg>
        </Button>
      </div>
    </div>
  );

  const getBetaBtn = (
    <Link
      // ToDo: (20240625 - Julian) replace with actual link
      href={`/subscription/beta`}
      className="w-fit text-sm md:ml-auto md:text-lg"
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
  );

  const planIntroCardDesktop = (
    <div className="relative hidden h-350px flex-none flex-col items-center justify-between overflow-hidden rounded-sm p-20px shadow md:flex">
      {/* Info: (20240625 - Julian) Background (circle) */}
      <div className="absolute left-0 top-0">
        <Image
          src="/elements/circle_in_corner.svg"
          alt="background_circle"
          width={120}
          height={120}
        />
        <p className="absolute left-20px top-32px text-32px font-bold text-text-brand-primary-lv2">
          Beta
        </p>
      </div>
      {/* Info: (20240625 - Julian) Background (medal) */}
      <div className="absolute right-0 top-40px">
        <Image src="/elements/half_medal.svg" alt="background_medal" width={101} height={160} />
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
      {getBetaBtn}
    </div>
  );

  const planIntroCardMobile = (
    <div className="relative flex w-240px flex-col items-center overflow-hidden rounded-sm p-20px shadow md:hidden">
      {/* Info: (20240904 - Julian) Background (Beta) */}
      <div className="absolute top-0">
        <Image src="/elements/half_circle.svg" alt="background" width={160} height={80} />
      </div>
      <p className="z-10 text-32px font-bold text-text-brand-primary-lv2">Beta</p>
      {/* Info: (20240904 - Julian) Medal icon */}
      <div className="mt-40px">
        <Image src="/elements/medal.svg" alt="medal" width={80} height={80} />
      </div>
      {/* Info: (20240904 - Julian) Content */}
      <div className="mt-20px flex flex-col items-center gap-20px">
        {/* Info: (20240904 - Julian) Fee */}
        <div className="flex flex-col items-center text-text-brand-secondary-lv2">
          <p className="text-xl font-bold">
            NTD$ <span className="text-text-brand-primary-lv2">3,000</span> Monthly
          </p>
          <p className="text-base font-semibold">(30,000/Year)</p>
        </div>
        {/* Info: (20240904 - Julian) Features */}
        <ul className="list-disc text-sm font-semibold text-text-neutral-primary">
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
        {/* Info: (20240904 - Julian) Get Beta Button */}
        {getBetaBtn}
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
    <div className="flex flex-col items-center gap-y-16px md:items-start">
      <div className="flex items-center gap-x-10px">
        <div className="h-8px w-8px rounded-full bg-surface-support-strong-maple"></div>
        <p className="text-base text-text-neutral-primary">Upgrade Your Faith</p>
      </div>
      {/* Info: (20240625 - Julian) Beta plan introduction card */}
      {planIntroCardDesktop}
      {planIntroCardMobile}
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

  const desktopSidebar = (
    <div className="hidden flex-col items-start gap-20px md:flex">
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
            className="fill-current"
          />
        </svg>

        <p>Subscription</p>
      </button>
    </div>
  );

  const mobileSidebar = (
    <div className="flex items-center justify-between gap-10px text-base md:hidden">
      {/* Info: (20240904 - Julian) Normal Setting */}
      <button
        id="normal-setting-tab-mobile"
        type="button"
        className={`flex w-full items-center justify-center gap-8px whitespace-nowrap border-b-2 px-12px py-8px ${isNormalSettingSelected ? 'border-tabs-stroke-active text-tabs-text-active' : 'border-tabs-stroke-default text-tabs-text-default'}`}
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

        <p>Normal</p>
      </button>
      {/* Info: (20240904 - Julian) Subscription */}
      <button
        id="normal-setting-tab-tab-mobile"
        type="button"
        className={`flex w-full items-center justify-center gap-8px whitespace-nowrap border-b-2 px-12px py-8px ${isSubscriptionSelected ? 'border-tabs-stroke-active text-tabs-text-active' : 'border-tabs-stroke-default text-tabs-text-default'}`}
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
            className="fill-current"
          />
        </svg>

        <p>Subscription</p>
      </button>
    </div>
  );

  const isDisplayModal = isModalVisible ? (
    <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/50">
      <div
        id="chat-setting-modal"
        className="relative flex h-auto w-90vw flex-col rounded-sm bg-surface-neutral-main-background py-20px font-barlow md:bg-surface-neutral-surface-lv1"
      >
        {/* Info: (20240625 - Julian) Header */}
        <div className="flex items-center justify-center pl-40px pr-20px text-2xl font-bold text-text-neutral-primary md:justify-between md:text-32px">
          <h1>Setting</h1>
          <button type="button" onClick={modalVisibilityHandler} className="absolute right-5">
            <Image src="/icons/cross.svg" width={32} height={32} alt="cross_icon" />
          </button>
        </div>

        <hr className="my-20px hidden bg-divider-stroke-lv-4 md:block" />

        {/* Info: (20240625 - Julian) Content */}
        <div className="flex w-full flex-col gap-x-60px p-20px font-medium text-button-text-secondary md:min-h-350px md:flex-row">
          {/* Info: (20240625 - Julian) Sidebar */}
          {desktopSidebar}
          {mobileSidebar}
          {/* Info: (20240625 - Julian) Overview */}
          <div className="flex-1 pt-40px md:px-20px md:py-0">{overview}</div>
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
