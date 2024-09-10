import Image from 'next/image';
import React from 'react';
import { useChatCtx } from '@/contexts/chat_context';
import { ALLOWED_FILE_TYPES_STRING } from '@/interfaces/file';
import { useTranslation } from 'next-i18next';
import { ITranslateFunction } from '@/interfaces/locale';

interface IFileUploadModalProps {
  isModalVisible: boolean;
  modalVisibilityHandler: () => void;
}

const FileUploadModal = ({ isModalVisible, modalVisibilityHandler }: IFileUploadModalProps) => {
  const { t }: { t: ITranslateFunction } = useTranslation('common');
  const { handleFile } = useChatCtx();

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0]; // Info: 如果有多個檔案，只取第一個檔案 (20240701 - Shirley)
    if (droppedFile) {
      handleFile(droppedFile);
      modalVisibilityHandler();
    }
  };

  const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      // Info: 如果有多個檔案，只取第一個檔案 (20240701 - Shirley)
      handleFile(event.target.files[0]);
      modalVisibilityHandler();
    }
  };

  const uploadArea = (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="flex h-300px w-full flex-col items-center justify-center pb-30px hover:cursor-pointer"
    >
      <label
        htmlFor="file-upload"
        className="flex h-full w-full cursor-pointer flex-col items-center justify-center"
      >
        <input
          id="file-upload"
          type="file"
          name="file"
          className="hidden"
          accept={ALLOWED_FILE_TYPES_STRING}
          onChange={(event) => uploadFile(event)}
        />
        <Image src="/icons/files.svg" width={55} height={60} alt="upload_file" />
        <div className="mt-10 flex flex-col items-center gap-2">
          <p className="font-semibold text-drag-n-drop-text-primary">
            {t('CHAT.UPLOAD_CONTENT_1')}
            <span className="text-link-text-primary">{t('CHAT.UPLOAD_CONTENT_2')}</span>
          </p>
          <p className="mt-2 text-center text-sm text-drag-n-drop-text-note">
            {t('CHAT.REMARK_ALLOWED_FILE')} PDF, TXT, PNG, JPEG, SVG, JSON
          </p>
          <p className="text-center text-sm text-drag-n-drop-text-note">
            {t('CHAT.REMARK_MAX_SIZE')} 50MB
          </p>
        </div>
      </label>
    </div>
  );

  const isDisplayedModal = isModalVisible ? (
    <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/50 font-barlow">
      <div
        className={`relative flex w-330px flex-col gap-20px rounded-md bg-surface-neutral-surface-lv2 md:w-400px`}
      >
        <button
          type="button"
          onClick={modalVisibilityHandler}
          className="absolute right-12px top-12px"
        >
          <Image src="/icons/cross.svg" width={32} height={32} alt="cross_icon" />
        </button>
        {/* Info: (20240628 - Shirley) Header */}
        <div className="flex flex-col items-center gap-2 p-16px">
          <h1 className="text-xl font-bold text-card-text-primary">{t('CHAT.UPLOAD_TITLE')}</h1>
          <p className="text-xs text-card-text-secondary">{t('CHAT.UPLOAD_SUBTITLE')}</p>
        </div>
        {/* Info: (20240628 - Shirley) Body */}
        <div className="flex items-center justify-center">{uploadArea}</div>
      </div>
    </div>
  ) : null;

  return isDisplayedModal;
};

export default FileUploadModal;
