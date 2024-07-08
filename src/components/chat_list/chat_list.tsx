import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/button/button';
import useOuterClick from '@/lib/hooks/use_outer_click';
import { cn, timestampToString } from '@/lib/utils/common';
import { IChat } from '@/interfaces/chat';
import { useChatCtx } from '@/contexts/chat_context';
import { useGlobalCtx } from '@/contexts/global_context';

interface IChatItemProps {
  chat: IChat;
}

const ChatItem = ({ chat }: IChatItemProps) => {
  const { renameChat, deleteChat } = useChatCtx();
  const { moveChatModalVisibilityHandler } = useGlobalCtx();
  const { id, name, createdAt, messages } = chat;

  // Info: (20240708 - Julian) Renaming state
  const [isRenaming, setIsRenaming] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const [newName, setNewName] = useState(name);
  const inputRef = useRef<HTMLInputElement>(null);

  const lastMessage = messages[messages.length - 2].messages;
  const latestQuestion = lastMessage[lastMessage.length - 1].content;

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
      renameChat(id, newName);
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
    // ToDo: (20240708 - Julian) Share chat handler
    setActionVisible(false);
  };

  const moveChatHandler = () => {
    moveChatModalVisibilityHandler();
    // ToDo: (20240708 - Julian) Move chat handler
    setActionVisible(false);
  };

  const setPrivateChatHandler = () => {
    // ToDo: (20240708 - Julian) Set private chat handler
    setActionVisible(false);
  };

  const removeChatHandler = () => {
    deleteChat(id);
    setActionVisible(false);
  };

  const isShowPrivateIcon = chat.isPrivate ? (
    <Image src="/icons/private.svg" width={16} height={16} alt="private_icon" />
  ) : null;

  const displayedChatName = isRenaming ? (
    <input
      ref={inputRef}
      type="text"
      value={newName}
      onChange={(e) => setNewName(e.target.value)}
      onBlur={handleRenameSubmit}
      onKeyDown={handleKeyDown}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
      className="rounded border bg-white px-2 py-1 text-sm font-normal"
      onClick={(e) => e.stopPropagation()}
    />
  ) : (
    <p className="truncate">{name}</p>
  );

  return (
    <div className="table-row hover:bg-surface-brand-primary-10">
      <div className="table-cell rounded-l-sm px-20px py-12px">
        <div className="flex items-center gap-8px">
          {displayedChatName}
          {isShowPrivateIcon}
        </div>
      </div>
      <div className="table-cell text-center">{latestQuestion}</div>
      <div className="table-cell text-center text-text-neutral-tertiary">
        {timestampToString(createdAt).date}
      </div>
      <div className="relative table-cell rounded-r-sm px-20px py-12px text-right">
        <Button
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
            type="button"
            variant="tertiaryBorderless"
            className="w-full py-8px"
            onClick={renamingHandler}
          >
            Rename
          </Button>
          <Button
            type="button"
            variant="tertiaryBorderless"
            className="w-full py-8px"
            onClick={shareChatHandler}
          >
            Share
          </Button>
          <Button
            type="button"
            variant="tertiaryBorderless"
            className="w-full py-8px"
            onClick={moveChatHandler}
          >
            Move
          </Button>
          <Button
            type="button"
            variant="tertiaryBorderless"
            className="w-full py-8px"
            onClick={setPrivateChatHandler}
          >
            Set to Private
          </Button>
          <Button
            type="button"
            variant="tertiaryBorderless"
            className="w-full py-8px"
            onClick={removeChatHandler}
          >
            Remove Chat
          </Button>
        </div>
      </div>
    </div>
  );
};

interface IChatListProps {
  chats: IChat[];
}

const ChatList = ({ chats }: IChatListProps) => {
  return (
    <div className="table w-full border-separate border-spacing-y-8px rounded-xs font-semibold text-text-neutral-secondary">
      {/* Info: (20240708 - Julian) Header */}
      <div className="table-header-group bg-surface-brand-primary-soft shadow-3 drop-shadow-md">
        <div className="table-row">
          <div className="table-cell rounded-l-xs py-5px pl-20px text-left">Chat Name</div>
          <div className="table-cell text-center">Latest Questions</div>
          <div className="table-cell text-center">Date</div>
          <div className="table-cell rounded-r-xs py-5px pr-20px text-right">Action</div>
        </div>
      </div>
      {/* Info: (20240708 - Julian) Body */}
      <div className="z-20 table-row-group bg-surface-neutral-surface-lv1 drop-shadow-md">
        {chats.map((chat) => (
          <ChatItem key={chat.id} chat={chat} />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
