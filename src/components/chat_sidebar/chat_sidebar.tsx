import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';
import { useState } from 'react';
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
  const { selectChat, selectedChat, deleteChat } = useChatCtx();
  const { messageModalVisibilityHandler, messageModalDataHandler } = useGlobalCtx();

  const {
    targetRef: editMenuRef,
    componentVisible: isEditMenuVisible,
    setComponentVisible: setEditMenuVisible,
  } = useOuterClick<HTMLDivElement>(false);

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
    setEditMenuVisible(false);
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
          <Button
            disabled
            variant={'secondaryBorderless'}
            className=""
            onClick={renameClickHandler}
          >
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
        onClick={chatBriefClickHandler}
        className={cn(
          'flex w-full items-center justify-between',
          chatBrief.id === selectedChat?.id ? 'bg-surface-brand-primary-10' : ''
        )}
      >
        <Button
          variant={'secondaryBorderless'}
          className={cn(
            'justify-start px-2 py-2 text-start',
            chatBrief.id === selectedChat?.id
              ? 'pointer-events-none w-150px hover:text-button-text-secondary'
              : 'w-full'
          )}
        >
          <p className="truncate text-start text-sm font-normal">{chatBrief.name}</p>
        </Button>
        {chatBrief.id === selectedChat?.id && (
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
      isDragDisabled={false} // Always allow dragging

      // isDragDisabled={chatBrief.id !== selectedChat?.id}
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
  const { messageModalDataHandler, messageModalVisibilityHandler } = useGlobalCtx();
  const [isFolderExpanded, setIsFolderExpanded] = useState(true);

  const {
    targetRef: editMenuRef,
    componentVisible: isEditMenuVisible,
    setComponentVisible: setEditMenuVisible,
  } = useOuterClick<HTMLDivElement>(false);

  const editIconClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setEditMenuVisible(!isEditMenuVisible);
  };

  const renameClickHandler = () => {
    setEditMenuVisible(false);
  };

  const shareClickHandler = () => {
    setEditMenuVisible(false);
  };

  const removeClickHandler = () => {
    messageModalDataHandler({
      title: 'Remove Folder',
      messageType: MessageType.WARNING,
      redMsg: 'Are you sure you want to delete this folder?\nThis action cannot be undone!',
      backBtnStr: 'Cancel',
      submitBtnStr: 'Remove',
      submitBtnFunction: () => {
        // ToDo: (20240702 - Julian) 這邊要寫刪除資料夾的 function
        setEditMenuVisible(false);
      },
    });
    messageModalVisibilityHandler();
  };

  const displayedEditMenu = isEditMenuVisible && (
    <div className="relative">
      <div key={chatFolder.id} ref={editMenuRef} className="absolute right-4 top-6 z-50">
        <div className="flex flex-col gap-1 rounded-sm bg-white py-2 text-base font-normal leading-6 tracking-normal shadow-userMenu">
          <Button
            disabled
            variant={'secondaryBorderless'}
            className=""
            onClick={renameClickHandler}
          >
            Rename Folder
          </Button>
          <Button disabled variant={'secondaryBorderless'} className="" onClick={shareClickHandler}>
            Share Folder
          </Button>

          <Button
            disabled
            variant={'secondaryBorderless'}
            className=""
            onClick={removeClickHandler}
          >
            Remove Folder
          </Button>
        </div>
      </div>
    </div>
  );
  const displayedFolder = (
    <div key={chatFolder.id} className="w-full pb-2 pt-0">
      <div
        onClick={() => setIsFolderExpanded(!isFolderExpanded)}
        className={cn(
          'flex w-full items-center justify-between gap-2 px-2 text-base font-medium leading-6 tracking-normal text-slate-700 hover:cursor-pointer'
        )}
      >
        <div className="flex gap-2.5">
          {/* Info: 橘色圓圈 (20240704 - Shirley) */}
          <div className="my-auto h-2 w-2 shrink-0 rounded-full bg-orange-400" />

          <div className={cn(isFolderExpanded ? 'w-120px' : 'w-160px')}>
            <p className="truncate">{chatFolder.name}</p>
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
                  <g clipPath="url(#clip0_487_4271)">
                    <path
                      className="fill-current"
                      fillRule="evenodd"
                      d="M11.863 1.445a2.131 2.131 0 013.014 3.014L8.65 10.685l-.04.04c-.185.185-.358.359-.568.487a2.053 2.053 0 01-.593.246c-.239.057-.484.057-.745.057H5.557a.75.75 0 01-.75-.75v-1.09-.058c0-.261 0-.506.057-.745.05-.21.133-.41.245-.593.129-.21.302-.383.487-.567a38.7 38.7 0 00.041-.041l6.226-6.226zm1.953 1.06a.631.631 0 00-.893 0L6.698 8.733c-.25.25-.286.292-.31.33a.552.552 0 00-.066.16c-.01.043-.015.098-.015.452v.34h.34c.354 0 .41-.004.453-.015a.552.552 0 00.16-.066c.037-.023.08-.058.33-.309l6.226-6.226a.631.631 0 000-.892zm-9.07-.303H7.51a.75.75 0 010 1.5H4.776c-.56 0-.934 0-1.222.024-.28.023-.41.064-.496.107-.227.116-.41.3-.526.526-.044.086-.084.217-.107.496a16.76 16.76 0 00-.024 1.222v5.469c0 .56 0 .934.024 1.222.023.279.063.41.107.496.115.226.3.41.526.526.085.043.217.084.496.107.288.023.663.024 1.222.024h5.469c.559 0 .933 0 1.221-.024.28-.023.411-.064.497-.107.226-.116.41-.3.526-.526.043-.086.084-.217.106-.496.024-.289.025-.663.025-1.222V8.81a.75.75 0 011.5 0V11.576c0 .521 0 .957-.03 1.314-.03.372-.096.723-.265 1.055-.26.508-.673.922-1.181 1.181-.333.17-.683.235-1.056.266-.356.029-.792.029-1.313.029h-5.53c-.52 0-.957 0-1.313-.03-.372-.03-.723-.095-1.055-.265a2.703 2.703 0 01-1.181-1.181c-.17-.332-.236-.683-.266-1.055-.03-.357-.03-.793-.03-1.314V6.047c0-.521 0-.957.03-1.314.03-.372.096-.723.265-1.055.26-.509.673-.922 1.182-1.181.332-.17.683-.235 1.055-.266.356-.029.792-.029 1.314-.029z"
                      clipRule="evenodd"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_487_4271">
                      <path fill="#fff" d="M0 0H16V16H0z"></path>
                    </clipPath>
                  </defs>
                </svg>
              </Button>
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
  const { signedIn } = useUserCtx();
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

    // Deprecated: (20240720 - Shirley)
    // eslint-disable-next-line no-console
    console.log('onDragEnd', 'result:', result, 'ids:', chatId, destinationId);

    if (destinationId === 'new-folder') {
      if (chatBriefs) {
        const chat = chatBriefs.find((item) => item.id === chatId);

        if (chat) {
          const id = uuidv4();
          const newFolder: IFolder = {
            id,
            name: `New Folder ${id}`,
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
    signedIn && // TODO: for demo，實際上要限制沒登入就不能新增資料夾，理論上這個條件不應該發生 (20240628 - Shirley)
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

  // const displayedFolders =
  //   signedIn &&
  //   folders &&
  //   folders.length > 0 &&
  //   folders.map((folder) => (
  //     <Droppable droppableId={`folder-${folder.id}`} key={folder.id}>
  //       {(provided) => (
  //         <div {...provided.droppableProps} ref={provided.innerRef}>
  //           <ChatFolderItem chatFolder={folder} key={folder.id} />
  //           {folder.chats.map((chat, index) => (
  //             <ChatBriefItem chatBrief={chat} key={chat.id} index={index} />
  //           ))}
  //           {provided.placeholder}
  //         </div>
  //       )}
  //     </Droppable>
  //   ));

  const displayedChatBriefs =
    signedIn && // TODO: for demo，實際上要限制沒登入就只能替代 chats array 中最後一個 chat (20240628 - Shirley)
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
          className={`fixed z-10 hidden h-screen flex-col items-center bg-surface-brand-primary-5 lg:flex ${isExpanded ? 'w-240px' : 'w-0 -translate-x-240px'} px-12px pb-40px pt-100px transition-all duration-300 ease-in-out`}
        >
          <div className="flex h-full w-full flex-col">
            <div className="mx-3 -mt-5 flex items-center gap-3">
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
            {/* <Droppable droppableId="chat-list">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="hideScrollbar mb-10 mt-5 grow overflow-y-auto overflow-x-hidden"
                >
                  {displayedFolders}
                  {displayedChatBriefs}
                  {provided.placeholder}
                </div>
              )}
            </Droppable> */}
          </div>

          <Droppable droppableId="new-folder">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="-mt-5">
                <Button
                  size={'medium'}
                  variant={'secondaryOutline'}
                  className="px-4 text-button-text-secondary"
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
                <div style={{ display: 'none' }}>{provided.placeholder}</div> {/* 隱藏佔位元素 */}
              </div>
            )}
          </Droppable>

          {/* <div className="-mt-3">
            <Button
              onClick={addFolderClickHandler}
              size={'medium'}
              variant={'secondaryOutline'}
              className="text-button-text-secondary"
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
              <p className="text-base">Add New Folder</p>{' '}
            </Button>
          </div> */}
        </div>
      </div>{' '}
    </DragDropContext>
  );
};

export default ChatSidebar;
