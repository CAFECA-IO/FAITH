import Lottie from 'lottie-react';
import { Button } from '@/components/button/button';
import UploadedFileItem from '@/components/uploaded_file_item/uploaded_file_item';
import { DELAYED_BOT_ACTION_SUCCESS_MILLISECONDS } from '@/constants/display';
import { useChatCtx } from '@/contexts/chat_context';
import { useUserCtx } from '@/contexts/user_context';
import { MessageRole, DisplayedSender, IMessageWithRole } from '@/interfaces/chat';
import { IFile } from '@/interfaces/file';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import typingIndicator from '@public/animations/typing_indicator.json';

interface ChatMessageProps extends IMessageWithRole {
  sender: DisplayedSender;
  resend: () => Promise<void>;
}

interface BotPendingMessageProps {
  sender: DisplayedSender;
  role: MessageRole;
}

const ChatMessage = ({ sender, role, messages, resend: resendCallback }: ChatMessageProps) => {
  const { isSignedIn } = useUserCtx();
  const { dislikeBotMessage, selectedChat } = useChatCtx();
  const [isCopySuccess, setIsCopySuccess] = useState(false);
  const [selectedMsgIndex, setSelectedMsgIndex] = useState(messages.length - 1 ?? 0);
  const [isLikeSuccess, setIsLikeSuccess] = useState(!!messages[selectedMsgIndex]?.like);
  const [isDislikeSuccess, setIsDislikeSuccess] = useState(!!messages[selectedMsgIndex]?.dislike);
  const [isPending, setIsPending] = useState(!!messages[selectedMsgIndex]?.isPending);

  useEffect(() => {
    setIsLikeSuccess(!!messages[selectedMsgIndex]?.like);
    setIsDislikeSuccess(!!messages[selectedMsgIndex]?.dislike);
  }, [selectedMsgIndex]);

  useEffect(() => {
    setIsPending(!!messages[selectedMsgIndex]?.isPending);
  }, [messages[selectedMsgIndex]?.isPending]);

  const readAloadClickHandler = () => {
    // TODO: 點擊後，開始朗誦答案 (20240701 - Shirley)
    // eslint-disable-next-line
    console.log('readAloadClickHandler');
  };

  const copyClickHandler = () => {
    navigator.clipboard.writeText(messages[selectedMsgIndex].content);
    setIsCopySuccess(true);

    // Info: 1 秒後將 isCopySuccess 設回 false (20240701 - Shirley)
    setTimeout(() => {
      setIsCopySuccess(false);
    }, DELAYED_BOT_ACTION_SUCCESS_MILLISECONDS);
  };

  const resendClickHandler = async () => {
    await resendCallback();
  };

  const likeClickHandler = () => {
    setIsLikeSuccess(true);
    if (!messages[selectedMsgIndex].like) {
      setIsLikeSuccess(true);
      // TODO: refactor with `const updatedMessage = { ...messages[selectedMsgIndex], like: true };` after calling API (20240702 - Shirley)
      // eslint-disable-next-line no-param-reassign
      messages[selectedMsgIndex].like = true;
    }
  };

  const dislikeClickHandler = () => {
    setIsDislikeSuccess(true);
    if (!messages[selectedMsgIndex].dislike) {
      setIsDislikeSuccess(true);
      dislikeBotMessage(selectedChat?.id || '');

      // TODO: refactor with `const updatedMessage = { ...messages[selectedMsgIndex], dislike: true };` after calling API (20240702 - Shirley)
      // eslint-disable-next-line no-param-reassign
      messages[selectedMsgIndex].dislike = true;
    }
  };

  const displayedAvatar =
    role === MessageRole.VISITOR ? (
      <div className="relative flex h-32px w-32px shrink-0 items-center justify-center lg:h-60px lg:w-60px">
        <Image
          src={'/elements/anonymous_avatar.svg'}
          fill
          objectFit="contain"
          alt="isunfa logo with ring border"
        />
      </div>
    ) : role === MessageRole.BOT ? (
      <div className="relative flex h-32px w-32px shrink-0 items-center justify-center rounded-full border-2 border-stroke-neutral-quaternary lg:h-60px lg:w-60px">
        <div className="relative z-10 h-15px w-15px lg:h-30px lg:w-30px">
          <Image src={'/logo/isunfa_pure_logo.svg'} fill objectFit="contain" alt="isunfa logo" />
        </div>
      </div>
    ) : (
      // TODO: use imageId in `user` data as user avatar (20240627 - Shirley)
      <div className="relative flex h-32px w-32px shrink-0 items-center justify-center lg:h-60px lg:w-60px">
        <Image
          src={'/elements/default_user.svg'}
          fill
          objectFit="contain"
          alt="isunfa logo with ring border"
        />
      </div>
    );

  const displayedMessage = (
    <div>
      {/* Info: 用戶未登入時，訪客跟機器人的訊息 (20240701 - Shirley) */}
      {role !== MessageRole.USER ? (
        <div className="flex items-center gap-5 whitespace-nowrap font-barlow lg:items-start">
          {displayedAvatar}
          <div className="flex w-1200px flex-col overflow-x-auto">
            <div className="text-base font-bold leading-8 lg:text-xl">{sender}</div>
            <div className="mt-2 whitespace-pre-wrap text-sm leading-6 tracking-normal lg:text-base">
              {messages[selectedMsgIndex].isPending ? (
                <Lottie className="w-50px" animationData={typingIndicator} loop />
              ) : (
                messages[selectedMsgIndex].content
              )}
            </div>

            {/* Info: 用戶登入後，機器人的訊息 (20240701 - Shirley) */}
            {role === MessageRole.BOT && isSignedIn ? (
              <div className="my-0 flex gap-2">
                {!!messages[selectedMsgIndex].file && (
                  <div className="mt-2">
                    <UploadedFileItem
                      file={messages[selectedMsgIndex].file ?? ({} as IFile)}
                      retry={() => {}}
                      delete={() => {}}
                    />
                  </div>
                )}
                <div className="mt-3 flex gap-2">
                  {messages.length > 1 && (
                    <div className="flex flex-row items-center justify-center">
                      <Button
                        onClick={() => setSelectedMsgIndex(Math.max(0, selectedMsgIndex - 1))}
                        size={'extraSmall'}
                        variant={'secondaryBorderless'}
                        className="my-auto px-1"
                        disabled={selectedMsgIndex === 0}
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
                            d="M10.645 3.724a.75.75 0 010 1.06L7.27 8.16l3.376 3.376a.75.75 0 01-1.06 1.061L5.677 8.691a.75.75 0 010-1.06l3.906-3.907a.75.75 0 011.061 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </Button>
                      {/* Info: nowPage / totalPage (20240701 - Shirley) */}
                      <div className="flex w-40px flex-row items-center justify-center text-base">{`${selectedMsgIndex + 1} / ${messages.length}`}</div>
                      <Button
                        onClick={() =>
                          setSelectedMsgIndex(Math.min(messages.length - 1, selectedMsgIndex + 1))
                        }
                        size={'extraSmall'}
                        variant={'secondaryBorderless'}
                        className="px-1 py-0"
                        disabled={selectedMsgIndex === messages.length - 1}
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
                            d="M5.678 3.724a.75.75 0 011.06 0l3.907 3.906a.75.75 0 010 1.06L6.74 12.598a.75.75 0 11-1.06-1.06L9.053 8.16 5.678 4.784a.75.75 0 010-1.06z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </Button>
                    </div>
                  )}
                  {!isPending && (
                    <div className="flex gap-2">
                      {' '}
                      <Button
                        disabled={isPending}
                        onClick={readAloadClickHandler}
                        size={'extraSmall'}
                        variant={'secondaryBorderless'}
                        className="px-1 py-0"
                      >
                        {' '}
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
                            d="M8.419 4.312L5.923 6.808l-.03.03a2.252 2.252 0 01-.409.346c-.141.087-.296.151-.457.19a2.252 2.252 0 01-.535.044h-1.49c-.245 0-.385 0-.486.009a.706.706 0 00-.063.007.084.084 0 00-.018.017.702.702 0 00-.007.064c-.008.101-.009.24-.009.486v4c0 .246 0 .385.009.486a.702.702 0 00.007.064c.005.006.011.012.018.017a.719.719 0 00.063.008c.101.008.24.008.486.008h1.49c.16 0 .349 0 .535.044.161.039.316.103.457.19.163.1.297.234.41.347l.03.03 2.495 2.495V4.312zm.242-1.968c.372-.03.736.121.978.405.215.251.25.556.265.713.015.174.015.392.015.62V15.92c0 .227 0 .445-.015.62-.014.157-.05.46-.265.712a1.167 1.167 0 01-.978.405c-.33-.026-.57-.216-.69-.317a7.605 7.605 0 01-.45-.427l-.02-.02-2.639-2.639a5.05 5.05 0 00-.166-.16.084.084 0 00-.014-.007 5.228 5.228 0 00-.232-.004H2.977c-.211 0-.413 0-.583-.013a1.603 1.603 0 01-.61-.16 1.583 1.583 0 01-.692-.691 1.602 1.602 0 01-.16-.61c-.013-.17-.013-.372-.013-.584V7.976c0-.212 0-.413.014-.583.015-.186.05-.398.159-.61.151-.299.394-.54.691-.693.213-.108.426-.143.61-.158.17-.014.373-.014.584-.014H4.45a5.188 5.188 0 00.232-.004.083.083 0 00.014-.006 5.21 5.21 0 00.166-.161l2.639-2.638.02-.02c.16-.161.315-.316.45-.428.12-.101.36-.291.69-.317zm7.36 1.215a.75.75 0 011.047.17 10.705 10.705 0 012.018 6.272c0 2.34-.748 4.506-2.018 6.271a.75.75 0 01-1.218-.876 9.204 9.204 0 001.736-5.395 9.204 9.204 0 00-1.736-5.395.75.75 0 01.17-1.047zm-3.327 2.494a.75.75 0 011.044.186A6.557 6.557 0 0114.918 10a6.557 6.557 0 01-1.18 3.763.75.75 0 01-1.23-.859c.574-.823.91-1.823.91-2.904a5.056 5.056 0 00-.91-2.904.75.75 0 01.186-1.044z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </Button>
                      <Button
                        disabled={isPending}
                        onClick={copyClickHandler}
                        size={'extraSmall'}
                        variant={'secondaryBorderless'}
                        className="px-1 py-0"
                      >
                        {' '}
                        {isCopySuccess ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="none"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fill="#FFA502"
                              fillRule="evenodd"
                              d="M17.2 4.47a.75.75 0 010 1.062l-9.167 9.166a.75.75 0 01-1.06 0l-4.167-4.166a.75.75 0 011.06-1.061l3.637 3.636 8.636-8.636a.75.75 0 011.06 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        ) : (
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
                              d="M9.306.918H15.7c.441 0 .817 0 1.126.025.324.026.64.084.941.238.455.232.825.602 1.057 1.056.153.302.211.617.238.942.025.308.025.684.025 1.126V10.698c0 .44 0 .817-.025 1.125-.027.325-.085.64-.238.942a2.417 2.417 0 01-1.057 1.056c-.301.154-.617.212-.941.238-.309.025-.685.025-1.126.025h-1.613v1.614c0 .44 0 .817-.025 1.125-.027.325-.085.64-.239.942a2.417 2.417 0 01-1.056 1.056c-.301.154-.617.212-.941.238-.309.025-.685.025-1.126.025H4.306c-.441 0-.817 0-1.126-.025-.324-.026-.64-.084-.941-.238a2.417 2.417 0 01-1.056-1.056c-.154-.302-.212-.617-.239-.942C.92 16.515.92 16.14.92 15.697V9.304c0-.44 0-.817.025-1.125.027-.325.085-.64.239-.942a2.417 2.417 0 011.056-1.056c.301-.154.617-.212.941-.238.309-.025.685-.025 1.126-.025H5.92V4.304c0-.44 0-.817.025-1.125.027-.325.085-.64.239-.942a2.417 2.417 0 011.056-1.056c.301-.154.617-.212.941-.238.309-.025.685-.025 1.126-.025zm-2.637 6.5H4.336c-.48 0-.793 0-1.034.02-.231.019-.327.052-.382.08a.917.917 0 00-.4.4c-.029.055-.062.151-.08.383-.02.24-.02.554-.02 1.033v6.334c0 .479 0 .793.02 1.033.018.232.051.328.08.383a.917.917 0 00.4.4c.055.028.15.061.382.08.24.02.555.02 1.034.02h6.333c.48 0 .793 0 1.034-.02.231-.019.327-.052.382-.08a.916.916 0 00.4-.4c.029-.055.062-.151.08-.383.02-.24.02-.554.02-1.033V9.334c0-.479 0-.793-.02-1.033-.018-.232-.051-.328-.08-.383a.916.916 0 00-.4-.4c-.055-.028-.15-.061-.382-.08-.24-.02-.555-.02-1.034-.02h-4zm7.417 5.166v-3.28c0-.44 0-.817-.025-1.125-.027-.325-.085-.64-.239-.942a2.416 2.416 0 00-1.056-1.056c-.301-.154-.617-.212-.941-.238-.309-.025-.685-.025-1.126-.025h-3.28V4.334c0-.479 0-.793.02-1.033.02-.232.052-.328.08-.383a.917.917 0 01.4-.4c.056-.028.152-.061.383-.08.24-.02.555-.02 1.034-.02h6.333c.48 0 .793 0 1.034.02.231.019.327.052.382.08l.34-.669-.34.669a.916.916 0 01.4.4c.029.055.062.151.08.383.02.24.02.554.02 1.033v6.334c0 .479 0 .793-.02 1.033-.018.232-.051.328-.08.383a.916.916 0 01-.4.4c-.055.028-.15.061-.382.08-.24.02-.555.02-1.034.02h-1.583z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        )}
                      </Button>
                      <Button
                        disabled={isPending}
                        onClick={() => {
                          setSelectedMsgIndex(selectedMsgIndex + 1);
                          resendClickHandler();
                        }}
                        size={'extraSmall'}
                        variant={'secondaryBorderless'}
                        className="px-1 py-0"
                      >
                        {' '}
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
                            d="M8.639.804a.75.75 0 011.06 0l1.667 1.667a.75.75 0 010 1.06L9.7 5.198a.75.75 0 01-1.061-1.06l.396-.397a6.335 6.335 0 00-2.758 11.383.75.75 0 01-.883 1.212 7.835 7.835 0 013.61-14.105l-.365-.366a.75.75 0 010-1.06zm4.924 3.027a.75.75 0 011.048-.165A7.835 7.835 0 0111 17.771l.365.366a.75.75 0 11-1.06 1.061l-1.667-1.666a.75.75 0 010-1.061l1.667-1.667a.75.75 0 011.06 1.06l-.396.397a6.335 6.335 0 002.757-11.383.75.75 0 01-.164-1.047z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </Button>
                      <Button
                        disabled={isPending}
                        onClick={likeClickHandler}
                        size={'extraSmall'}
                        variant={'secondaryBorderless'}
                        className={`px-1 py-0 ${isDislikeSuccess ? 'hidden' : isLikeSuccess ? 'text-surface-brand-primary' : ''}`}
                      >
                        {' '}
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
                            d="M8.303 1.77c.23-.518.744-.852 1.311-.852a2.805 2.805 0 012.805 2.805v2.945c0 .046.037.083.083.083h2.92a3.25 3.25 0 013.212 3.744l-.897 5.834a3.25 3.25 0 01-3.213 2.755H3.336a2.417 2.417 0 01-2.417-2.416v-5.834a2.417 2.417 0 012.417-2.416h1.958c.033 0 .063-.02.076-.05L8.303 1.77zM6.586 17.584h7.938a1.75 1.75 0 001.73-1.483l.897-5.834a1.75 1.75 0 00-1.73-2.016h-2.918a1.583 1.583 0 01-1.584-1.583V3.723c0-.707-.562-1.282-1.263-1.305l-2.915 6.56a1.584 1.584 0 01-.155.272v8.334zm-1.5-7.666v7.666h-1.75a.917.917 0 01-.917-.916v-5.834c0-.506.41-.916.917-.916h1.75z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </Button>
                      <Button
                        disabled={isPending}
                        onClick={dislikeClickHandler}
                        size={'extraSmall'}
                        variant={'secondaryBorderless'}
                        className={`px-1 py-0 ${isDislikeSuccess ? 'text-surface-brand-primary' : isLikeSuccess ? 'hidden' : ''}`}
                      >
                        {' '}
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
                            d="M16.703 2.438c-.24-.02-.555-.02-1.034-.02h-.75v7.666h.75c.48 0 .793 0 1.034-.02.231-.019.327-.052.382-.08a.917.917 0 00.4-.4c.029-.055.062-.151.08-.383.02-.24.02-.554.02-1.033V4.334c0-.479 0-.793-.02-1.033-.018-.232-.051-.328-.08-.383a.917.917 0 00-.4-.4c-.055-.028-.15-.061-.382-.08zm-3.284 8.32v-8.34H6.767c-.62 0-1.043 0-1.374.025-.322.025-.5.07-.635.13a1.75 1.75 0 00-.743.638c-.08.124-.152.294-.225.608-.076.323-.14.741-.235 1.355L3.12 8.007c-.124.807-.21 1.365-.238 1.8-.028.426.005.655.067.818.145.38.417.697.77.897.152.087.373.154.799.191.434.037.998.038 1.814.038H7.027c.212 0 .414 0 .584.014.185.015.398.05.61.159.298.151.54.394.692.692.108.212.144.425.159.61.014.17.014.372.014.584v2.469c0 .707.561 1.283 1.263 1.305l2.783-6.262.026-.06c.07-.16.15-.34.261-.504zm.75-9.84h1.53c.441 0 .817 0 1.126.025.324.026.64.084.941.238.455.232.825.602 1.056 1.056.154.302.212.617.239.942.025.308.025.684.025 1.126v3.893c0 .44 0 .817-.025 1.125-.027.325-.085.64-.239.942a2.417 2.417 0 01-1.056 1.056c-.301.154-.617.212-.941.238-.309.025-.685.025-1.126.025h-.663a5.785 5.785 0 00-.361.009.087.087 0 00-.018.011 5.732 5.732 0 00-.154.327l-2.801 6.301c-.23.518-.744.852-1.311.852a2.805 2.805 0 01-2.805-2.805v-2.445c0-.245 0-.384-.01-.486a.702.702 0 00-.007-.063.084.084 0 00-.017-.018.732.732 0 00-.063-.007 6.87 6.87 0 00-.487-.009H6.297c-.774 0-1.403 0-1.909-.044-.52-.045-.988-.14-1.411-.38a3.25 3.25 0 01-1.43-1.668c-.174-.454-.197-.932-.163-1.453.034-.506.13-1.128.248-1.894l.005-.033.436-2.834.004-.028c.089-.578.162-1.053.252-1.438.093-.401.215-.759.43-1.087a3.25 3.25 0 011.38-1.185c.357-.161.73-.228 1.14-.26.394-.03.875-.03 1.46-.03h7.43z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        // Info: 用戶登入後，用戶的訊息 (20240701 - Shirley)
        <div className="flex w-full items-center justify-end gap-5 whitespace-nowrap font-barlow lg:items-start">
          <div className="flex w-1200px flex-col items-end justify-center overflow-x-auto">
            {!!messages[selectedMsgIndex].file && (
              <div className="mt-2">
                <UploadedFileItem
                  isStatusVisible={false}
                  file={messages[selectedMsgIndex].file ?? ({} as IFile)}
                />
              </div>
            )}

            <div className="mt-2 whitespace-pre-wrap text-sm leading-6 tracking-normal lg:text-base">
              {messages[selectedMsgIndex].content}
            </div>
          </div>

          {displayedAvatar}
        </div>
      )}
    </div>
  );

  return displayedMessage;
};

export const BotPendingMessage = ({ sender, role }: BotPendingMessageProps) => {
  const displayedAvatar =
    role === MessageRole.BOT ? (
      <div className="relative flex h-60px w-60px shrink-0 items-center justify-center">
        <Image
          src={'/logo/isunfa_pure_logo.svg'}
          width={30}
          height={30}
          alt="isunfa logo"
          className="z-10 h-30px w-30px"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="60"
          height="60"
          fill="none"
          viewBox="0 0 60 60"
          className="absolute"
        >
          <circle cx="30" cy="30" r="29" stroke="#CDD1D9" strokeWidth="2"></circle>
        </svg>
      </div>
    ) : null;

  const displayedMessage =
    role === MessageRole.BOT ? (
      <div className="mt-0 flex gap-5 self-start whitespace-nowrap font-barlow">
        {displayedAvatar}
        <div className="flex w-1200px flex-col overflow-x-auto">
          <div className="text-base font-bold leading-8 lg:text-xl">{sender}</div>
          <div className="mt-2 whitespace-pre-wrap text-sm leading-6 tracking-normal lg:text-base">
            <Lottie className="w-50px" animationData={typingIndicator} loop />
          </div>
        </div>
      </div>
    ) : null;

  return <div>{displayedMessage}</div>;
};

export default ChatMessage;
