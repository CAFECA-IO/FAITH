import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/button/button';
import { useTranslation } from 'next-i18next';
import { ITranslateFunction } from '@/interfaces/locale';

interface IFeedbackModalProps {
  isModalVisible: boolean;
  modalVisibilityHandler: () => void;
}

const FeedbackModal = ({ isModalVisible, modalVisibilityHandler }: IFeedbackModalProps) => {
  const { t }: { t: ITranslateFunction } = useTranslation('common');
  const [feedbackValue, setFeedbackValue] = useState('');

  const feedbackChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeedbackValue(e.target.value);
  };

  const isDisableSubmit = feedbackValue === '';

  const isDisplayModal = isModalVisible ? (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 font-barlow">
      <div
        id="user-code-modal"
        className="relative flex h-auto w-90vw flex-col rounded-sm bg-surface-neutral-surface-lv1 py-20px font-barlow md:w-520px"
      >
        {/* Info: (20240625 - Julian) Header */}
        <div className="flex items-center justify-between pl-40px pr-20px text-2xl font-bold text-text-neutral-primary md:text-32px">
          <h1>{t('CHAT.FEEDBACK_TITLE')}</h1>
          <button type="button" onClick={modalVisibilityHandler}>
            <Image src="/icons/cross.svg" width={32} height={32} alt="cross_icon" />
          </button>
        </div>

        <hr className="my-20px bg-divider-stroke-lv-4" />

        {/* Info: (20240625 - Julian) Content */}
        <div className="flex w-full flex-col gap-y-20px px-40px pt-20px">
          <div className="w-full rounded-sm border border-input-stroke-input px-12px py-10px">
            <input
              id="feedback-input"
              type="text"
              placeholder={t('CHAT.FEEDBACK_PLACEHOLDER')}
              value={feedbackValue}
              onChange={feedbackChangeHandler}
              className="w-full bg-transparent outline-none placeholder:text-input-text-input-placeholder"
            />
          </div>
          <Button
            id="feedback-submit-button"
            type="button"
            variant="tertiary"
            className="ml-auto w-fit"
            disabled={isDisableSubmit}
            // ToDo: (20240704 - Julian) Add feedback submit handler
            onClick={modalVisibilityHandler}
          >
            {t('COMMON.SEND')}
          </Button>
        </div>
      </div>
    </div>
  ) : null;

  return isDisplayModal;
};

export default FeedbackModal;
