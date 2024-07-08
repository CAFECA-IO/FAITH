import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/button/button';
import { useChatCtx } from '@/contexts/chat_context';
import { useGlobalCtx } from '@/contexts/global_context';
import { cn } from '@/lib/utils/common';
import useOuterClick from '@/lib/hooks/use_outer_click';
import { IChatBrief, IFolder } from '@/interfaces/chat';
import { useUserCtx } from '@/contexts/user_context';
import { useRouter } from 'next/router';
import { NATIVE_ROUTE } from '@/constants/url';
import { MessageType } from '@/interfaces/message_modal';
import Link from 'next/link';

interface IChatBriefItemProps {
  chatBrief: IChatBrief;
  index: number;
}

interface IChatFolderItemProps {
  chatFolder: IFolder;
}
interface IChatSidebarProps {
  getIsExpanded?: (props: boolean) => void;
}

const ChatBriefItem = ({ chatBrief, index }: IChatBriefItemProps) => {
  const router = useRouter();
  const { selectChat, selectedChat, deleteChat, renameChatBrief } = useChatCtx();
  const { messageModalVisibilityHandler, messageModalDataHandler } = useGlobalCtx();

  const [isRenaming, setIsRenaming] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const [newName, setNewName] = useState(chatBrief.name);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    targetRef: editMenuRef,
    componentVisible: isEditMenuVisible,
    setComponentVisible: setEditMenuVisible,
  } = useOuterClick<HTMLDivElement>(false);

  useEffect(() => {
    if (isRenaming && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isRenaming]);

  const chatBriefClickHandler = () => {
    selectChat(chatBrief.id);
    // TODO: 現在用 SPA 來寫，之後應該改成用 next/link 的 href 去跳轉、拿 URL 的資料來顯示對應畫面 (20240628 - Shirley)
    if (router.pathname !== NATIVE_ROUTE.HOME) {
      router.push(NATIVE_ROUTE.HOME);
    }
  };

  const editIconClickHandler = () => {
    setEditMenuVisible(!isEditMenuVisible);
  };

  const renameClickHandler = () => {
    setIsRenaming(true);
    setEditMenuVisible(false);
  };

  const handleRenameSubmit = () => {
    if (newName.trim() !== '' && !isComposing) {
      renameChatBrief(chatBrief.id, newName.trim());
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

  const shareClickHandler = () => {
    setEditMenuVisible(false);
  };

  const privateClickHandler = () => {
    setEditMenuVisible(false);
  };

  const removeClickHandler = () => {
    setEditMenuVisible(false);
    messageModalDataHandler({
      title: 'Remove Chat',
      messageType: MessageType.WARNING,
      redMsg: 'Are you sure you want to delete this chat?\nThis action cannot be undone!',
      backBtnStr: 'Cancel',
      submitBtnStr: 'Remove',
      submitBtnFunction: () => {
        deleteChat(chatBrief.id);
      },
    });
    messageModalVisibilityHandler();
  };

  const displayedEditMenu = isEditMenuVisible && (
    <div className="relative">
      <div key={chatBrief.id} ref={editMenuRef} className="absolute right-0 top-0 z-50">
        <div className="flex flex-col gap-1 rounded-sm bg-white py-2 text-base font-normal leading-6 tracking-normal shadow-userMenu">
          <Button variant={'secondaryBorderless'} className="" onClick={renameClickHandler}>
            Rename
          </Button>
          <Button disabled variant={'secondaryBorderless'} className="" onClick={shareClickHandler}>
            Share
          </Button>
          <Button
            disabled
            variant={'secondaryBorderless'}
            className=""
            onClick={privateClickHandler}
          >
            Set to Private
          </Button>
          <Button variant={'secondaryBorderless'} className="" onClick={removeClickHandler}>
            Remove Chat
          </Button>
        </div>
      </div>
    </div>
  );

  const displayedChatBriefItem = (
    <>
      <div
        key={chatBrief.id}
        onClick={isRenaming ? undefined : chatBriefClickHandler}
        className={cn(
          'flex w-full items-center justify-between',
          chatBrief.id === selectedChat?.id ? 'bg-surface-brand-primary-10' : ''
        )}
      >
        {isRenaming ? (
          <input
            ref={inputRef}
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            onBlur={handleRenameSubmit}
            onKeyDown={handleKeyDown}
            className="w-full rounded border bg-white px-2 py-2 text-sm font-normal"
          />
        ) : (
          <Button
            variant={'secondaryBorderless'}
            className={cn(
              'justify-start px-2 py-2 text-start',
              chatBrief.id === selectedChat?.id
                ? 'pointer-events-none w-150px hover:text-button-text-secondary'
                : 'w-full'
            )}
          >
            <p className="truncate text-start text-sm font-normal">{newName}</p>
          </Button>
        )}
        {chatBrief.id === selectedChat?.id && !isRenaming && (
          <Button
            onClick={editIconClickHandler}
            variant={'secondaryBorderless'}
            size={'extraSmall'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                className="fill-current"
                fillRule="evenodd"
                d="M5.003 11.751a.25.25 0 100 .5.25.25 0 000-.5zm-1.75.25a1.75 1.75 0 113.5 0 1.75 1.75 0 01-3.5 0zm8.75-.25a.25.25 0 100 .5.25.25 0 000-.5zm-1.75.25a1.75 1.75 0 113.5 0 1.75 1.75 0 01-3.5 0zm8.75-.25a.25.25 0 100 .5.25.25 0 000-.5zm-1.75.25a1.75 1.75 0 113.5 0 1.75 1.75 0 01-3.5 0z"
                clipRule="evenodd"
              ></path>
            </svg>{' '}
          </Button>
        )}
      </div>

      {displayedEditMenu}
    </>
  );

  return (
    <Draggable
      draggableId={`chat-${chatBrief.id}`}
      index={index}
      isDragDisabled={false} // Info: TRY to always allow dragging (20240704 - Shirley)
    >
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          {displayedChatBriefItem}
        </div>
      )}
    </Draggable>
  );
};

const ChatFolderItem = ({ chatFolder }: IChatFolderItemProps) => {
  const { deleteFolder, renameFolder } = useChatCtx();
  const { messageModalDataHandler, messageModalVisibilityHandler } = useGlobalCtx();
  const [isFolderExpanded, setIsFolderExpanded] = useState(true);
  const [isRenaming, setIsRenaming] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const [newName, setNewName] = useState(chatFolder.name);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    targetRef: editMenuRef,
    componentVisible: isEditMenuVisible,
    setComponentVisible: setEditMenuVisible,
  } = useOuterClick<HTMLDivElement>(false);

  useEffect(() => {
    if (isRenaming && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isRenaming]);

  const handleRenameSubmit = () => {
    if (newName.trim() !== '' && !isComposing) {
      renameFolder(chatFolder.id, newName.trim());
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

  const editIconClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setEditMenuVisible(!isEditMenuVisible);
  };

  const renameClickHandler = () => {
    setIsRenaming(true);
    setEditMenuVisible(false);
  };

  const shareClickHandler = () => {
    setEditMenuVisible(false);
  };

  const removeClickHandler = () => {
    setEditMenuVisible(false);

    messageModalDataHandler({
      title: 'Remove Folder',
      messageType: MessageType.WARNING,
      redMsg: 'Are you sure you want to delete this folder?\nThis action cannot be undone!',
      backBtnStr: 'Cancel',
      submitBtnStr: 'Remove',
      submitBtnFunction: () => {
        // ToDo: (20240702 - Julian) 這邊要寫刪除資料夾的 function ---> done (20240705 - Shirley)
        deleteFolder(chatFolder.id);
      },
    });
    messageModalVisibilityHandler();
  };

  const displayedEditMenu = isEditMenuVisible && (
    <div className="relative">
      <div key={chatFolder.id} ref={editMenuRef} className="absolute right-4 top-6 z-50">
        <div className="flex flex-col gap-1 rounded-sm bg-white py-2 text-base font-normal leading-6 tracking-normal shadow-userMenu">
          <Button variant={'secondaryBorderless'} className="" onClick={renameClickHandler}>
            Rename Folder
          </Button>
          <Button disabled variant={'secondaryBorderless'} className="" onClick={shareClickHandler}>
            Share Folder
          </Button>

          <Button variant={'secondaryBorderless'} className="" onClick={removeClickHandler}>
            Remove Folder
          </Button>
        </div>
      </div>
    </div>
  );

  const displayedFolder = (
    <div key={chatFolder.id} className="w-full pb-2 pt-0">
      <div
        onClick={() => !isRenaming && setIsFolderExpanded(!isFolderExpanded)}
        className={cn(
          'flex w-full items-center justify-between gap-2 px-2 text-base font-medium leading-6 tracking-normal text-slate-700 hover:cursor-pointer'
        )}
      >
        <div className="flex gap-2.5">
          <div className="my-auto h-2 w-2 shrink-0 rounded-full bg-orange-400" />
          <div className={cn(isFolderExpanded ? 'w-100px' : 'w-160px')}>
            {isRenaming ? (
              <input
                ref={inputRef}
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onBlur={handleRenameSubmit}
                onKeyDown={handleKeyDown}
                onCompositionStart={handleCompositionStart}
                onCompositionEnd={handleCompositionEnd}
                className="w-full rounded border bg-white px-2 py-1 text-sm font-normal"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <p className="truncate">{newName}</p>
            )}
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 16 16"
            className={`transition-transform duration-300 ${isFolderExpanded ? 'rotate-180' : ''}`}
          >
            <path
              fill="#314362"
              fillRule="evenodd"
              d="M3.725 5.677a.75.75 0 011.06 0l3.376 3.376 3.376-3.376a.75.75 0 111.06 1.06l-3.905 3.907a.75.75 0 01-1.061 0L3.725 6.738a.75.75 0 010-1.061z"
              clipRule="evenodd"
            ></path>
          </svg>

          {/* Info: folder edit icon (20240628 - Shirley) */}
          {isFolderExpanded && (
            <div className="pointer-events-auto">
              <div className="flex gap-0">
                <Button
                  onClick={editIconClickHandler}
                  variant={'secondaryBorderless'}
                  className={cn('px-2 py-1', isEditMenuVisible ? 'text-surface-brand-primary' : '')}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 16 16"
                  >
                    <g>
                      <path
                        className="fill-current"
                        fillRule="evenodd"
                        d="M11.863 1.445a2.131 2.131 0 013.014 3.014L8.65 10.685l-.04.04c-.185.185-.358.359-.568.487a2.053 2.053 0 01-.593.246c-.239.057-.484.057-.745.057H5.557a.75.75 0 01-.75-.75v-1.09-.058c0-.261 0-.506.057-.745.05-.21.133-.41.245-.593.129-.21.302-.383.487-.567a38.7 38.7 0 00.041-.041l6.226-6.226zm1.953 1.06a.631.631 0 00-.893 0L6.698 8.733c-.25.25-.286.292-.31.33a.552.552 0 00-.066.16c-.01.043-.015.098-.015.452v.34h.34c.354 0 .41-.004.453-.015a.552.552 0 00.16-.066c.037-.023.08-.058.33-.309l6.226-6.226a.631.631 0 000-.892zm-9.07-.303H7.51a.75.75 0 010 1.5H4.776c-.56 0-.934 0-1.222.024-.28.023-.41.064-.496.107-.227.116-.41.3-.526.526-.044.086-.084.217-.107.496a16.76 16.76 0 00-.024 1.222v5.469c0 .56 0 .934.024 1.222.023.279.063.41.107.496.115.226.3.41.526.526.085.043.217.084.496.107.288.023.663.024 1.222.024h5.469c.559 0 .933 0 1.221-.024.28-.023.411-.064.497-.107.226-.116.41-.3.526-.526.043-.086.084-.217.106-.496.024-.289.025-.663.025-1.222V8.81a.75.75 0 011.5 0V11.576c0 .521 0 .957-.03 1.314-.03.372-.096.723-.265 1.055-.26.508-.673.922-1.181 1.181-.333.17-.683.235-1.056.266-.356.029-.792.029-1.313.029h-5.53c-.52 0-.957 0-1.313-.03-.372-.03-.723-.095-1.055-.265a2.703 2.703 0 01-1.181-1.181c-.17-.332-.236-.683-.266-1.055-.03-.357-.03-.793-.03-1.314V6.047c0-.521 0-.957.03-1.314.03-.372.096-.723.265-1.055.26-.509.673-.922 1.182-1.181.332-.17.683-.235 1.055-.266.356-.029.792-.029 1.314-.029z"
                        clipRule="evenodd"
                      ></path>
                    </g>
                  </svg>
                </Button>

                {/* TODO: link to chat list page (20240705 - Shirley) */}
                <Link href={`/folder/${chatFolder.id}`}>
                  <Button variant={'secondaryBorderless'} className={cn('px-2 py-1')}>
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
                        d="M3.604 8.26a.099.099 0 100-.199.099.099 0 000 .198zm-1.4-.1a1.401 1.401 0 112.801 0 1.401 1.401 0 01-2.802 0zm5.957.1a.099.099 0 100-.199.099.099 0 000 .198zm-1.4-.1a1.401 1.401 0 112.801 0 1.401 1.401 0 01-2.802 0zm5.958.1a.099.099 0 100-.199.099.099 0 000 .198zm-1.401-.1a1.401 1.401 0 112.802 0 1.401 1.401 0 01-2.802 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {displayedEditMenu}
        </div>
      </div>

      {isFolderExpanded &&
        chatFolder.chats.map((chat, index) => (
          <div key={chat.id} className="ml-5 mt-2">
            <ChatBriefItem chatBrief={chat} key={chat.id} index={index} />
          </div>
        ))}
    </div>
  );

  return (
    <Droppable droppableId={`folder-${chatFolder.id}`}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {displayedFolder}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

const ChatSidebar = ({ getIsExpanded }: IChatSidebarProps) => {
  const { isSignedIn } = useUserCtx();
  const { chatBriefs, folders, addFolder, moveChatToFolder } = useChatCtx();

  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
    if (getIsExpanded) {
      getIsExpanded(!isExpanded);
    }
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const chatId = result.draggableId.replace('chat-', '');
    const destinationId = result.destination.droppableId;

    if (destinationId === 'new-folder') {
      if (chatBriefs) {
        const chat = chatBriefs.find((item) => item.id === chatId);

        if (chat) {
          const id = uuidv4();
          const newFolder: IFolder = {
            id,
            name: `Folder ${id}`,
            chats: [chat],
          };
          addFolder(newFolder, chat);
        }
      }
    } else if (destinationId.startsWith('folder-')) {
      const folderId = destinationId.replace('folder-', '');
      moveChatToFolder(chatId, folderId);
    }
  };

  const displayedFolders =
    isSignedIn && // TODO: for demo，實際上要限制沒登入就不能新增資料夾，理論上這個條件不應該發生 (20240628 - Shirley)
    folders &&
    folders.length > 0 &&
    folders.map((folder) => (
      <Droppable droppableId={`folder-${folder.id}`} key={folder.id}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <ChatFolderItem chatFolder={folder} key={folder.id} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    ));

  const displayedChatBriefs =
    isSignedIn && // TODO: for demo，實際上要限制沒登入就只能替代 chats array 中最後一個 chat (20240628 - Shirley)
    chatBriefs &&
    chatBriefs.length > 0 &&
    chatBriefs
      .filter((chat) => !chat.folder)
      .map((chat, index) => <ChatBriefItem chatBrief={chat} key={chat.id} index={index} />);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="font-barlow">
        <div
          className={`relative ${isExpanded ? 'w-200px' : 'w-0'} transition-all duration-300 ease-in-out`}
        ></div>

        <Button
          variant={'secondaryBorderless'}
          size={'extraSmall'}
          type="button"
          onClick={toggleSidebar}
          className={`fixed top-96 ${isExpanded ? 'left-240px' : 'left-0'} z-40 hidden transition-all duration-300 ease-in-out lg:block`}
        >
          {isExpanded ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="38"
              fill="none"
              viewBox="0 0 8 38"
            >
              <path stroke="#C1C9D5" strokeLinecap="round" strokeWidth="6" d="M4 3v32"></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="38"
              fill="none"
              viewBox="0 0 14 38"
            >
              <path
                stroke="#C1C9D5"
                strokeLinecap="round"
                strokeWidth="6"
                d="M3 35l6.882-13.764a5 5 0 000-4.472L3 3"
              ></path>
            </svg>
          )}
        </Button>

        {/* Info: ----- desktop version (20240423 - Shirley) ----- */}
        <div
          className={`fixed z-10 hidden h-screen flex-col items-center bg-surface-brand-primary-5 lg:flex ${isExpanded ? 'w-240px' : 'w-0 -translate-x-240px'} px-12px pb-40px pt-80px transition-all duration-300 ease-in-out`}
        >
          <div className="flex h-full w-full flex-col pb-0">
            <div className="mx-3 flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center">
                <Image
                  src={'/logo/isunfa_pure_logo.svg'}
                  width={20}
                  height={20}
                  alt="isunfa logo"
                  className="z-10 h-5 w-5"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="none"
                  viewBox="0 0 40 40"
                  className="absolute"
                >
                  <circle cx="20" cy="20" r="19" stroke="#CDD1D9" strokeWidth="2"></circle>
                </svg>
              </div>

              <p
                className={`text-lg font-medium text-button-text-secondary transition-all duration-300 ease-in-out`}
              >
                My Chat List
              </p>

              {/* TODO: link to folder list page (20240705 - Shirley) */}
              <Link href={NATIVE_ROUTE.HOME} className="hover:text-button-text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    className="stroke-current"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 2.5V12m0 0l8.5-4.722M12 12L3.5 7.278M12 12v9.5m8.5-4.778l-7.723-4.29c-.284-.158-.425-.237-.575-.268a1.001 1.001 0 00-.403 0c-.15.031-.292.11-.576.268L3.5 16.722M21 16.06V7.942c0-.343 0-.514-.05-.667a1 1 0 00-.215-.364c-.109-.119-.258-.202-.558-.368l-7.4-4.111c-.284-.158-.425-.237-.575-.267a1 1 0 00-.403 0c-.15.03-.292.11-.576.267l-7.4 4.11c-.3.167-.45.25-.558.369a1 1 0 00-.215.364C3 7.428 3 7.599 3 7.942v8.117c0 .342 0 .514.05.666a1 1 0 00.215.364c.109.119.258.202.558.368l7.4 4.111c.284.158.425.237.576.268.133.027.27.027.402 0 .15-.031.292-.11.576-.268l7.4-4.11c.3-.167.45-.25.558-.369a.999.999 0 00.215-.364c.05-.152.05-.324.05-.666z"
                  ></path>
                </svg>
              </Link>
            </div>
            <div className="hideScrollbar mb-10 mt-5 grow overflow-y-auto overflow-x-hidden">
              {displayedFolders}
              <Droppable droppableId="chat-list">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {displayedChatBriefs}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>

          <Droppable droppableId="new-folder">
            {(provided, snapshot) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="-mt-8 h-50px">
                <Button
                  size={'medium'}
                  variant={'secondaryOutline'}
                  className={cn(
                    'px-4 text-button-text-secondary hover:cursor-grab',
                    snapshot.isDraggingOver
                      ? 'hover:border-button-text-primary hover:text-button-text-primary group-hover:border-button-text-primary group-hover:text-button-text-primary'
                      : 'hover:border-button-text-secondary hover:text-button-text-secondary group-hover:border-button-text-secondary group-hover:text-button-text-secondary'
                  )}
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
                      d="M8.438 3.301c-.117-.04-.264-.05-.917-.05H4.336c-.48 0-.794 0-1.034.02-.231.02-.327.052-.382.08a.917.917 0 00-.401.4c-.028.056-.06.152-.08.383-.018.226-.02.518-.02.95h7.203l-.387-.773.636-.318-.636.318c-.291-.584-.366-.712-.455-.798a.917.917 0 00-.342-.212zm2.861 1.783l-.722-1.444-.044-.089c-.223-.447-.411-.824-.703-1.11l-.525.536.525-.536a2.417 2.417 0 00-.903-.558l-.2.58.2-.58c-.386-.133-.807-.133-1.307-.132H4.306c-.441 0-.817 0-1.126.025-.324.027-.64.085-.941.238a2.417 2.417 0 00-1.056 1.057c-.154.301-.212.617-.239.941C.92 4.321.92 4.697.92 5.138v8.395c0 .673 0 1.224.037 1.671.038.463.118.882.317 1.273a3.25 3.25 0 001.42 1.42c.391.199.81.28 1.273.318.448.036.998.036 1.672.036H14.367c.674 0 1.224 0 1.672-.037.463-.037.881-.118 1.272-.317a3.25 3.25 0 001.42-1.42c.2-.391.28-.81.318-1.273.037-.447.037-.998.037-1.671v-3.73c0-.673 0-1.224-.037-1.672-.038-.463-.118-.881-.317-1.272a3.25 3.25 0 00-1.42-1.42c-.392-.2-.81-.28-1.273-.318-.448-.037-.998-.037-1.672-.037H11.3zm-.478 1.5h3.515c.712 0 1.201.001 1.58.032.371.03.57.086.714.16.33.167.597.435.765.764.073.144.129.343.16.714.03.379.03.868.03 1.58v3.667c0 .713 0 1.202-.03 1.581-.031.37-.087.57-.16.714a1.75 1.75 0 01-.765.764c-.144.074-.343.13-.713.16-.38.03-.869.031-1.581.031H5.669c-.712 0-1.202 0-1.58-.032-.371-.03-.57-.085-.714-.159a1.75 1.75 0 01-.765-.764c-.074-.144-.129-.343-.16-.714-.03-.38-.03-.869-.03-1.58V6.583h8.4zm-.819 1.834a.75.75 0 01.75.75v1.75h1.75a.75.75 0 110 1.5h-1.75v1.75a.75.75 0 01-1.5 0v-1.75h-1.75a.75.75 0 010-1.5h1.75v-1.75a.75.75 0 01.75-.75z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <p className="text-base">Drop Chat to Add Folder</p>{' '}
                </Button>
                <div style={{ display: 'none' }}>{provided.placeholder}</div>{' '}
                {/* Info: 隱藏佔位元素，固定 button 位置，不受 drag-and-drop 影響 (20240704 - Shirley) */}
              </div>
            )}
          </Droppable>
        </div>
      </div>{' '}
    </DragDropContext>
  );
};

export const ChatSidebarMobile = () => {
  const router = useRouter();
  const { addEmptyChat } = useChatCtx();
  const { isSignedIn } = useUserCtx();

  const {
    targetRef: sidebarRef,
    componentVisible: isSidebarOpen,
    setComponentVisible: setIsSidebarOpen,
  } = useOuterClick<HTMLDivElement>(false);

  const newChatClickHandler = () => {
    // Info: redirect to / if now is not on / (20240627 - Shirley)
    if (router.pathname !== NATIVE_ROUTE.HOME) {
      router.push(NATIVE_ROUTE.HOME);
    } else {
      addEmptyChat();
    }
  };

  const discoverClickHandler = () => {
    router.push(NATIVE_ROUTE.DISCOVER);
  };

  const isDiscoverBtn = isSignedIn ? (
    <Button
      id="mobile-discover-button"
      type="button"
      onClick={discoverClickHandler}
      size={'small'}
      variant={'secondaryBorderless'}
      className="flex justify-center px-32px py-14px"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path
            className="fill-current"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.0029 1.2511C12.4171 1.2511 12.7529 1.58689 12.7529 2.0011V3.0011C12.7529 3.41531 12.4171 3.7511 12.0029 3.7511C11.5887 3.7511 11.2529 3.41531 11.2529 3.0011V2.0011C11.2529 1.58689 11.5887 1.2511 12.0029 1.2511ZM4.3725 4.37067C4.6654 4.07778 5.14027 4.07778 5.43316 4.37067L6.03326 4.97077C6.32615 5.26366 6.32615 5.73854 6.03326 6.03143C5.74037 6.32432 5.26549 6.32432 4.9726 6.03143L4.3725 5.43133C4.07961 5.13844 4.07961 4.66356 4.3725 4.37067ZM19.6336 4.37074C19.9264 4.66367 19.9264 5.13854 19.6334 5.4314L19.0332 6.0315C18.7403 6.32435 18.2654 6.32429 17.9725 6.03136C17.6797 5.73843 17.6797 5.26356 17.9727 4.9707L18.5729 4.3706C18.8658 4.07775 19.3407 4.07781 19.6336 4.37074ZM12.0029 6.7511C9.10343 6.7511 6.75293 9.1016 6.75293 12.0011C6.75293 14.9006 9.10343 17.2511 12.0029 17.2511C14.9024 17.2511 17.2529 14.9006 17.2529 12.0011C17.2529 9.1016 14.9024 6.7511 12.0029 6.7511ZM5.25293 12.0011C5.25293 8.27318 8.27501 5.2511 12.0029 5.2511C15.7309 5.2511 18.7529 8.27318 18.7529 12.0011C18.7529 14.7496 17.1102 17.1145 14.7529 18.1674V20.0011C14.7529 21.5199 13.5217 22.7511 12.0029 22.7511C10.4841 22.7511 9.25293 21.5199 9.25293 20.0011V18.1674C6.8957 17.1145 5.25293 14.7496 5.25293 12.0011ZM10.7529 18.6356V20.0011C10.7529 20.6915 11.3126 21.2511 12.0029 21.2511C12.6933 21.2511 13.2529 20.6915 13.2529 20.0011V18.6356C12.8478 18.7114 12.43 18.7511 12.0029 18.7511C11.5758 18.7511 11.158 18.7114 10.7529 18.6356ZM1.25293 12.0011C1.25293 11.5869 1.58872 11.2511 2.00293 11.2511H3.00293C3.41714 11.2511 3.75293 11.5869 3.75293 12.0011C3.75293 12.4153 3.41714 12.7511 3.00293 12.7511H2.00293C1.58872 12.7511 1.25293 12.4153 1.25293 12.0011ZM20.2529 12.0011C20.2529 11.5869 20.5887 11.2511 21.0029 11.2511H22.0029C22.4171 11.2511 22.7529 11.5869 22.7529 12.0011C22.7529 12.4153 22.4171 12.7511 22.0029 12.7511H21.0029C20.5887 12.7511 20.2529 12.4153 20.2529 12.0011Z"
          />
        </g>
      </svg>

      <div className="text-base font-normal leading-6 tracking-normal">Discover</div>
    </Button>
  ) : null;

  return (
    <div
      ref={sidebarRef}
      className={`absolute left-0 top-0 z-80 flex ${isSidebarOpen ? 'translate-x-0' : '-translate-x-250px'} items-start transition-all duration-300 ease-in-out lg:hidden`}
    >
      {/* Info: (20240705 - Julian) Mobile sidebar */}
      <div className={`h-screen w-250px bg-white`}>
        <div className="flex h-full w-full flex-col bg-surface-brand-primary-5 px-24px py-20px">
          {/* Info: (20240705 - Julian) New Chat Button */}
          <Button
            id="mobile-new-chat-button"
            type="button"
            onClick={newChatClickHandler}
            size={'small'}
            variant={'secondaryBorderless'}
            className="flex justify-center px-32px py-14px"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 20 20"
            >
              <g>
                <path
                  className="stroke-current"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M5.079 9.357A6.674 6.674 0 015 8.333c0-3.682 3.004-6.666 6.71-6.666 3.707 0 6.711 2.984 6.711 6.666 0 .832-.153 1.628-.433 2.362-.058.153-.088.23-.1.289a.744.744 0 00-.02.16c-.002.062.006.129.023.263l.335 2.725c.037.295.055.443.006.55a.417.417 0 01-.214.21c-.109.046-.256.024-.55-.019l-2.654-.389c-.139-.02-.208-.03-.271-.03a.743.743 0 00-.167.018c-.062.013-.14.042-.298.101a6.735 6.735 0 01-3.393.35m-4.325 3.41c2.47 0 4.473-2.052 4.473-4.583S8.83 9.167 6.36 9.167c-2.471 0-4.474 2.052-4.474 4.583 0 .509.08.998.23 1.456.063.193.095.29.105.356a.71.71 0 01.01.177c-.005.067-.022.142-.055.293l-.51 2.301 2.496-.34c.137-.02.205-.028.264-.028.063 0 .096.004.157.016.059.012.145.042.319.103a4.37 4.37 0 001.458.25z"
                ></path>
              </g>
            </svg>
            <div className="text-base font-normal leading-6 tracking-normal">New Chat</div>
          </Button>
          {/* Info: (20240705 - Julian) Discover Button */}
          {isDiscoverBtn}
          <hr className="my-16px bg-divider-stroke-lv-4" />
          <div className="mx-3 flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center">
              <Image
                src={'/logo/isunfa_pure_logo.svg'}
                width={20}
                height={20}
                alt="isunfa logo"
                className="z-10 h-5 w-5"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="none"
                viewBox="0 0 40 40"
                className="absolute"
              >
                <circle cx="20" cy="20" r="19" stroke="#CDD1D9" strokeWidth="2"></circle>
              </svg>
            </div>

            <p
              className={`text-lg font-medium text-button-text-secondary transition-all duration-300 ease-in-out`}
            >
              My Chat List
            </p>
            {/* ToDo: (20240705 - Julian) Folders & Chats */}
          </div>
        </div>
      </div>
      {/* Info: (20240705 - Julian) Mobile sidebar toggle */}
      <button
        id="mobile-sidebar-toggle"
        type="button"
        className="mx-8px my-16px bg-surface-neutral-surface-lv1 p-10px md:mx-80px"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.25293 6.0011C2.25293 5.58689 2.58872 5.2511 3.00293 5.2511H21.0029C21.4171 5.2511 21.7529 5.58689 21.7529 6.0011C21.7529 6.41531 21.4171 6.7511 21.0029 6.7511H3.00293C2.58872 6.7511 2.25293 6.41531 2.25293 6.0011ZM2.25293 12.0011C2.25293 11.5869 2.58872 11.2511 3.00293 11.2511H21.0029C21.4171 11.2511 21.7529 11.5869 21.7529 12.0011C21.7529 12.4153 21.4171 12.7511 21.0029 12.7511H3.00293C2.58872 12.7511 2.25293 12.4153 2.25293 12.0011ZM2.25293 18.0011C2.25293 17.5869 2.58872 17.2511 3.00293 17.2511H21.0029C21.4171 17.2511 21.7529 17.5869 21.7529 18.0011C21.7529 18.4153 21.4171 18.7511 21.0029 18.7511H3.00293C2.58872 18.7511 2.25293 18.4153 2.25293 18.0011Z"
              fill="#001840"
            />
          </g>
        </svg>
      </button>
    </div>
  );
};

export default ChatSidebar;
