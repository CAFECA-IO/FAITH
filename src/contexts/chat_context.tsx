import { v4 as uuidv4 } from 'uuid';
import { useUserCtx } from '@/contexts/user_context';
import {
  ActionCausingFeedback,
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
import { DEFAULT_AICH_URL, getApiUrl, NATIVE_ROUTE } from '@/constants/url';
import { FileStatus, FileStatusUnion, IFile } from '@/interfaces/file';
import { LIMIT_FOR_FILE_SIZE } from '@/constants/config';
import { setTimeout } from 'timers';

interface ChatContextType {
  selectedChat: IChat | null;
  selectChat: (id: string) => void;

  addMessage: (message: IMessageWithRole) => void;
  addUserMessage: ({ content, file }: { content: string; file?: IFile }) => void;
  updateMessage: (chatId: string, messageIndex: number, updatedMessage: IMessageWithRole) => void;
  deleteMessage: (messageIndex: number) => void;
  resendUserMessage: (messageIndex: number) => Promise<void>;
  dislikeBotMessage: (chatId: string) => void;
  dislikedMsg: string[];
  resentMsg: string[];
  addDislikedMsg: (chatId: string) => void;
  addResentMsg: (chatId: string) => void;
  displayedFeedback: ActionCausingFeedback;
  isLatestBotMsgPending: boolean;
  pendingMsg: string[];
  addPendingMsg: (messageId: string) => void;
  removePendingMsg: (messageId: string) => void;
  addBotMessage: () => Promise<void>;
  removeDislikedMsg: (chatId: string) => void;
  removeResentMsg: (chatId: string) => void;

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
  createIFile: (file: File, status: FileStatusUnion) => IFile;
  clearFile: () => void;
  saveFile: (item: IFile) => void;
  retryFileUpload: () => void;
}

const ChatContext = createContext<ChatContextType>({
  selectedChat: null,
  selectChat: () => {},

  addMessage: () => {},
  addUserMessage: () => {},
  updateMessage: () => {},
  deleteMessage: () => {},
  resendUserMessage: () => Promise.resolve(),
  dislikeBotMessage: () => {},
  dislikedMsg: [],
  resentMsg: [],
  addDislikedMsg: () => {},
  addResentMsg: () => {},
  displayedFeedback: ActionCausingFeedback.RESEND,
  isLatestBotMsgPending: false,
  pendingMsg: [],
  addPendingMsg: () => {},
  removePendingMsg: () => {},
  addBotMessage: () => Promise.resolve(),
  removeDislikedMsg: () => {},
  removeResentMsg: () => {},

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
  createIFile: () => ({ id: '', data: new File([], ''), status: FileStatus.success }),
  clearFile: () => {},
  saveFile: () => {},
  retryFileUpload: () => {},
});

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isSignedIn } = useUserCtx();
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
    useStateRef<ActionCausingFeedback>(ActionCausingFeedback.RESEND);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLatestBotMsgPending, setIsLatestBotMsgPending, isLatestBotMsgPendingRef] =
    useStateRef<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pendingMsg, setPendingMsg, pendingMsgRef] = useStateRef<string[]>([]);

  const addPendingMsg = (messageId: string) => {
    setPendingMsg((prev) => [...prev, messageId]);
  };

  const removePendingMsg = (messageId: string) => {
    setPendingMsg((prev) => prev.filter((id) => id !== messageId));
  };

  const addDislikedMsg = (chatId: string) => {
    setDislikedMsg((prev) => [...prev, chatId]);
    setDisplayedFeedback(ActionCausingFeedback.DISLIKE);
  };

  const removeDislikedMsg = (chatId: string) => {
    setDislikedMsg((prev) => prev.filter((id) => id !== chatId));
  };

  const addResentMsg = (chatId: string) => {
    setResentMsg((prev) => [...prev, chatId]);
    setDisplayedFeedback(ActionCausingFeedback.RESEND);
  };

  const removeResentMsg = (chatId: string) => {
    setResentMsg((prev) => prev.filter((id) => id !== chatId));
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

  const clearFile = () => {
    if (uploadTimeout) {
      clearTimeout(uploadTimeout);
      setUploadTimeout(null);
    }
    setFile(null);
  };

  const addMessage = (message: IMessageWithRole, chatId?: string) => {
    if (chatId) {
      // 如果指定了 chatId，將消息添加到指定的聊天中
      setChats(
        (prevChats) =>
          prevChats?.map((chat) =>
            chat.id === chatId ? { ...chat, messages: [...chat.messages, message] } : chat
          ) || []
      );

      // 如果當前選中的聊天就是指定的聊天，也更新 selectedChat
      if (selectedChatRef.current?.id === chatId) {
        setSelectedChat((prevChat) =>
          prevChat ? { ...prevChat, messages: [...prevChat.messages, message] } : null
        );
      }
    } else if (selectedChatRef.current) {
      // 如果沒有指定 chatId，則添加到當前選中的聊天中
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

  const updateMessage = (
    chatId: string,
    messageIndex: number,
    updatedMessage: IMessageWithRole
  ) => {
    setChats(
      (prevChats) =>
        prevChats?.map((chat) =>
          chat.id === chatId
            ? {
                ...chat,
                messages: chat.messages.map((msg, index) =>
                  index === messageIndex ? updatedMessage : msg
                ),
              }
            : chat
        ) || []
    );

    if (selectedChatRef.current?.id === chatId) {
      setSelectedChat((prevChat) =>
        prevChat
          ? {
              ...prevChat,
              messages: prevChat.messages.map((msg, index) =>
                index === messageIndex ? updatedMessage : msg
              ),
            }
          : null
      );
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
    if (!isSignedIn) return;
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
        isPrivate: false,
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
      isPrivate: false,
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
    if (!isSignedIn) return;

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
  const baseUrl = process.env.NEXT_PUBLIC_AICH_URL ?? DEFAULT_AICH_URL;
  const llamaUrl = getApiUrl(baseUrl, 'LLAMA_CHAT');
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
      // Info: 找到要刪除的資料夾 (20240705 - Shirley)
      const folderToDelete = foldersRef.current.find((folder) => folder.id === id);

      if (folderToDelete) {
        // Info: 更新 chatBriefs (20240705 - Shirley)
        setChatBriefs(
          (prevChatBriefs) =>
            prevChatBriefs?.map((brief) =>
              brief.folder === id ? { ...brief, folder: '' } : brief
            ) || []
        );

        // Info: 更新 chats (20240705 - Shirley)
        setChats(
          (prevChats) =>
            prevChats?.map((chat) => (chat.folder === id ? { ...chat, folder: '' } : chat)) || []
        );

        // Info: 刪除資料夾 (20240705 - Shirley)
        setFolders(foldersRef.current.filter((folder: IFolder) => folder.id !== id));
      }
    }
  };

  const clearData = () => {
    setChats([]);
    setChatBriefs([]);
    setFolders([]);
  };

  const addBotMessage = async () => {
    setIsLatestBotMsgPending(true);
    const userMessage = selectedChatRef.current?.messages.at(-1)?.messages.at(-1)?.content;
    const chatId = selectedChatRef.current?.id;

    const newMsgId = uuidv4();
    try {
      addPendingMsg(newMsgId);
      const response = await fetch(llamaUrl, {
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

      addMessage(botMessage, chatId);

      while (reader) {
        // eslint-disable-next-line no-await-in-loop
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        const chunkAnswer = new TextDecoder().decode(value);
        answer += chunkAnswer;

        // Info: 更新消息內容 (20240709 - Shirley)
        const updatedBotMessage = {
          ...botMessage,
          messages: [{ ...botMessage.messages[0], content: answer, isPending: false }],
        };

        // Info: 更新 selectedChat (20240709 - Shirley)
        if (selectedChatRef.current?.id === chatId) {
          setSelectedChat((prevChat) => {
            if (!prevChat) return null;
            const updatedMessages = [...prevChat.messages];
            updatedMessages[updatedMessages.length - 1] = updatedBotMessage;
            return { ...prevChat, messages: updatedMessages };
          });
        }

        // Info: 更新 chats (20240709 - Shirley)
        setChats(
          (prevChats) =>
            prevChats?.map((chat) => {
              if (chat.id === chatId) {
                const updatedMessages = [...chat.messages];
                updatedMessages[updatedMessages.length - 1] = updatedBotMessage;
                return { ...chat, messages: updatedMessages };
              }
              return chat;
            }) || []
        );
      }
    } catch (error) {
      // Deprecated: 20240709 - Shirley
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

      addMessage(errorMessage, chatId);
    } finally {
      setIsLatestBotMsgPending(false);
      removePendingMsg(newMsgId);
    }
  };

  const resendUserMessage = async (messageIndex: number) => {
    if (selectedChatRef.current) {
      const chatId = selectedChatRef.current.id;
      const newMessageId = uuidv4();

      // Info: 更新聊天狀態，添加新的待處理消息 (20240709 - Shirley)
      const updateChat = (chat: IChat) => {
        const updatedMessages = chat.messages.map((msg, index) => {
          if (index === messageIndex && msg.role === MessageRole.BOT) {
            const newMessage: IMessage = {
              id: newMessageId,
              content: '',
              createdAt: getTimestamp(),
              isPending: true,
              like: false,
              dislike: false,
            };
            return {
              ...msg,
              messages: [...msg.messages, newMessage],
            };
          }
          return msg;
        });
        return { ...chat, messages: updatedMessages };
      };

      setSelectedChat((prevChat) => (prevChat ? updateChat(prevChat) : null));
      setChats(
        (prevChats) =>
          prevChats?.map((chat) => (chat.id === chatId ? updateChat(chat) : chat)) || []
      );

      addPendingMsg(newMessageId);
      try {
        const response = await fetch(llamaUrl, {
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
          // eslint-disable-next-line no-await-in-loop
          const { done, value } = await reader.read();
          if (done) break;

          const chunkAnswer = new TextDecoder().decode(value);
          answer += chunkAnswer;
          // eslint-disable-next-line @typescript-eslint/no-loop-func
          const updateChatWithAnswer = (chat: IChat) => {
            const updatedMessages = chat.messages.map((msg, index) => {
              if (index === messageIndex && msg.role === MessageRole.BOT) {
                const lastMessage = msg.messages[msg.messages.length - 1];
                if (lastMessage.id === newMessageId) {
                  return {
                    ...msg,
                    messages: [
                      ...msg.messages.slice(0, -1),
                      { ...lastMessage, content: answer, isPending: false },
                    ],
                  };
                }
              }
              return msg;
            });
            return { ...chat, messages: updatedMessages };
          };

          setSelectedChat((prevChat) => (prevChat ? updateChatWithAnswer(prevChat) : null));
          setChats(
            (prevChats) =>
              prevChats?.map((chat) => (chat.id === chatId ? updateChatWithAnswer(chat) : chat)) ||
              []
          );
        }
      } catch (error) {
        // Deprecated: 20240720 - Shirley
        // eslint-disable-next-line no-console
        console.error('Error calling API:', error);
        const errorAnswer = 'Sorry, an error occurred. Please try again later.';

        const updateChatWithError = (chat: IChat) => {
          const updatedMessages = chat.messages.map((msg, index) => {
            if (index === messageIndex && msg.role === MessageRole.BOT) {
              const lastMessage = msg.messages[msg.messages.length - 1];
              if (lastMessage.id === newMessageId) {
                return {
                  ...msg,
                  messages: [
                    ...msg.messages.slice(0, -1),
                    { ...lastMessage, content: errorAnswer, isPending: false },
                  ],
                };
              }
            }
            return msg;
          });
          return { ...chat, messages: updatedMessages };
        };

        setSelectedChat((prevChat) => (prevChat ? updateChatWithError(prevChat) : null));
        setChats(
          (prevChats) =>
            prevChats?.map((chat) => (chat.id === chatId ? updateChatWithError(chat) : chat)) || []
        );
      } finally {
        removePendingMsg(newMessageId);
        addResentMsg(chatId);
      }
    }
  };

  const dislikeBotMessage = (chatId: string) => {
    addDislikedMsg(chatId);
  };

  const addUserMessage = async ({ content, file: fileItem }: { content: string; file?: IFile }) => {
    const role = isSignedIn ? MessageRole.USER : MessageRole.VISITOR;
    const id = uuidv4();
    const createdAt = getTimestamp();
    addMessage({ role, messages: [{ id, content, file: fileItem, createdAt }] });
    await addBotMessage();
  };

  useEffect(() => {
    if (isSignedIn) {
      setChats(dummyChats);
      setSelectedChat(dummyChats[0]);
      setChatBriefs(dummyChatBriefs);
      setFolders(dummyFolders);
    } else {
      clearData();
    }
  }, [isSignedIn]);

  useEffect(() => {
    if (router.pathname === NATIVE_ROUTE.HOME && !isSignedIn) {
      addEmptyChat();
    }
  }, [router.pathname]);

  /* eslint-disable react/jsx-no-constructed-context-values */
  const value = {
    addMessage,
    updateMessage,
    deleteMessage,
    addResentMsg,
    addDislikedMsg,
    addPendingMsg,
    removePendingMsg,
    addBotMessage,
    handleChatBriefs,
    addChatBrief,
    deleteChatBrief,
    handleChats,
    addChat,
    handleFolders,
    saveFile,
    createIFile,
    renameChatBrief,

    // Info: --- 已經有在其他 component 使用的 variables / functions --- (20240709 - Shirley)
    selectedChat: selectedChatRef.current,
    selectChat,
    addEmptyChat,
    renameChat,
    deleteChat,
    chats: chatsRef.current,
    chatBriefs: chatBriefsRef.current,

    addUserMessage,
    resendUserMessage,
    dislikeBotMessage,
    dislikedMsg: dislikedMsgRef.current,
    resentMsg: resentMsgRef.current,
    displayedFeedback: displayedFeedbackRef.current,
    isLatestBotMsgPending: isLatestBotMsgPendingRef.current,
    pendingMsg: pendingMsgRef.current,
    removeDislikedMsg,
    removeResentMsg,

    folders: foldersRef.current,
    addFolder,
    renameFolder,
    deleteFolder,
    moveChatToFolder,

    file,
    handleFile,
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
