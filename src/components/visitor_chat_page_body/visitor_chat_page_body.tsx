import { v4 as uuidv4 } from 'uuid';
import ChatMessage from '@/components/chat_message/chat_message';
import ChatTopicOption from '@/components/chat_topic_option/chat_topic_option';
import { useChatCtx } from '@/contexts/chat_context';
import { IMessage, MessageRole } from '@/interfaces/chat';
import { getTimestampInSeconds } from '@/lib/utils/common';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

const VisitorChatPageBody = () => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { selectedChat: chat, addMessage, addChat } = useChatCtx();

  const [prompt, setPrompt] = useState('');
  const [rows, setRows] = useState(1);
  const [isComposing, setIsComposing] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const topicClickHandler = (title: string) => {
    addChat({
      id: `${getTimestampInSeconds()}`,
      name: title,
      createdAt: getTimestampInSeconds(),
      messages: [],
      description: '',
    });
    addMessage({
      id: uuidv4(),
      role: MessageRole.ANONYMOUS_USER,
      content: `${title}`,
      createdAt: getTimestampInSeconds(),
    });
  };

  const promptInputChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const submitPrompt = () => {
    setPrompt('');
    setRows(1);
    addMessage({
      id: uuidv4(),
      role: MessageRole.ANONYMOUS_USER,
      content: prompt,
      createdAt: getTimestampInSeconds(),
    });
  };

  const submitButtonClickHandler = () => {
    submitPrompt();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      setRows((prevRows) => prevRows + 1);

      if (textareaRef.current) {
        const textarea = textareaRef.current;
        const currentPosition = textarea.selectionStart;
        const newPosition = currentPosition + 1;

        setPrompt((prevPrompt) => prevPrompt + '\n');
        textarea.setSelectionRange(newPosition, newPosition);
      }
    } else if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault();
      submitPrompt();
    } else if (e.key === 'Backspace') {
      const textarea = textareaRef.current;
      if (textarea) {
        const currentPosition = textarea.selectionStart;
        const currentValue = textarea.value;
        if (currentPosition > 0 && currentValue[currentPosition - 1] === '\n') {
          e.preventDefault();
          setRows((prevRows) => Math.max(1, prevRows - 1));

          setTimeout(() => {
            const newPosition = currentPosition - 1;
            setPrompt(
              (prevPrompt) =>
                // eslint-disable-next-line implicit-arrow-linebreak
                prevPrompt.slice(0, currentPosition - 1) + prevPrompt.slice(currentPosition)
            );
            textarea.setSelectionRange(newPosition, newPosition);
          }, 0);
        }
      }
    }
  };

  // TODO: extract dummy data to interfaces and import them and iterate (20240626 - Shirley)
  const displayedChatTopics = (
    <div className="mt-9 flex w-full justify-center">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChatTopicOption
          title="Tell me a joke"
          description="Faith can share the latest jokes."
          onClick={() => topicClickHandler('Tell me a joke')}
        />
        <ChatTopicOption
          title="Tell me a story"
          description="Faith can share the latest story."
          onClick={() => topicClickHandler('Tell me a story')}
        />
        <ChatTopicOption
          title="Share the latest AI information"
          description="Faith can share the latest AI information."
          onClick={() => topicClickHandler('Share the latest AI information')}
        />
        <ChatTopicOption
          title='Say " Hi "'
          description="Faith can say Hi."
          onClick={() => topicClickHandler('Say " Hi "')}
        />
      </div>
    </div>
  );

  const displayedPromptInput = (
    <div className="relative flex-1">
      <textarea
        ref={textareaRef}
        value={prompt}
        onChange={promptInputChangeHandler}
        onKeyDown={handleKeyDown}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        rows={rows}
        // TODO: i18n (20240626 - Shirley)
        placeholder="Say something..."
        className={`relative flex w-full min-w-200px resize-none items-center justify-between rounded-sm border border-lightGray3 bg-white px-5 py-3 outline-none transition-all duration-300`}
      />
      <button
        onClick={submitButtonClickHandler}
        disabled={!prompt}
        type="button"
        className="absolute bottom-3 right-3 text-icon-surface-single-color-primary disabled:text-button-surface-strong-disable"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            className="fill-current"
            fillRule="evenodd"
            d="M7.77 2.251h8.465c.813 0 1.468 0 2 .043.546.045 1.026.14 1.47.366a3.75 3.75 0 011.64 1.639c.226.444.32.924.365 1.47.043.532.043 1.187.043 2v8.464c0 .813 0 1.469-.043 2-.045.546-.14 1.026-.366 1.47a3.75 3.75 0 01-1.639 1.64c-.444.226-.924.32-1.47.365-.532.043-1.187.043-2 .043H7.771c-.813 0-1.469 0-2-.043-.546-.045-1.026-.14-1.47-.366a3.75 3.75 0 01-1.64-1.638c-.226-.445-.32-.925-.365-1.471-.043-.531-.043-1.187-.043-2V7.77c0-.813 0-1.468.043-2 .045-.546.14-1.026.366-1.47A3.75 3.75 0 014.3 2.659c.445-.226.925-.32 1.471-.365.531-.043 1.187-.043 2-.043zM5.895 3.79c-.454.038-.715.107-.913.207a2.25 2.25 0 00-.983.984c-.1.197-.17.458-.207.912-.037.462-.038 1.057-.038 1.91v8.4c0 .852 0 1.446.038 1.908.037.454.107.715.207.913.216.423.56.767.983.983.198.1.459.17.913.207.462.037 1.056.038 1.909.038h8.4c.852 0 1.447 0 1.91-.038.453-.037.714-.107.911-.207a2.25 2.25 0 00.984-.983c.1-.198.17-.459.207-.913.037-.462.038-1.056.038-1.909v-8.4c0-.852 0-1.447-.038-1.91-.038-.453-.107-.714-.207-.911a2.25 2.25 0 00-.984-.984c-.197-.1-.458-.17-.912-.207-.462-.037-1.057-.038-1.91-.038h-8.4c-.852 0-1.446 0-1.908.038zm5.579 3.682a.75.75 0 011.06 0l4 4a.75.75 0 11-1.06 1.06l-2.72-2.72v6.19a.75.75 0 01-1.5 0v-6.19l-2.72 2.72a.75.75 0 01-1.06-1.06l4-4z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );

  // TODO: if chat list is not empty, show chat list, otherwise show default chat content (20240626 - Shirley)
  const displayedChatContent =
    !chat || chat.messages.length === 0 ? (
      <div className="flex h-screen flex-col justify-center pt-56">
        {/* Info: logo, greetings, random chat topics (20240626 - Shirley) */}
        <div className="flex flex-col px-5">
          <div className="flex w-full justify-center">
            <div className="relative flex items-center justify-center">
              <Image
                src={'/logo/isunfa_logo_with_ring.svg'}
                width={100}
                height={100}
                alt="isunfa logo with ring border"
              />
            </div>
          </div>

          <div className="self-center text-3xl font-bold text-stroke-neutral-secondary">
            How can I help you today?
          </div>

          {displayedChatTopics}
        </div>
      </div>
    ) : chat.messages.length > 0 ? (
      <div
        ref={chatContainerRef}
        className="hideScrollbar h-screen overflow-y-auto overflow-x-hidden pt-56"
      >
        <div className="ml-20 mr-10 flex flex-col gap-10">
          {chat.messages.map((message: IMessage) => (
            <ChatMessage key={message.id} role={message.role} content={message.content} />
          ))}
        </div>
      </div>
    ) : null;

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat?.messages]);

  return (
    <div className="">
      <div className="flex w-full flex-col">
        {displayedChatContent}

        {/* Info: Chat input (20240626 - Shirley) */}
        <div className={`mb-5 mt-9 flex w-full flex-col px-20 max-md:max-w-full`}>
          <div>{displayedPromptInput}</div>

          <div className="mt-2 text-sm leading-5 tracking-normal text-input-text-secondary max-md:max-w-full">
            Faith may encounter errors. Please check important information.
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorChatPageBody;
