import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Button } from '@/components/button/button';
import { IReportCommentModal } from '@/interfaces/report_modal';
import { useTranslation } from 'react-i18next';

interface IReportCommentModalProps {
  isModalVisible: boolean;
  modalVisibilityHandler: () => void;
  reportCommentData: IReportCommentModal;
}

const ReportCommentModal = ({
  isModalVisible,
  modalVisibilityHandler,
  // ToDo: (20240628 - Julian) API logic
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  reportCommentData,
}: IReportCommentModalProps) => {
  const { t } = useTranslation();
  const [reportReason, setReportReason] = useState('');

  const reportReasonChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReportReason(event.target.value);
  };

  const isSubmitDisabled = reportReason === '';

  useEffect(() => {
    if (isModalVisible) {
      setReportReason('');
    }
  }, [isModalVisible]);

  const submitHandler = () => {
    // ToDo: (20240628 - Julian) API call to report comment
    modalVisibilityHandler();
  };

  const isDisplayModal = isModalVisible ? (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 font-barlow">
      <div
        className={`relative flex h-fit w-90vw flex-col gap-16px divide-y divide-divider-stroke-lv-4 rounded-xs bg-surface-neutral-surface-lv2 py-20px md:w-500px`}
      >
        {/* Info: (20240628 - Julian) Header */}
        <div className="flex items-center justify-between px-20px text-2xl font-bold text-text-neutral-primary">
          <h1>{t('DISCOVER.REPORT_COMMENT_TITLE')}</h1>
          <button type="button" onClick={modalVisibilityHandler}>
            <Image src="/icons/cross.svg" width={32} height={32} alt="cross_icon" />
          </button>
        </div>

        {/* Info: (20240625 - Julian) Content */}
        <div className="flex w-full flex-col gap-y-20px px-40px pt-40px font-medium text-button-text-secondary">
          <div className="flex flex-1 flex-col gap-8px">
            <p className="text-input-text-primary">{t('DISCOVER.REPORT_COMMENT_CONTENT')}</p>
            <div className="flex w-full rounded-sm border border-input-stroke-input bg-input-surface-input-background px-12px py-10px">
              <input
                id="report-comment-reason"
                type="text"
                value={reportReason}
                onChange={reportReasonChangeHandler}
                placeholder={t('DISCOVER.REPORT_COMMENT_PLACEHOLDER')}
                className="flex-1 bg-transparent text-text-neutral-primary outline-none placeholder:text-input-text-input-placeholder"
              />
            </div>
          </div>
          <Button
            id="report-comment-send-button"
            type="button"
            onClick={submitHandler}
            variant="secondaryOutline"
            className="ml-auto w-fit"
            disabled={isSubmitDisabled}
          >
            {t('COMMON.SEND')}
          </Button>
        </div>
      </div>
    </div>
  ) : null;

  return isDisplayModal;
};

export default ReportCommentModal;
