import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/button/button';
import useOuterClick from '@/lib/hooks/use_outer_click';
import { cn, timestampToString } from '@/lib/utils/common';
import { IFolder } from '@/interfaces/chat';
import { useChatCtx } from '@/contexts/chat_context';
import { useGlobalCtx } from '@/contexts/global_context';
import { useTranslation } from 'next-i18next';
import { ITranslateFunction } from '@/interfaces/locale';
import { UpdateLinkType } from '@/interfaces/update_link';
import { MessageType } from '@/interfaces/message_modal';

interface IFolderItemProps {
  folder: IFolder;
}

const FolderItem = ({ folder }: IFolderItemProps) => {
  const { t }: { t: ITranslateFunction } = useTranslation('common');
  const { renameFolder, deleteFolder } = useChatCtx();
  const {
    updateLinkTypeHandler,
    updateLinkModalVisibilityHandler,
    messageModalDataHandler,
    messageModalVisibilityHandler,
  } = useGlobalCtx();
  const { id, name, chats } = folder;

  // Info: (20240708 - Julian) Renaming state
  const [isRenaming, setIsRenaming] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const [newName, setNewName] = useState(name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isRenaming && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isRenaming]);

  const {
    targetRef: actionRef,
    componentVisible: actionVisible,
    setComponentVisible: setActionVisible,
  } = useOuterClick<HTMLDivElement>(false);

  // ToDO: (202409 - Julian) Get the most recent chat room
  const recentlyChat = chats[chats.length - 1]; // Info: (20240913 - Julian) 取得最新的聊天室資料

  const actionToggleHandler = () => {
    setActionVisible(!actionVisible);
  };

  // Info: (20240708 - Julian) Renaming handler
  const renamingHandler = () => {
    setIsRenaming(true);
    setActionVisible(false);
  };
  const handleRenameSubmit = () => {
    if (newName.trim() !== '' && !isComposing) {
      renameFolder(id, newName);
      setNewName(newName.trim());
      setIsRenaming(false);
    }
  };
  const handleCompositionStart = () => setIsComposing(true);
  const handleCompositionEnd = () => setIsComposing(false);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isComposing) {
      handleRenameSubmit();
    }
  };

  const shareChatHandler = () => {
    updateLinkTypeHandler(UpdateLinkType.folder);
    updateLinkModalVisibilityHandler();
    // ToDo: (20240708 - Julian) Share chat handler
    setActionVisible(false);
  };

  const removeClickHandler = () => {
    setActionVisible(false);
    messageModalDataHandler({
      title: t('MESSAGE_MODAL.REMOVE_FOLDER_TITLE'),
      messageType: MessageType.WARNING,
      redMsg: t('MESSAGE_MODAL.REMOVE_FOLDER_MESSAGE'),
      backBtnStr: t('COMMON.CANCEL'),
      submitBtnStr: t('COMMON.REMOVE'),
      submitBtnFunction: () => deleteFolder(id),
    });
    messageModalVisibilityHandler();
  };

  const displayedChatName = isRenaming ? (
    <input
      id="folder-rename-input"
      ref={inputRef}
      type="text"
      value={newName}
      onChange={(e) => setNewName(e.target.value)}
      onBlur={handleRenameSubmit}
      onKeyDown={handleKeyDown}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
      className="rounded border bg-input-surface-input-background px-2 py-1 text-sm font-normal outline-none"
      onClick={(e) => e.stopPropagation()}
    />
  ) : (
    <p className="truncate">{name}</p>
  );

  return (
    <div className="table-row hover:bg-surface-brand-primary-10">
      <div className="table-cell rounded-l-sm px-20px py-12px">
        <div className="flex items-center gap-8px">{displayedChatName}</div>
      </div>
      <div className="hidden text-center lg:table-cell">{recentlyChat.name}</div>
      <div className="table-cell text-center text-text-neutral-tertiary">
        {timestampToString(recentlyChat.createdAt).date}
      </div>
      <div className="relative table-cell rounded-r-sm px-20px py-12px text-right">
        <Button
          id="folder-action-button"
          type="button"
          variant="secondaryBorderless"
          className={cn('p-0')}
          onClick={actionToggleHandler}
        >
          <Image src="/icons/triple_dot_vertical.svg" width={16} height={16} alt="action_icon" />
        </Button>

        <div
          ref={actionRef}
          className={`absolute right-0 top-52px flex flex-col gap-y-8px rounded-sm ${actionVisible ? 'visible opacity-100' : 'invisible opacity-0'} bg-surface-neutral-surface-lv2 py-8px text-base shadow-dropmenu transition-all duration-150 ease-in-out`}
        >
          <Button
            id="folder-rename-button"
            type="button"
            variant="tertiaryBorderless"
            className="w-full py-8px"
            onClick={renamingHandler}
          >
            {t('COMMON.RENAME')}
          </Button>
          <Button
            id="folder-share-button"
            type="button"
            variant="tertiaryBorderless"
            className="w-full py-8px"
            onClick={shareChatHandler}
          >
            {t('COMMON.SHARE')}
          </Button>
          <Button
            id="folder-remove-button"
            type="button"
            variant="tertiaryBorderless"
            className="w-full py-8px"
            onClick={removeClickHandler}
          >
            {t('SIDE_BAR.REMOVE_FOLDER')}
          </Button>
        </div>
      </div>
    </div>
  );
};

interface IFolderListProps {
  folders: IFolder[];
}

const FolderList = ({ folders }: IFolderListProps) => {
  const { t }: { t: ITranslateFunction } = useTranslation('common');
  return (
    <div className="table w-full border-separate border-spacing-y-8px rounded-xs font-semibold text-text-neutral-secondary">
      {/* Info: (20240708 - Julian) Header */}
      <div className="table-header-group bg-surface-brand-primary-soft shadow-3 drop-shadow-md">
        <div className="table-row">
          <div className="table-cell rounded-l-xs py-5px pl-20px text-left">
            {t('OVERVIEW.FOLDER_NAME')}
          </div>
          <div className="hidden text-center lg:table-cell">
            {t('OVERVIEW.RECENTLY_USED_CHAT_NAME')}
          </div>
          <div className="table-cell text-center">{t('OVERVIEW.DATE')}</div>
          <div className="table-cell rounded-r-xs py-5px pr-20px text-right">
            {t('OVERVIEW.ACTION')}
          </div>
        </div>
      </div>
      {/* Info: (20240708 - Julian) Body */}
      <div className="z-20 table-row-group bg-surface-neutral-surface-lv1 drop-shadow-md">
        {folders.map((chat) => (
          <FolderItem key={chat.id} folder={chat} />
        ))}
      </div>
    </div>
  );
};

export default FolderList;
