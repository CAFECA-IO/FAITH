import { Button } from '@/components/button/button';
import { IFile, FileStatusIcons, FileTypeIcons } from '@/interfaces/file';
import Image from 'next/image';
import React from 'react';

interface IUploadedFileItemProps {
  file: IFile;
  callback: () => void;
}

const UploadedFileItem = ({ file, callback }: IUploadedFileItemProps) => {
  const { data, status } = file;

  const deleteClickHandler = () => {
    callback();
  };

  const getFileTypeIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    return FileTypeIcons[extension as keyof typeof FileTypeIcons] || FileTypeIcons.text;
  };

  const getStatusIcon = (statusStr: string) => {
    return FileStatusIcons[statusStr as keyof typeof FileStatusIcons] || FileStatusIcons.error;
  };

  return (
    <div className="relative m-2">
      <div className="h-80px w-250px">
        <div className="flex h-full items-center justify-between gap-2 whitespace-nowrap rounded-sm bg-surface-neutral-main-background p-2 text-sm font-normal leading-tight text-slate-700 shadow-dropmenu">
          <div className="flex items-center gap-2 overflow-hidden">
            <Image
              width={20}
              height={20}
              src={getFileTypeIcon(data.name)}
              className=""
              alt="File type icon"
            />
            <div className="mx-2 my-auto self-stretch truncate text-base text-text-neutral-primary">
              {data.name}
            </div>
            <Image width={20} height={20} src={getStatusIcon(status)} alt="File status icon" />
          </div>
        </div>
        <Button
          className="absolute right-1 top-1"
          size={'extraSmall'}
          variant={'secondaryBorderless'}
          onClick={deleteClickHandler}
        >
          {' '}
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
      </div>
    </div>
  );
};

export default UploadedFileItem;
