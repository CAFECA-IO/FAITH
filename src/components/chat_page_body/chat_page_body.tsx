import { v4 as uuidv4 } from 'uuid';
import { useUserCtx } from '@/contexts/user_context';
import { useChatCtx } from '@/contexts/chat_context';
import { getTimestamp } from '@/lib/utils/common';
import React, { useEffect, useRef, useState } from 'react';
import ChatThreadSection from '@/components/chat_thread_section/chat_thread_section';
import { useGlobalCtx } from '@/contexts/global_context';
import UploadedFileItem from '@/components/uploaded_file_item/uploaded_file_item';
import { FileStatus } from '@/interfaces/file';
import { Button } from '@/components/button/button';
import { DELAYED_BOT_ACTION_SUCCESS_MILLISECONDS } from '@/constants/display';

const ChatPageBody = () => {
  const { signedIn } = useUserCtx();
  const {
    userAddMessage,
    selectedChat,
    file,
    cancelUpload,
    clearFile,
    retryFileUpload,
    isDislikeSelectedMsg,
    isResendSelectedMsg,
  } = useChatCtx();
  const { fileUploadModalVisibilityHandler } = useGlobalCtx();

  const [prompt, setPrompt] = useState('');
  const [rows, setRows] = useState(1);
  const [isComposing, setIsComposing] = useState(false);
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Info: 如果檔案正在上傳或者上傳失敗，就不能送出；有檔案並且檔案上傳成功，或者輸入框有文字，則可以送出 (20240701 - Shirley)
  const isSubmitAllowed = file?.status === FileStatus.success || (!file && !!prompt);

  const feedbackClickHandler = () => {
    setIsFeedbackVisible(!isFeedbackVisible);
  };

  // TODO: 點不同 message 的 dislike 需跳出 feedback section (20240702 - Shirley)
  // eslint-disable-next-line no-console
  console.log(
    'isResendSelectedMsg in ChatPageBody',
    isResendSelectedMsg,
    'isDislikeSelectedMsg',
    isDislikeSelectedMsg,
    'isFeedbackVisible',
    isFeedbackVisible,
    'isFeedbackSubmitted',
    isFeedbackSubmitted
  );

  const feedbackSubmitHandler = (msg: string) => {
    setIsFeedbackSubmitted(true);
    // TODO: send message to server (20240702 - Shirley)
    // eslint-disable-next-line no-console
    console.log('feedbackSubmitHandler', msg);
  };

  useEffect(() => {
    if (isFeedbackSubmitted) {
      setTimeout(() => {
        setIsFeedbackSubmitted(false);
        setIsFeedbackVisible(false);
      }, DELAYED_BOT_ACTION_SUCCESS_MILLISECONDS);
    }
  }, [isFeedbackSubmitted]);

  useEffect(() => {
    if (isDislikeSelectedMsg || isResendSelectedMsg) {
      setIsFeedbackVisible(true);
    } else {
      setIsFeedbackVisible(false);
      setIsFeedbackSubmitted(false);
    }
  }, [isDislikeSelectedMsg, isResendSelectedMsg]);

  const retryUploadClickHandler = () => {
    retryFileUpload();
  };

  const cancelFileClickHandler = () => {
    cancelUpload();
    clearFile();
  };

  const uploadIconClickHandler = () => {
    fileUploadModalVisibilityHandler();
  };

  const promptInputChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const submitPrompt = () => {
    if (isSubmitAllowed) {
      setPrompt('');
      setRows(1);
      userAddMessage({
        id: uuidv4(),
        content: prompt,
        createdAt: getTimestamp(),
        file: file && file.status === FileStatus.success ? file : undefined,
      });
      clearFile();
    }
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
    } else if (e.key === 'Enter' && !e.shiftKey && !isComposing && isSubmitAllowed) {
      // Info: enter 提交 (20240627 - Shirley)
      e.preventDefault();
      submitPrompt();
    } else if (e.key === 'Backspace') {
      lessenTextArea(e);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [selectedChat?.id]);

  /*
isFeedbackSubmitted ? (
      <div className="w-full py-5">
        <div className="relative flex w-full items-start rounded-sm border border-dashed border-stroke-neutral-mute px-5 py-5">
          <div className="flex w-full items-center justify-center">
            <div className="text-base font-normal text-text-neutral-tertiary">
              Thank you for your feedback!
            </div>
          </div>
          <Button
            onClick={feedbackClickHandler}
            className="absolute right-0 top-0"
            variant={'secondaryBorderless'}
            size={'extraSmall'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 16 16"
            >
              <path
                className="fill-current"
                fillRule="evenodd"
                d="M4.376 4.375a.75.75 0 011.06 0L8.162 7.1l2.725-2.725a.75.75 0 011.061 1.06L9.222 8.16l2.725 2.725a.75.75 0 11-1.06 1.061L8.16 9.221l-2.724 2.725a.75.75 0 01-1.061-1.06L7.1 8.16 4.376 5.436a.75.75 0 010-1.061z"
                clipRule="evenodd"
              ></path>
            </svg>
          </Button>
        </div>
      </div>
    ) :
  */

  const feedbackSection = isFeedbackVisible ? (
    isDislikeSelectedMsg ? (
      <div className="w-full py-5">
        <div className="relative flex w-full items-start rounded-sm border border-dashed border-stroke-neutral-mute px-5 py-5">
          {isFeedbackSubmitted ? (
            <div className="flex w-full items-center justify-center">
              <div className="text-base font-normal text-text-neutral-tertiary">
                Thank you for your feedback!
              </div>
            </div>
          ) : (
            <div className="flex w-full items-center gap-5">
              <div className="text-base font-normal text-text-neutral-tertiary">
                Tell us your idea:
              </div>
              <div className="flex gap-2 whitespace-nowrap text-sm">
                <Button
                  onClick={() => feedbackSubmitHandler(`I don’t like this answer`)}
                  variant={'secondaryOutline'}
                  size={'medium'}
                  className=""
                >
                  I don&apos;t like this answer
                </Button>
                <Button
                  onClick={() => feedbackSubmitHandler('Error answer')}
                  variant={'secondaryOutline'}
                  size={'medium'}
                  className=""
                >
                  Error answer
                </Button>
                <Button
                  onClick={() => feedbackSubmitHandler('Incomplete information')}
                  variant={'secondaryOutline'}
                  size={'medium'}
                  className=""
                >
                  Incomplete information
                </Button>
                {/* TODO: open the feedback input modal (20240702 - Shirley) */}
                <Button
                  onClick={() => {}}
                  variant={'secondaryOutline'}
                  size={'extraSmall'}
                  className=""
                >
                  ...{' '}
                </Button>
              </div>
            </div>
          )}
          <Button
            onClick={feedbackClickHandler}
            className="absolute right-0 top-0"
            variant={'secondaryBorderless'}
            size={'extraSmall'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 16 16"
            >
              <path
                className="fill-current"
                fillRule="evenodd"
                d="M4.376 4.375a.75.75 0 011.06 0L8.162 7.1l2.725-2.725a.75.75 0 011.061 1.06L9.222 8.16l2.725 2.725a.75.75 0 11-1.06 1.061L8.16 9.221l-2.724 2.725a.75.75 0 01-1.061-1.06L7.1 8.16 4.376 5.436a.75.75 0 010-1.061z"
                clipRule="evenodd"
              ></path>
            </svg>
          </Button>
        </div>
      </div>
    ) : isResendSelectedMsg ? (
      <div className="w-full py-5">
        <div className="relative flex w-full items-start rounded-sm border border-dashed border-stroke-neutral-mute px-5 py-3">
          {isFeedbackSubmitted ? (
            <div className="flex w-full items-center justify-center">
              <div className="text-base font-normal text-text-neutral-tertiary">
                Thank you for your feedback!
              </div>
            </div>
          ) : (
            <div className="flex w-full items-center gap-5">
              <div className="text-base font-normal text-text-neutral-tertiary">
                Is this response better or worse?
              </div>
              <div className="flex gap-2 whitespace-nowrap text-sm">
                <Button
                  onClick={() => feedbackSubmitHandler('better')}
                  variant={'secondaryOutline'}
                  size={'medium'}
                  className=""
                >
                  Better
                </Button>
                <Button
                  onClick={() => feedbackSubmitHandler('worse')}
                  variant={'secondaryOutline'}
                  size={'medium'}
                  className=""
                >
                  Worse
                </Button>
                <Button
                  onClick={() => feedbackSubmitHandler('same')}
                  variant={'secondaryOutline'}
                  size={'medium'}
                  className=""
                >
                  Same
                </Button>
              </div>
            </div>
          )}
          <Button
            onClick={feedbackClickHandler}
            className="absolute right-0 top-0"
            variant={'secondaryBorderless'}
            size={'extraSmall'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 16 16"
            >
              <path
                className="fill-current"
                fillRule="evenodd"
                d="M4.376 4.375a.75.75 0 011.06 0L8.162 7.1l2.725-2.725a.75.75 0 011.061 1.06L9.222 8.16l2.725 2.725a.75.75 0 11-1.06 1.061L8.16 9.221l-2.724 2.725a.75.75 0 01-1.061-1.06L7.1 8.16 4.376 5.436a.75.75 0 010-1.061z"
                clipRule="evenodd"
              ></path>
            </svg>
          </Button>
        </div>
      </div>
    ) : null
  ) : null;

  const displayedPromptInput = (
    <div className="relative flex-1">
      {/* Info: file uploading status displaying (20240701 - Shirley) */}
      {file && (
        <div className="my-2 flex gap-3 overflow-x-auto">
          <UploadedFileItem
            retry={retryUploadClickHandler}
            delete={cancelFileClickHandler}
            key={file.id}
            file={file}
          />
        </div>
      )}
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
        className={`relative flex max-h-150px w-full resize-none items-center justify-between overflow-auto rounded-sm border border-lightGray3 bg-white ${signedIn ? `pl-12 pr-5` : `px-5`} py-3 outline-none transition-all duration-300`}
      />
      {signedIn && (
        // Info: upload file icon (20240628 - Shirley)
        <button
          onClick={uploadIconClickHandler}
          type="button"
          className="absolute bottom-3 left-3 text-icon-surface-single-color-primary hover:text-button-text-primary-hover disabled:text-button-surface-strong-disable"
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
              d="M18.15 4.006a2.75 2.75 0 00-3.889 0l-9.015 9.016a4.5 4.5 0 106.364 6.364l9.015-9.016a.75.75 0 111.06 1.06l-9.015 9.016a6 6 0 01-8.485-8.485L13.2 2.945a4.25 4.25 0 116.01 6.01l-8.662 8.663a2.5 2.5 0 11-3.536-3.536l7.602-7.601a.75.75 0 111.06 1.06l-7.601 7.602a1 1 0 101.414 1.414l8.662-8.662a2.75 2.75 0 000-3.889z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      )}

      {/* Info: submit icon (20240628 - Shirley) */}
      <button
        onClick={submitButtonClickHandler}
        disabled={!isSubmitAllowed}
        type="button"
        className="absolute bottom-3 right-3 text-icon-surface-single-color-primary hover:text-button-text-primary-hover disabled:text-button-surface-strong-disable"
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
    <div className="hidden lg:flex lg:h-screen lg:flex-col">
      <div className="hideScrollbar grow overflow-auto">
        <ChatThreadSection />
      </div>

      {/* Info: Chat input (20240626 - Shirley) */}
      <div className={`mb-2 mt-1 flex w-full flex-col px-20 max-md:max-w-full`}>
        {feedbackSection}

        <div>{displayedPromptInput}</div>

        <div className="mt-2 text-sm leading-5 tracking-normal text-input-text-secondary max-md:max-w-full">
          Faith may encounter errors. Please check important information.
        </div>
      </div>
    </div>
  );
};

export default ChatPageBody;
