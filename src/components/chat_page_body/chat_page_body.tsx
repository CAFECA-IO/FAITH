import { v4 as uuidv4 } from 'uuid';
import { useChatCtx } from '@/contexts/chat_context';
import { getTimestamp } from '@/lib/utils/common';
import React, { useRef, useState } from 'react';
import ChatThreadSection from '@/components/chat_thread_section/chat_thread_section';

const ChatPageBody = () => {
  const { userAddMessage } = useChatCtx();

  const [prompt, setPrompt] = useState('');
  const [rows, setRows] = useState(1);
  const [isComposing, setIsComposing] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const promptInputChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const submitPrompt = () => {
    setPrompt('');
    setRows(1);
    userAddMessage({
      id: uuidv4(),
      content: prompt,
      createdAt: getTimestamp(),
    });
  };

  const submitButtonClickHandler = () => {
    submitPrompt();
  };

  const heightenTextArea = () => {
    setRows((prevRows) => prevRows + 1);

    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const currentPosition = textarea.selectionStart;
      const newPosition = currentPosition + 1;

      setPrompt((prevPrompt) => prevPrompt + '\n');
      textarea.setSelectionRange(newPosition, newPosition);
    }
  };

  const lessenTextArea = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    if (textarea) {
      const currentPosition = textarea.selectionStart;
      const currentValue = textarea.value;
      if (currentPosition > 0 && currentValue[currentPosition - 1] === '\n') {
        e.preventDefault();
        setRows((prevRows) => Math.max(1, prevRows - 1));

        const newPosition = currentPosition - 1;
        setPrompt(
          (prevPrompt) =>
            prevPrompt.slice(0, currentPosition - 1) + prevPrompt.slice(currentPosition)
        );
        textarea.setSelectionRange(newPosition, newPosition);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Info: 完全空白下，text area 自動允許按一次 enter，此時網站讓 text area 高度加高；但會造成減少 text area 時少一行，所以先不使用 (20240627 - Shirley)
    // if (e.key === 'Enter') {
    //   heightenTextArea();
    // }

    // Info: shift + enter 加高 text area (20240627 - Shirley)
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      heightenTextArea();
    } else if (e.key === 'Enter' && !e.shiftKey && !isComposing && !!prompt) {
      // Info: enter 提交 (20240627 - Shirley)
      e.preventDefault();
      submitPrompt();
    } else if (e.key === 'Backspace') {
      lessenTextArea(e);
    }
  };

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
        className={`relative flex max-h-300px w-full resize-none items-center justify-between overflow-auto rounded-sm border border-lightGray3 bg-white px-5 py-3 outline-none transition-all duration-300`}
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

  return (
    // TODO: mobile version is not implemented yet (20240627 - Shirley)
    <div className="hidden lg:block">
      <div className="flex w-full flex-col">
        <ChatThreadSection />

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

export default ChatPageBody;
