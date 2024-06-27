import { v4 as uuidv4 } from 'uuid';
import { useUserCtx } from '@/contexts/user_context';
import {
  IChat,
  IChatBrief,
  IFolder,
  IMessage,
  IMessageWithoutSender,
  MessageRole,
} from '@/interfaces/chat';
import { getTimestamp, timestampToString, wait } from '@/lib/utils/common';
import { DELAYED_RESPONSE_MILLISECONDS } from '@/lib/utils/display';
import { createContext, useContext, useEffect, useMemo } from 'react';
import useStateRef from 'react-usestateref';
import { useRouter } from 'next/router';
import { NATIVE_ROUTE } from '@/constants/url';

interface ChatContextType {
  selectedChat: IChat | null;
  setSelectedChat: (chat: IChat | null) => void;
  addMessage: (message: IMessage) => void;
  userAddMessage: (message: IMessageWithoutSender) => void;
  updateMessage: (messageIndex: number, updatedMessage: IMessage) => void;
  deleteMessage: (messageIndex: number) => void;

  chatBriefs: IChatBrief[] | null;
  handleChatBriefs: (chatBriefs: IChatBrief[]) => void;
  addChatBrief: (chatBrief: IChatBrief) => void;
  renameChatBrief: (id: string, newName: string) => void;
  deleteChatBrief: (id: string) => void;

  chats: IChat[] | null;
  handleChats: (chats: IChat[]) => void;
  addChat: (chat: IChat) => void;
  addEmptyChat: () => void;
  renameChat: (id: string, newName: string) => void;
  deleteChat: (id: string) => void;

  folders: IFolder[] | null;
  handleFolders: (folders: IFolder[]) => void;
  addFolder: (folder: IFolder) => void;
  renameFolder: (id: string, newName: string) => void;
  deleteFolder: (id: string) => void;
}

