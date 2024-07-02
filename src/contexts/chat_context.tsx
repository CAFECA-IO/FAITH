import { v4 as uuidv4 } from 'uuid';
import { useUserCtx } from '@/contexts/user_context';
import {
  DisplayedFeedback,
  IChat,
  IChatBrief,
  IFolder,
  IMessage,
  IMessageWithoutRole,
  MessageRole,
  dummyChatBriefs,
  dummyChats,
  dummyFolders,
} from '@/interfaces/chat';
import { getTimestamp, isValidFileType, timestampToString, wait } from '@/lib/utils/common';
import {
  DELAYED_FILE_UPLOAD_MILLISECONDS,
  DELAYED_RESPONSE_MILLISECONDS,
} from '@/constants/display';
import { createContext, useContext, useEffect } from 'react';
import useStateRef from 'react-usestateref';
import { useRouter } from 'next/router';
import { NATIVE_ROUTE } from '@/constants/url';
import { FileStatus, FileStatusUnion, IFile } from '@/interfaces/file';
import { LIMIT_FOR_FILE_SIZE } from '@/constants/config';

interface ChatContextType {
  selectedChat: IChat | null;
  setSelectedChat: (chat: IChat | null) => void;
  selectChat: (id: string) => void;

  addMessage: (message: IMessage) => void;
  userAddMessage: (message: IMessageWithoutRole) => void;
  updateMessage: (messageIndex: number, updatedMessage: IMessage) => void;
  deleteMessage: (messageIndex: number) => void;
  resendMessage: (messageIndex: number) => void;
  dislikedMsg: string[];
  resentMsg: string[];
  addDislikedMsg: (messageId: string) => void;
  addResentMsg: (messageId: string) => void;
  displayedFeedback: DisplayedFeedback;

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

  file: IFile | null;
  handleFile: (file: File) => void;
  cancelUpload: () => void;
  createIFile: (file: File, status: FileStatusUnion) => IFile;
  clearFile: () => void;
  saveFile: (item: IFile) => void;
  retryFileUpload: () => void;
}

