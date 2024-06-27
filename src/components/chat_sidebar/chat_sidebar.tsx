import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/button/button';
import { useChatCtx } from '@/contexts/chat_context';
import { cn } from '@/lib/utils/common';
import useOuterClick from '@/lib/hooks/use_outer_click';
import { IChatBrief } from '@/interfaces/chat';

interface ChatSidebarProps {
  getIsExpanded?: (props: boolean) => void;
}

const ChatBriefItem = ({ chatBrief, key }: { chatBrief: IChatBrief; key: string }) => {
  const { selectChat, selectedChat, deleteChat } = useChatCtx();

  const {
    targetRef: editMenuRef,
    componentVisible: isEditMenuVisible,
    setComponentVisible: setEditMenuVisible,
  } = useOuterClick<HTMLDivElement>(false);

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
    deleteChat(chatBrief.id);
  };

  const displayedEditMenu = isEditMenuVisible && (
    <div className="relative">
      <div key={key} ref={editMenuRef} className="absolute right-0 top-0 z-50">
        <div className="shadow-userMenu flex flex-col gap-1 rounded-sm bg-white py-2 text-base font-normal leading-6 tracking-normal">
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
        onClick={() => selectChat(chatBrief.id)}
        className={cn(
          'flex items-center justify-between',
          chatBrief.id === selectedChat?.id ? 'bg-surface-brand-primary-10' : ''
        )}
      >
        <Button
          variant={'secondaryBorderless'}
          className={cn(
            'px-2 py-2',
            chatBrief.id === selectedChat?.id
              ? 'w-180px hover:text-button-text-secondary'
              : 'w-full'
          )}
        >
          <p className="truncate text-sm font-normal">{chatBrief.name}</p>
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

  return <div>{displayedChatBriefItem}</div>;
};

const ChatSidebar = ({ getIsExpanded }: ChatSidebarProps) => {
  const { chatBriefs } = useChatCtx();

  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
    if (getIsExpanded) {
      getIsExpanded(!isExpanded);
    }
  };

  const displayedChatBrief =
    chatBriefs &&
    chatBriefs.length > 0 &&
    chatBriefs.map((chat) => <ChatBriefItem chatBrief={chat} key={chat.id} />);

  return (
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
            {displayedChatBrief}
          </div>{' '}
        </div>

        <div className="-mt-3">
          <Button
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
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
