'use client';

import Image from 'next/image';
import { Button } from '@/components/button/button';
import { IMessageModal, MessageType } from '@/interfaces/message_modal';
import { cn } from '@/lib/utils/common';

interface IMessageModalProps {
  isModalVisible: boolean;
  modalVisibilityHandler: () => void;
  messageModalData: IMessageModal;
}

const MessageModal = ({
  isModalVisible,
  modalVisibilityHandler,
  messageModalData,
}: IMessageModalProps) => {
  const {
    title,
    subtitle,
    normalMsg,
    hideCloseBtn,
    redMsg,
    submitBtnStr,
    submitBtnFunction,
    backBtnStr,
    backBtnFunction,
    messageType,
    submitBtnVariant,
    submitBtnIcon,
  } = messageModalData;

  // Info: (20240514 - Julian) 如果沒有 backBtnFunction，則預設為關閉 modal
  const backBtnClickHandler = backBtnFunction || modalVisibilityHandler;

  // Info: (20240425 - Julian) 執行 submitBtnFunction 後，關閉 modal
  const submitClickHandler = () => {
    submitBtnFunction();
    modalVisibilityHandler();
  };

  const imgStr =
    messageType === MessageType.WARNING
      ? '/icons/warning.svg'
      : messageType === MessageType.SUCCESS
        ? '/icons/success.svg'
        : messageType === MessageType.ERROR
          ? '/icons/error.svg'
          : '/icons/info.svg';

  const imgAlt =
    messageType === MessageType.WARNING
      ? 'warning_icon'
      : messageType === MessageType.SUCCESS
        ? 'success_icon'
        : messageType === MessageType.ERROR
          ? 'error_icon'
          : 'info_icon';

  const borderColor =
    messageType === MessageType.WARNING
      ? 'border-alert-surface-surface-warning'
      : messageType === MessageType.SUCCESS
        ? 'border-alert-surface-surface-success'
        : messageType === MessageType.ERROR
          ? 'border-alert-surface-surface-error'
          : 'border-alert-surface-surface-info';

  const titleColor =
    messageType === MessageType.WARNING
      ? 'text-alert-text-title-warning'
      : messageType === MessageType.SUCCESS
        ? 'text-alert-text-title-success'
        : messageType === MessageType.ERROR
          ? 'text-alert-text-title-error'
          : 'text-alert-text-title-info';

  const isBackBtn = backBtnStr ? (
    <Button
      id="message-modal-back-button"
      className="px-16px py-8px"
      type="button"
      onClick={backBtnClickHandler}
      variant="tertiaryOutline"
    >
      {backBtnStr}
    </Button>
  ) : null;

  // Info: 換行處理 (20240515 - Shirley)
  const displayedSubtitles = subtitle?.split('\n').map((line, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <div key={index}>
      {line}
      {index < subtitle.split('\n').length - 1 && <br />}
    </div>
  ));

  // Info: 換行處理 (20240515 - Shirley)
  const displayedNormalMsg = normalMsg?.split('\n').map((line, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <div key={index} className="-mt-2">
      {line}
      {index < normalMsg.split('\n').length - 1}
    </div>
  ));

  const isDisplayCross = !hideCloseBtn ? (
    <button type="button" onClick={modalVisibilityHandler} className="absolute right-12px top-12px">
      <Image src="/icons/cross.svg" width={32} height={32} alt="cross_icon" />
    </button>
  ) : null;

  const isDisplayModal = isModalVisible ? (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 font-barlow">
      <div
        className={`relative flex h-fit w-90vw flex-col gap-16px rounded-xs border-t-5px bg-surface-neutral-surface-lv1 md:w-376px ${borderColor} bg-alert-surface-background px-32px py-16px`}
      >
        {isDisplayCross}
        <div className="mt-20px flex flex-col items-center gap-16px text-center">
          <h1 className={`text-xl font-bold ${titleColor}`}>{title}</h1>
          <h1 className={`text-base font-medium ${titleColor}`}>{displayedSubtitles}</h1>
          <Image src={imgStr} width={48} height={48} alt={imgAlt} />
          {/* Info: (20240507 - Julian) sub message (red color) */}
          <p className="text-base text-text-state-error">{redMsg}</p>
          {/* Info: (20240425 - Julian) normal message (gray color) */}
          <div className="text-sm text-text-neutral-secondary">{displayedNormalMsg}</div>
        </div>
        <div className="flex items-center justify-center gap-24px">
          {isBackBtn}
          <Button
            id="message-modal-submit-button"
            className={cn('px-16px py-8px')}
            type="button"
            onClick={submitClickHandler}
            variant={submitBtnVariant ?? 'tertiary'}
          >
            <div className="flex items-center space-x-2">
              <span>{submitBtnStr}</span>
              {submitBtnIcon}
            </div>
          </Button>
        </div>
      </div>
    </div>
  ) : null;

  return isDisplayModal;
};

export default MessageModal;