const ChatContext = createContext<ChatContextType>({
  selectedChat: null,
  setSelectedChat: () => {},
  addMessage: () => {},
  userAddMessage: () => {},
  updateMessage: () => {},
  deleteMessage: () => {},

  chatBriefs: null as IChatBrief[] | null,
  handleChatBriefs: () => {},
  addChatBrief: () => {},
  renameChatBrief: () => {},
  deleteChatBrief: () => {},

  chats: null as IChat[] | null,
  handleChats: () => {},
  addChat: () => {},
  addEmptyChat: () => {},
  renameChat: () => {},
  deleteChat: () => {},

  folders: null as IFolder[] | null,
  handleFolders: () => {},
  addFolder: () => {},
  renameFolder: () => {},
  deleteFolder: () => {},
});

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const userCtx = useUserCtx();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [chatBriefs, setChatBriefs, chatBriefsRef] = useStateRef<IChatBrief[] | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [chats, setChats, chatsRef] = useStateRef<IChat[] | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [folders, setFolders, foldersRef] = useStateRef<IFolder[] | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedChat, setSelectedChat, selectedChatRef] = useStateRef<IChat | null>(null);

  const addMessage = (message: IMessage) => {
    if (selectedChatRef.current) {
      const updatedChat = {
        ...selectedChatRef.current,
        messages: [...selectedChatRef.current.messages, message],
      };
      setSelectedChat(updatedChat);
      if (chatsRef.current) {
        setChats(
          chatsRef.current.map((chat: IChat) => (chat.id === updatedChat.id ? updatedChat : chat))
        );
      }
    }
  };

  const userAddMessage = (message: IMessageWithoutSender) => {
    const role = userCtx.user ? MessageRole.USER : MessageRole.VISITOR;
    addMessage({ ...message, role });
  };

  const updateMessage = (messageIndex: number, updatedMessage: IMessage) => {
    if (selectedChatRef.current) {
      const updatedChat = {
        ...selectedChatRef.current,
        messages: selectedChatRef.current.messages.map((msg: IMessage, index: number) =>
          index === messageIndex ? updatedMessage : msg
        ),
      };
      setSelectedChat(updatedChat);
      if (chatsRef.current) {
        setChats(
          chatsRef.current.map((chat: IChat) => (chat.id === updatedChat.id ? updatedChat : chat))
        );
      }
    }
  };

  const deleteMessage = (messageIndex: number) => {
    if (selectedChatRef.current) {
      const updatedChat = {
        ...selectedChatRef.current,
        messages: selectedChatRef.current.messages.filter(
          (_: IMessage, index: number) => index !== messageIndex
        ),
      };
      setSelectedChat(updatedChat);
      if (chatsRef.current) {
        setChats(
          chatsRef.current.map((chat: IChat) => (chat.id === updatedChat.id ? updatedChat : chat))
        );
      }
    }
  };

  const handleChatBriefs = (items: IChatBrief[]) => {
    setChatBriefs(items);
  };

  const addChatBrief = (item: IChatBrief) => {
    if (chatBriefsRef.current) {
      setChatBriefs([...chatBriefsRef.current, item]);
    }
  };

  const renameChatBrief = (id: string, newName: string) => {
    if (chatBriefsRef.current) {
      setChatBriefs(
        chatBriefsRef.current.map((brief: IChatBrief) =>
          brief.id === id ? { ...brief, name: newName } : brief
        )
      );
    }
  };

  const deleteChatBrief = (id: string) => {
    if (chatBriefsRef.current) {
      setChatBriefs(chatBriefsRef.current.filter((brief: IChatBrief) => brief.id !== id));
    }
  };

  const handleChats = (items: IChat[]) => {
    setChats(items);
  };

  const addChat = (item: IChat) => {
    // TODO: in dev (20240626 - Shirley)
    // if (chatsRef.current) {
    //   setChats([...chatsRef.current, item]);
    // }
    // Info: 未登入情況下使用聊天簡介頁面，選擇聊天後，將聊天簡介頁面選項清空
    if (!userCtx.user) {
      // add the brand new chat
      setSelectedChat(item);
    }
  };

  const addEmptyChat = () => {
    const nowTs = getTimestamp();
    const { time } = timestampToString(nowTs);
    const chat = {
      id: uuidv4(),
      name: `Chat - ${time}`,
      messages: [],
      description: '',
      createdAt: nowTs,
    };
    addChat(chat);
  };

  const renameChat = (id: string, newName: string) => {
    if (chatsRef.current) {
      setChats(
        chatsRef.current.map((chat: IChat) => (chat.id === id ? { ...chat, name: newName } : chat))
      );
    }
  };

  const deleteChat = (id: string) => {
    if (chatsRef.current) {
      setChats(chatsRef.current.filter((chat: IChat) => chat.id !== id));
    }
  };

  const handleFolders = (items: IFolder[]) => {
    setFolders(items);
  };

  const addFolder = (item: IFolder) => {
    if (foldersRef.current) {
      setFolders([...foldersRef.current, item]);
    }
  };

  const renameFolder = (id: string, newName: string) => {
    if (foldersRef.current) {
      setFolders(
        foldersRef.current.map((folder: IFolder) =>
          folder.id === id ? { ...folder, name: newName } : folder
        )
      );
    }
  };

  const deleteFolder = (id: string) => {
    if (foldersRef.current) {
      setFolders(foldersRef.current.filter((folder: IFolder) => folder.id !== id));
    }
  };

  // Info: add a chat from the beginning (20240627 - Shirley)
  useEffect(() => {
    if (router.pathname === NATIVE_ROUTE.HOME) {
      addEmptyChat();
    }
  }, [router.pathname]);

  // TODO: 機器人隔 0.5 秒後自動回覆罐頭訊息 (20240626 - Shirley)
  useEffect(() => {
    if (selectedChatRef?.current?.messages.length === 0) return;
    const addBotMessage = async () => {
      if (selectedChatRef.current?.messages.at(-1)?.role !== MessageRole.BOT) {
        const botMessage = {
          id: uuidv4(),
          role: MessageRole.BOT,
          content: 'Sure!',
          createdAt: getTimestamp(),
        };

        await wait(DELAYED_RESPONSE_MILLISECONDS);

        addMessage(botMessage);
      }
    };

    addBotMessage();
  }, [selectedChatRef.current?.messages]);

  const value = useMemo(
    () => ({
      selectedChat: selectedChatRef.current,
      setSelectedChat,
      addMessage,
      userAddMessage,
      updateMessage,
      deleteMessage,

      chatBriefs: chatBriefsRef.current,
      handleChatBriefs,
      addChatBrief,
      renameChatBrief,
      deleteChatBrief,

      chats: chatsRef.current,
      handleChats,
      addChat,
      addEmptyChat,
      renameChat,
      deleteChat,

      folders: foldersRef.current,
      handleFolders,
      addFolder,
      renameFolder,
      deleteFolder,
    }),
    [chatBriefsRef.current, chatsRef.current, foldersRef.current, selectedChatRef.current]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatCtx = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatCtx must be used within a ChatProvider');
  }
  return context;
};
