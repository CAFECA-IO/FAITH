import Image from 'next/image';
import { Button } from '@/components/button/button';
import useOuterClick from '@/lib/hooks/use_outer_click';
import { cn, timestampToString } from '@/lib/utils/common';
import { IChat } from '@/interfaces/chat';

interface IChatItemProps {
  chat: IChat;
}

const ChatItem = ({ chat }: IChatItemProps) => {
  const { name, createdAt, messages } = chat;
  const lastMessage = messages[messages.length - 2].messages;
  const latestQuestion = lastMessage[lastMessage.length - 1].content;

  const {
    targetRef: actionRef,
    componentVisible: actionVisible,
    setComponentVisible: setActionVisible,
  } = useOuterClick<HTMLDivElement>(false);

  const actionToggleHandler = () => {
    setActionVisible(!actionVisible);
  };
    
    const isShowPrivateIcon = chat.isPrivate ?  <Image src="/icons/private.svg" width={16} height={16} alt="private_icon" />: null;

  return (
    <div className="table-row hover:bg-surface-brand-primary-10">
      <div className="table-cell rounded-l-sm px-20px py-12px">
        <div className="flex items-center gap-8px">
          <p>{name}</p>
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
          <Button type="button" variant="tertiaryBorderless" className="w-full py-8px">
            Rename
          </Button>
          <Button type="button" variant="tertiaryBorderless" className="w-full py-8px">
            Share
          </Button>
          <Button type="button" variant="tertiaryBorderless" className="w-full py-8px">
            Move
          </Button>
          <Button type="button" variant="tertiaryBorderless" className="w-full py-8px">
            Set to Private
          </Button>
          <Button type="button" variant="tertiaryBorderless" className="w-full py-8px">
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