const ChatContext = createContext<ChatContextType>({
  selectedChat: null,
  setSelectedChat: () => {},
  selectChat: () => {},

  addMessage: () => {},
  userAddMessage: () => {},
  updateMessage: () => {},
  deleteMessage: () => {},
  resendMessage: () => {},
  dislikedMsg: [],
  resentMsg: [],
  addDislikedMsg: () => {},
  addResentMsg: () => {},
  displayedFeedback: DisplayedFeedback.RESEND,

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

  file: null,
  handleFile: () => {},
  cancelUpload: () => {},
  createIFile: () => ({ id: '', data: new File([], ''), status: FileStatus.success }) as IFile,
  clearFile: () => {},
  saveFile: () => {},
  retryFileUpload: () => {},
});

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { signedIn } = useUserCtx();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [chatBriefs, setChatBriefs, chatBriefsRef] = useStateRef<IChatBrief[] | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [chats, setChats, chatsRef] = useStateRef<IChat[] | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [folders, setFolders, foldersRef] = useStateRef<IFolder[] | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedChat, setSelectedChat, selectedChatRef] = useStateRef<IChat | null>(null);
  const [file, setFile] = useStateRef<IFile | null>(null);
  const [uploadTimeout, setUploadTimeout] = useStateRef<NodeJS.Timeout | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dislikedMsg, setDislikedMsg, dislikedMsgRef] = useStateRef<string[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [resentMsg, setResentMsg, resentMsgRef] = useStateRef<string[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [displayedFeedback, setDisplayedFeedback, displayedFeedbackRef] =
    useStateRef<DisplayedFeedback>(DisplayedFeedback.RESEND);

  const addDislikedMsg = (messageId: string) => {
    setDislikedMsg((prev) => [...prev, messageId]);
    setDisplayedFeedback(DisplayedFeedback.DISLIKE);
  };

  const addResentMsg = (messageId: string) => {
    setResentMsg((prev) => [...prev, messageId]);
    setDisplayedFeedback(DisplayedFeedback.RESEND);
  };

  const saveFile = (item: IFile) => {
    // ToDo: (20240628 - Shirley) 保存文件到服務器
    // eslint-disable-next-line no-console
    console.log('saveFile', item);
  };

  const createIFile = (newFile: File, status: FileStatusUnion): IFile => {
    const iFile = {
      id: uuidv4(),
      data: newFile,
      status,
    };
    setFile(iFile);
    return iFile;
  };

  const handleFile = (newFile: File) => {
    let iFile = createIFile(newFile, FileStatus.uploading);
    setFile(iFile);

    const timeoutId = setTimeout(() => {
      let fileStatus = FileStatus.uploading;

      if (isValidFileType(newFile)) {
        // Info: file size <= 50MB (20240701 - Shirley)
        if (newFile.size > LIMIT_FOR_FILE_SIZE) {
          fileStatus = FileStatus.error;
        } else {
          fileStatus = FileStatus.success;
        }
      } else {
        fileStatus = FileStatus.error;
      }

      iFile = createIFile(newFile, fileStatus);
      setFile(iFile);

      if (iFile) {
        saveFile(iFile);
      }
      setUploadTimeout(null);
    }, DELAYED_FILE_UPLOAD_MILLISECONDS);

    setUploadTimeout(timeoutId);
  };

  const retryFileUpload = () => {
    if (file && file.status === FileStatus.error) {
      handleFile(file.data);
    }
  };

  const cancelUpload = () => {
    if (uploadTimeout) {
      clearTimeout(uploadTimeout);
      setUploadTimeout(null);
    }
    setFile(null);
  };

  const clearFile = () => {
    if (uploadTimeout) {
      clearTimeout(uploadTimeout);
      setUploadTimeout(null);
    }
    setFile(null);
  };

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

  const userAddMessage = (message: IMessageWithoutRole) => {
    const role = signedIn ? MessageRole.USER : MessageRole.VISITOR;
    addMessage({ role, messages: [message] });
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

  const resendMessage = (messageIndex: number) => {
    if (selectedChatRef.current) {
      const updatedChat = {
        ...selectedChatRef.current,
        messages: selectedChatRef.current.messages.map((msg, index) => {
          if (index === messageIndex && msg.role === MessageRole.BOT) {
            const oldMsg = msg.messages[0].content;
            const newMsg = {
              ...msg.messages[0],
              content: oldMsg + ' ' + getTimestamp(),
              id: uuidv4(),
              dislike: false,
              like: false,
            };
            return {
              ...msg,
              messages: [...msg.messages, newMsg],
            };
          }
          return msg;
        }),
      };
      setSelectedChat(updatedChat);
      // TODO: add the latest msg into resentMsg array (20240702 - Shirley)
      // addResentMsg(updatedChat.messages[0].messages[0].id);
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
    if (!signedIn) return;
    const existingBrief = chatBriefsRef.current?.find((brief) => brief.id === item.id);
    if (!existingBrief) {
      setChatBriefs([...(chatBriefsRef.current || []), item]);
      const newChat: IChat = {
        id: item.id,
        name: item.name,
        description: item.description,
        messages: [],
        createdAt: item.createdAt,
        folders: [],
      };
      setChats([...(chatsRef.current || []), newChat]);
    }
  };

  const renameChatBrief = (id: string, newName: string) => {
    if (chatBriefsRef.current) {
      setChatBriefs(
        chatBriefsRef.current.map((brief: IChatBrief) =>
          brief.id === id ? { ...brief, name: newName } : brief
        )
      );
      setChats(
        chatsRef.current?.map((chat: IChat) =>
          chat.id === id ? { ...chat, name: newName } : chat
        ) || []
      );
    }
  };

  const deleteChatBrief = (id: string) => {
    if (chatBriefsRef.current) {
      setChatBriefs(chatBriefsRef.current.filter((brief: IChatBrief) => brief.id !== id));
      setChats(chatsRef.current?.filter((chat: IChat) => chat.id !== id) || []);
    }
  };

  const handleChats = (items: IChat[]) => {
    setChats(items);
    setChatBriefs(
      items.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        createdAt: item.createdAt,
        folders: item.folders,
      }))
    );
  };

  const selectChat = (id: string) => {
    if (chatsRef.current) {
      setSelectedChat(chatsRef.current.find((chat) => chat.id === id) || null);
    }
  };

  const sortChats = () => {
    if (chatsRef.current) {
      setChats(chatsRef.current.sort((a, b) => b.createdAt - a.createdAt));
    }
    if (chatBriefsRef.current) {
      setChatBriefs(chatBriefsRef.current.sort((a, b) => b.createdAt - a.createdAt));
    }
  };

  const addChat = (item: IChat) => {
    const existingChat = chatsRef.current?.find((chat) => chat.id === item.id);
    if (!existingChat) {
      setSelectedChat(item);
      handleChats([...(chatsRef.current || []), item]);
      addChatBrief({
        id: item.id,
        name: item.name,
        description: item.description,
        createdAt: item.createdAt,
        folders: [],
      });
      sortChats();
    }
  };

  const addEmptyChat = () => {
    const nowTs = getTimestamp();
    const { date, time } = timestampToString(nowTs);
    const randomId = uuidv4();
    const chat: IChat = {
      id: randomId,
      name: `Chat - ${time} - ${randomId}`,
      messages: [],
      description: `Chat - ${date} ${time}`,
      createdAt: nowTs,
      folders: [],
    };
    addChat(chat);
  };

  const renameChat = (id: string, newName: string) => {
    if (chatsRef.current) {
      setChats(
        chatsRef.current.map((chat: IChat) => (chat.id === id ? { ...chat, name: newName } : chat))
      );
      setChatBriefs(
        chatBriefsRef.current?.map((brief: IChatBrief) =>
          brief.id === id ? { ...brief, name: newName } : brief
        ) || []
      );
    }
  };

  const deleteChat = (id: string) => {
    if (chatsRef.current) {
      setChats(chatsRef.current.filter((chat: IChat) => chat.id !== id));
    }
    deleteChatBrief(id);

    if (foldersRef.current) {
      setFolders(
        foldersRef.current
          .map((folder: IFolder) => ({
            ...folder,
            chats: folder.chats.filter((chat) => chat.id !== id),
          }))
          .filter((folder) => folder.chats.length > 0)
      );
    }

    const chatLength = chatsRef.current?.length;
    if (chatLength && chatLength > 0) {
      selectChat(chatsRef.current?.[0]?.id || '');
    } else {
      addEmptyChat();
    }
  };

  const handleFolders = (items: IFolder[]) => {
    setFolders(items);
  };

  const addFolder = (item: IFolder) => {
    if (!signedIn) return;

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

  const clearData = () => {
    setChats([]);
    setChatBriefs([]);
    setFolders([]);
  };

  useEffect(() => {
    if (signedIn) {
      setChats(dummyChats);
      setSelectedChat(dummyChats[0]);
      setChatBriefs(dummyChatBriefs);
      setFolders(dummyFolders);
    } else {
      clearData();
    }
  }, [signedIn]);

  useEffect(() => {
    if (router.pathname === NATIVE_ROUTE.HOME && !signedIn) {
      addEmptyChat();
    }
  }, [router.pathname]);

  useEffect(() => {
    if (selectedChatRef?.current?.messages.length === 0) return;
    const addBotMessage = async () => {
      if (
        selectedChatRef?.current?.messages &&
        selectedChatRef?.current?.messages.length > 0 &&
        selectedChatRef.current?.messages.at(-1)?.role !== MessageRole.BOT
      ) {
        const botMessage: IMessage = {
          role: MessageRole.BOT,
          messages: [
            {
              id: uuidv4(),
              content: 'Sure!',
              createdAt: getTimestamp(),
            },
          ],
        };

        await wait(DELAYED_RESPONSE_MILLISECONDS);

        addMessage(botMessage);
      }
    };

    addBotMessage();
  }, [selectedChatRef.current?.messages]);

  /* eslint-disable react/jsx-no-constructed-context-values */
  const value = {
    selectedChat: selectedChatRef.current,
    setSelectedChat,
    selectChat,

    addMessage,
    userAddMessage,
    updateMessage,
    deleteMessage,
    resendMessage,
    dislikedMsg: dislikedMsgRef.current,
    addDislikedMsg,
    resentMsg: resentMsgRef.current,
    addResentMsg,
    displayedFeedback: displayedFeedbackRef.current,

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

    file,
    handleFile,
    cancelUpload,
    saveFile,
    createIFile,
    clearFile,
    retryFileUpload,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatCtx = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatCtx must be used within a ChatProvider');
  }
  return context;
};
