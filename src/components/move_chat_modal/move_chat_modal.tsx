import Image from 'next/image';
import { useState } from 'react';
import useOuterClick from '@/lib/hooks/use_outer_click';
import { Button } from '@/components/button/button';
import { useTranslation } from 'react-i18next';

interface IMoveChatModalProps {
  isModalVisible: boolean;
  modalVisibilityHandler: () => void;
}

const dummyFolders = ['Folder 1', 'Folder 2', 'Folder 3'];

const MoveChatModal = ({ isModalVisible, modalVisibilityHandler }: IMoveChatModalProps) => {
  const { t } = useTranslation();
  // ToDo: (20240703 - Julian) Replace dummyFolders with actual data
  const currentFolder = dummyFolders[0];
  const [targetFolder, setTargetFolder] = useState<string>(currentFolder);

  const {
    targetRef: folderMenuRef,
    componentVisible: isFolderMenuVisible,
    setComponentVisible: setFolderMenuVisible,
  } = useOuterClick<HTMLDivElement>(false);

  const isDisableSubmit = targetFolder === currentFolder;

  const folderMenuToggleHandler = () => setFolderMenuVisible(!isFolderMenuVisible);

  const moveClickHandler = () => {
    modalVisibilityHandler();
    // ToDo: (20240703 - Julian) Implement move chat functionality
  };

  const folderDropMenu = (
    <div
      ref={folderMenuRef}
      className={`absolute left-0 top-50px grid w-full grid-cols-1 overflow-hidden rounded-xs px-12px py-10px ${isFolderMenuVisible ? 'grid-rows-1 opacity-100 shadow-dropmenu' : 'grid-rows-0 opacity-0'} bg-input-surface-input-background transition-all duration-300 ease-in-out`}
    >
      <div className="flex max-h-200px flex-col overflow-y-auto">
        {dummyFolders.map((folder) => {
          const clickHandler = () => {
            setTargetFolder(folder);
            setFolderMenuVisible(false);
          };
          return (
            <button
              key={folder}
              type="button"
              className="flex w-full items-center justify-between px-12px py-10px text-base hover:bg-dropdown-surface-item-hover"
              onClick={clickHandler}
            >
              <p>{folder}</p>
            </button>
          );
        })}
      </div>
    </div>
  );

  const isDisplayModal = isModalVisible ? (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 font-barlow">
      <div
        id="move-chat-modal"
        className="relative flex h-auto w-90vw flex-col rounded-sm bg-surface-neutral-surface-lv1 py-20px font-barlow md:w-500px"
      >
        {/* Info: (20240625 - Julian) Header */}
        <div className="flex items-center justify-between pl-40px pr-20px text-32px font-bold text-text-neutral-primary">
          <h1>{t('CHAT.MOVE_CHAT_TITLE')}</h1>
          <button type="button" onClick={modalVisibilityHandler}>
            <Image src="/icons/cross.svg" width={32} height={32} alt="cross_icon" />
          </button>
        </div>

        <hr className="my-20px bg-divider-stroke-lv-4" />

        {/* Info: (20240625 - Julian) Content */}
        <div className="flex w-full flex-col gap-y-20px px-40px pt-20px">
          <div className="flex flex-col gap-y-8px text-button-text-secondary">
            <p className="font-semibold text-input-text-primary">{t('CHAT.MOVE_CHAT_CONTENT')}</p>
            <button
              type="button"
              className="relative flex w-full items-center justify-between rounded-xs border border-input-stroke-input px-12px py-10px text-base"
              onClick={folderMenuToggleHandler}
            >
              <p className="text-input-text-input-placeholder">{targetFolder}</p>
              <Image src="/icons/chevron_down.svg" width={20} height={20} alt="chevron_down_icon" />
              {folderDropMenu}
            </button>
          </div>

          <Button
            id="move-chat-button"
            type="button"
            variant="secondaryOutline"
            className="ml-auto w-fit"
            disabled={isDisableSubmit}
            onClick={moveClickHandler}
          >
            {t('COMMON.MOVE')}
          </Button>
        </div>
      </div>
    </div>
  ) : null;

  return isDisplayModal;
};

export default MoveChatModal;
