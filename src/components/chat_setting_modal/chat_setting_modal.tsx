import React, { useState } from 'react';
import Image from 'next/image';
import useOuterClick from '@/lib/hooks/use_outer_click';
import { timestampToString } from '@/lib/utils/common';
import Toggle from '@/components/toggle/toggle';
import { Button } from '@/components/button/button';
import { useGlobalCtx } from '@/contexts/global_context';
import { MessageType } from '@/interfaces/message_modal';

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

  const normalSettingClickHandler = () => setCurrentTab(ChatSettingTab.NORMAL_SETTING);
  const subscriptionClickHandler = () => setCurrentTab(ChatSettingTab.SUBSCRIPTION);

  const themeClickHandler = () => setThemeVisible(!isThemeVisible);
  const systemThemeClickHandler = () => setCurrentTheme(ChatTheme.SYSTEM);
  const lightThemeClickHandler = () => setCurrentTheme(ChatTheme.LIGHT);
  const darkThemeClickHandler = () => setCurrentTheme(ChatTheme.DARK);

  const privateChatToggleHandler = () => setIsPrivateChat(!isPrivateChat);
  const autoRenewalToggleHandler = () => setIsAutoRenewal(!isAutoRenewal);

  const deleteAllChatHandler = () => {
    messageModalDataHandler({
      messageType: MessageType.WARNING,
      title: 'Delete All Chat',
      normalMsg: 'Are you sure you want to delete all Chat?',
      redMsg: 'This action cannot be undone.',
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
      normalMsg: 'Are you sure you want to cancel your subscription?',
      redMsg: 'Once confirmed, the cancellation will take effect on the next billing date.',
      backBtnStr: 'Cancel',
      submitBtnStr: 'Confirm',
      submitBtnFunction: () => {}, // ToDo: (20240625 - Julian) add cancel subscription function
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
          // ToDo: (20240625 - Julian) confirm step needed
        />
      </div>
      {/* Info: (20240625 - Julian) Cancel Subscription */}
      <div className="flex items-center justify-between">
        <p className="font-bold">Cancel Subscription</p>

        <Button
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
      <div className="flex h-250px items-center justify-center rounded-sm border">
        Subscription plan introduction card
      </div>
    </div>
  );

  const overview = isNormalSettingSelected ? normalSettingTab : subscriptionTab;

  const isDisplayModal = isModalVisible ? (
    <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/50">
      <div className="relative flex w-90vw flex-col rounded-sm bg-white py-20px font-barlow">
        {/* Info: (20240625 - Julian) Header */}
        <div className="flex px-40px text-32px font-bold text-text-neutral-primary">
          <h1>Setting</h1>
          <button
            type="button"
            onClick={modalVisibilityHandler}
            className="absolute right-12px top-12px text-lightGray5"
          >
            <Image src="/icons/cross.svg" width={20} height={20} alt="cross_icon" />
          </button>
        </div>

        <hr className="my-20px bg-divider-stroke-lv-4" />

        {/* Info: (20240625 - Julian) Content */}
        <div className="flex h-350px w-full gap-x-60px p-20px font-medium text-button-text-secondary">
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
    </div>
  ) : null;

  return isDisplayModal;
};

export default ChatSettingModal;
