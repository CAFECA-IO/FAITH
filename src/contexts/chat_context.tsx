import { v4 as uuidv4 } from 'uuid';
import { useUserCtx } from '@/contexts/user_context';
import {
  DisplayedFeedback,
  IChat,
  IChatBrief,
  IFolder,
  IMessageWithRole,
  IMessage,
  MessageRole,
  dummyChatBriefs,
  dummyChats,
  dummyFolders,
} from '@/interfaces/chat';
import { getTimestamp, isValidFileType, timestampToString } from '@/lib/utils/common';
import { DELAYED_FILE_UPLOAD_MILLISECONDS } from '@/constants/display';
import { createContext, useContext, useEffect } from 'react';
import useStateRef from 'react-usestateref';
import { useRouter } from 'next/router';
import { EXTERNAL_API, NATIVE_ROUTE } from '@/constants/url';
import { FileStatus, FileStatusUnion, IFile } from '@/interfaces/file';
import { LIMIT_FOR_FILE_SIZE } from '@/constants/config';

interface ChatContextType {
  selectedChat: IChat | null;
  setSelectedChat: (chat: IChat | null) => void;
  selectChat: (id: string) => void;

  addMessage: (message: IMessageWithRole) => void;
  userAddMessage: (message: IMessage) => void;
  updateMessage: (messageIndex: number, updatedMessage: IMessageWithRole) => void;
  deleteMessage: (messageIndex: number) => void;
  resendMessage: (messageIndex: number) => Promise<void>;
  dislikedMsg: string[];
  resentMsg: string[];
  addDislikedMsg: (messageId: string) => void;
  addResentMsg: (messageId: string) => void;
  displayedFeedback: DisplayedFeedback;
  isPendingBotMsg: boolean;
  pendingMsg: string[];
  addPendingMsg: (messageId: string) => void;
  removePendingMsg: (messageId: string) => void;

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
  addFolder: (folder: IFolder, chat?: IChatBrief) => void;
  renameFolder: (id: string, newName: string) => void;
  deleteFolder: (id: string) => void;
  moveChatToFolder: (chatId: string, folderId: string) => void;

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
  resendMessage: () => Promise.resolve(),
  dislikedMsg: [],
  resentMsg: [],
  addDislikedMsg: () => {},
  addResentMsg: () => {},
  displayedFeedback: DisplayedFeedback.RESEND,
  isPendingBotMsg: false,
  pendingMsg: [],
  addPendingMsg: () => {},
  removePendingMsg: () => {},

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
  moveChatToFolder: () => {},

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPendingBotMsg, setIsPendingBotMsg, isPendingBotMsgRef] = useStateRef<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pendingMsg, setPendingMsg, pendingMsgRef] = useStateRef<string[]>([]);

  const addPendingMsg = (messageId: string) => {
    setPendingMsg((prev) => [...prev, messageId]);
  };

  const removePendingMsg = (messageId: string) => {
    setPendingMsg((prev) => prev.filter((id) => id !== messageId));
  };

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

  const addMessage = (message: IMessageWithRole) => {
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

  const userAddMessage = (message: IMessage) => {
    const role = signedIn ? MessageRole.USER : MessageRole.VISITOR;
    addMessage({ role, messages: [message] });
  };

  const updateMessage = (messageIndex: number, updatedMessage: IMessageWithRole) => {
    if (selectedChatRef.current) {
      const updatedChat = {
        ...selectedChatRef.current,
        messages: selectedChatRef.current.messages.map((msg: IMessageWithRole, index: number) =>
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
          (_: IMessageWithRole, index: number) => index !== messageIndex
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
        folder: '',
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
        folder: item.folder,
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
        folder: '',
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
      folder: '',
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

  const moveChatToFolder = (chatId: string, newFolderId: string) => {
    if (chatBriefsRef.current && foldersRef.current) {
      // Info: 找到要移動的聊天 (20240704 - Shirley)
      const chatToMove = chatBriefsRef.current.find((brief) => brief.id === chatId);
      if (!chatToMove) return;

      // Info: 更新 chatBriefs (20240704 - Shirley)
      setChatBriefs(
        (prevBriefs) =>
          prevBriefs?.map((brief) =>
            brief.id === chatId ? { ...brief, folder: newFolderId } : brief
          ) || []
      );

      // Info: 更新 chats (20240704 - Shirley)
      setChats(
        (prevChats) =>
          prevChats?.map((chat) =>
            chat.id === chatId ? { ...chat, folder: newFolderId } : chat
          ) || []
      );

      // Info: 更新 folders (20240704 - Shirley)
      setFolders(
        (prevFolders) =>
          prevFolders
            ?.map((folder) => {
              if (folder.id === newFolderId) {
                // Info: 將聊天添加到新資料夾並排序 (20240704 - Shirley)
                const updatedChats = [
                  ...folder.chats.filter((chat) => chat.id !== chatId),
                  chatToMove,
                ];
                return {
                  ...folder,
                  chats: updatedChats.sort((a, b) => b.createdAt - a.createdAt), // Info: 新到舊排序 (20240704 - Shirley)
                };
              } else {
                // Info: 從其他資料夾中移除聊天 (20240704 - Shirley)
                return {
                  ...folder,
                  chats: folder.chats.filter((chat) => chat.id !== chatId),
                };
              }
            })
            .filter((folder) => folder.chats.length > 0) || []
      );
    }
  };

  const addFolder = (item: IFolder, chat?: IChatBrief) => {
    if (!signedIn) return;

    setFolders((prevFolders) => [...(prevFolders || []), item]);

    if (chat) {
      // Info: 更新 chat 的 folders (20240704 - Shirley)
      const updatedChat = {
        ...chat,
        folder: item.id,
      };

      if (chat.folder !== '') {
        moveChatToFolder(chat.id, item.id);
      } else {
        // Info: 更新 chatBriefs (20240704 - Shirley)
        setChatBriefs((prevChatBriefs) => {
          return (
            prevChatBriefs?.map((brief) => {
              return brief.id === chat.id ? updatedChat : brief;
            }) || []
          );
        });

        // Info: 更新 chats (20240704 - Shirley)
        setChats(
          (prevChats) =>
            prevChats?.map((c) => (c.id === chat.id ? { ...c, folder: updatedChat.folder } : c)) ||
            []
        );
      }
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

  const addBotMessage = async () => {
    if (
      selectedChatRef?.current?.messages &&
      selectedChatRef?.current?.messages.length > 0 &&
      selectedChatRef.current?.messages.at(-1)?.role !== MessageRole.BOT
    ) {
      setIsPendingBotMsg(true);
      const userMessage = selectedChatRef.current?.messages.at(-1)?.messages.at(-1)?.content;

      const newMsgId = uuidv4();

      try {
        addPendingMsg(newMsgId);

        const response = await fetch(EXTERNAL_API.LLAMA_API, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question: userMessage }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const reader = response.body?.getReader();
        let answer = '';

        const botMessage: IMessageWithRole = {
          role: MessageRole.BOT,
          messages: [
            {
              id: newMsgId,
              content: '',
              createdAt: getTimestamp(),
              isPending: true,
              like: false,
              dislike: false,
            },
          ],
        };

        addMessage(botMessage);

        while (reader) {
          // Info: text animation (20240704 - Shirley)
          // eslint-disable-next-line no-await-in-loop
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          const chunkAnswer = new TextDecoder().decode(value);
          answer += chunkAnswer;

          // Info: 更新最後一條消息的內容 (20240704 - Shirley)
          updateMessage(selectedChatRef.current.messages.length - 1, {
            ...botMessage,
            messages: [{ ...botMessage.messages[0], content: answer, isPending: false }],
          });
        }
      } catch (error) {
        // Deprecated: (20240720 - Shirley)
        // eslint-disable-next-line no-console
        console.error('Error calling API:', error);

        const errorMessage: IMessageWithRole = {
          role: MessageRole.BOT,
          messages: [
            {
              id: newMsgId,
              content: 'Sorry, an error occurred. Please try again later.',
              createdAt: getTimestamp(),
              isPending: false,
              like: false,
              dislike: false,
            },
          ],
        };

        addMessage(errorMessage);
      } finally {
        setIsPendingBotMsg(false);
        removePendingMsg(newMsgId);
      }
    }
  };

  const resendMessage = async (messageIndex: number) => {
    if (selectedChatRef.current) {
      const updatedChat = {
        ...selectedChatRef.current,
        messages: selectedChatRef.current.messages.map((msg, index) => {
          if (index === messageIndex && msg.role === MessageRole.BOT) {
            const newMessage: IMessage = {
              id: uuidv4(),
              content: '',
              createdAt: getTimestamp(),
              isPending: true,
              like: false,
              dislike: false,
            };

            addPendingMsg(newMessage.id);

            return {
              ...msg,
              messages: [...msg.messages, newMessage],
            };
          }
          return msg;
        }),
      };

      setSelectedChat(updatedChat);

      if (chatsRef.current) {
        setChats(
          chatsRef.current.map((chat: IChat) => (chat.id === updatedChat.id ? updatedChat : chat))
        );
      }

      try {
        const response = await fetch(EXTERNAL_API.LLAMA_API, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            question: selectedChatRef.current.messages[messageIndex - 1].messages[0].content,
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const reader = response.body?.getReader();
        let answer = '';
        while (reader) {
          // Info: text animation (20240704 - Shirley)
          // eslint-disable-next-line no-await-in-loop
          const { done, value } = await reader.read();
          if (done) {
            break;
          }

          const chunkAnswer = new TextDecoder().decode(value);
          answer += chunkAnswer;

          const finalUpdatedChat = {
            ...updatedChat,
            // Info: 更新最後一條消息的內容 (20240704 - Shirley)
            /* eslint-disable @typescript-eslint/no-loop-func */
            messages: updatedChat.messages.map((msg, index) => {
              if (index === messageIndex && msg.role === MessageRole.BOT) {
                const lastMessage = msg.messages[msg.messages.length - 1];
                removePendingMsg(lastMessage.id);
                return {
                  ...msg,
                  messages: [
                    ...msg.messages.slice(0, -1),
                    { ...lastMessage, content: answer, isPending: false },
                  ],
                };
              }
              return msg;
            }),
          };

          setSelectedChat(finalUpdatedChat);
          if (chatsRef.current) {
            setChats(
              chatsRef.current.map((chat) =>
                chat.id === finalUpdatedChat.id ? finalUpdatedChat : chat
              )
            );
          }
        }
      } catch (error) {
        // Deprecated: (20240720 - Shirley)
        // eslint-disable-next-line no-console
        console.error('Error calling API:', error);
      }
    }
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
    isPendingBotMsg: isPendingBotMsgRef.current,
    pendingMsg: pendingMsgRef.current,
    addPendingMsg,
    removePendingMsg,

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
    moveChatToFolder,

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
