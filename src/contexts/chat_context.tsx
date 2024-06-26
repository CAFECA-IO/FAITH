import { IChat, IFolder } from '@/interfaces/chat';
import { createContext, useContext, useMemo } from 'react';
import useStateRef from 'react-usestateref';

interface ChatContextType {
  chatList: IChat[];
  handleChats: (chats: IChat[]) => void;
  addChat: (chat: IChat) => void;
  folders: IFolder[];
  handleFolders: (folders: IFolder[]) => void;
  addFolder: (folder: IFolder) => void;
}

const ChatContext = createContext<ChatContextType>({
  chatList: [] as IChat[],
  handleChats: () => {},
  addChat: () => {},
  folders: [] as IFolder[],
  handleFolders: () => {},
  addFolder: () => {},
});

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [chatList, setChatList, chatListRef] = useStateRef<IChat[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [folderList, setFolderList, folderListRef] = useStateRef<IFolder[]>([]);

  const handleChats = (chats: IChat[]) => {
    setChatList(chats);
  };

  const addChat = (chat: IChat) => {
    setChatList([...chatListRef.current, chat]);
  };

  const handleFolders = (folders: IFolder[]) => {
    setFolderList(folders);
  };

  const addFolder = (folder: IFolder) => {
    setFolderList([...folderListRef.current, folder]);
  };

  const value = useMemo(
    () => ({
      chatList: chatListRef.current,
      handleChats,
      addChat,
      folders: folderListRef.current,
      handleFolders,
      addFolder,
    }),
    [chatListRef.current]
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
