'use client';

import { Button } from '@/components/button/button';
import { IFile, FileStatusIcons, FileTypeIcons, FileStatus } from '@/interfaces/file';
import { cn } from '@/lib/utils/common';
import { LoadingSVG } from '@/loading_svg/loading_svg';
import Image from 'next/image';
import React from 'react';

interface IUploadedFileItemProps {
  file: IFile;
  isStatusVisible?: boolean;
  delete?: () => void;
  retry?: () => void;
}

const UploadedFileItem = ({
  file,
  isStatusVisible = true,
  delete: deleteCallback,
  retry: retryCallback,
}: IUploadedFileItemProps) => {
  const { data, status } = file;

  const deleteClickHandler = () => {
    if (deleteCallback) {
      deleteCallback();
    }
  };

  const retryClickHandler = () => {
    if (retryCallback) {
      retryCallback();
    }
  };

  const getFileTypeIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    return FileTypeIcons[extension as keyof typeof FileTypeIcons] || FileTypeIcons.text;
  };

  const getStatusIcon = (statusStr: string) => {
    return FileStatusIcons[statusStr as keyof typeof FileStatusIcons] || FileStatusIcons.error;
  };

  const displayedDeleteButton = deleteCallback && (
    <Button
      id="delete-button"
      className="absolute right-1 top-1"
      size={'extraSmall'}
      variant={'secondaryBorderless'}
      onClick={deleteClickHandler}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="none"
        viewBox="0 0 16 16"
      >
        <path
          className="fill-current"
          fillRule="evenodd"
          d="M4.138 4.138a.75.75 0 011.061 0L8.002 6.94l2.803-2.803a.75.75 0 111.06 1.06L9.064 8.001l2.803 2.803a.75.75 0 01-1.06 1.061L8.001 9.062 5.2 11.865a.75.75 0 11-1.06-1.06L6.94 8 4.138 5.198a.75.75 0 010-1.06z"
          clipRule="evenodd"
        ></path>
      </svg>
    </Button>
  );

  const displayedRetryButton = retryCallback && (
    <Button
      id="retry-button"
      variant={'secondaryBorderless'}
      size={'extraSmall'}
      onClick={retryClickHandler}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          className="fill-current"
          fillRule="evenodd"
          d="M1.752 10.001a8.25 8.25 0 0114.086-5.832c.584.584 1.213 1.32 1.748 1.978V3.334a.75.75 0 011.5 0v5a.75.75 0 01-.75.75h-5a.75.75 0 010-1.5h3.48l-.072-.091c-.584-.734-1.32-1.615-1.967-2.263a6.75 6.75 0 101.712 6.647.75.75 0 011.44.415 8.25 8.25 0 01-16.177-2.291z"
          clipRule="evenodd"
        ></path>
      </svg>
    </Button>
  );

  const displayedSuccessOrError = (
    <div className={cn('flex shrink-0 gap-0', status === FileStatus.error ? 'w-60px' : '')}>
      <Image width={20} height={20} src={getStatusIcon(status)} alt="File status icon" />

      {status === FileStatus.error &&
        // Info: retry button (20240701 - Shirley)
        displayedRetryButton}
    </div>
  );

  const displayedStatus = isStatusVisible ? (
    status !== FileStatus.uploading ? (
      displayedSuccessOrError
    ) : (
      <div>
        <LoadingSVG />
      </div>
    )
  ) : null;

  return (
    <div className="relative m-2">
      <div className="h-80px w-250px">
        <div className="cardShadow flex h-full items-center justify-between gap-2 whitespace-nowrap rounded-xs bg-surface-neutral-main-background px-4 py-2 text-sm font-normal leading-tight text-slate-700">
          <div className="flex items-center gap-2 overflow-hidden">
            <Image
              width={40}
              height={48}
              src={getFileTypeIcon(data.name)}
              className=""
              alt="File type icon"
            />
            <div className="mx-2 my-auto self-stretch truncate text-base text-text-neutral-primary">
              {data.name}
            </div>
            {displayedStatus}
          </div>
        </div>
        {displayedDeleteButton}
      </div>
    </div>
  );
};

export default UploadedFileItem;
