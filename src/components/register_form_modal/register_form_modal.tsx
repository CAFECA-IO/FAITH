import React, { useEffect, useRef, useState } from 'react';
import { useUserCtx } from '@/contexts/user_context';
import { Button } from '@/components/button/button';
import { DEFAULT_USER_NAME } from '@/constants/display';

interface IRegisterFormModal {
  isModalVisible: boolean;
  modalVisibilityHandler: () => void;
}

const RegisterFormModal = ({ isModalVisible, modalVisibilityHandler }: IRegisterFormModal) => {
  const { signUp } = useUserCtx();
  const inputRef = useRef<HTMLInputElement>(null);

  const [registerValid, setRegisterValid] = useState(true);

  const registerClickHandler = async () => {
    const name = inputRef.current?.value || DEFAULT_USER_NAME;
    signUp(name);
    if (inputRef.current?.value) {
      inputRef.current.value = '';
    }
    modalVisibilityHandler();
  };

  // Info: (20240620 - Julian) 輸入中文的過程中，暫停標籤的添加
  const handleCompositionStart = () => setRegisterValid(false);
  // Info: (20240620 - Julian) 輸入完成後，恢復標籤的添加
  const handleCompositionEnd = () => setRegisterValid(true);
  // Info: (20240620 - Julian) when value is not empty, press enter to register
  const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && registerValid) {
      registerClickHandler();
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isModalVisible]);

  const isDisplayedRegisterModal = isModalVisible ? (
    <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/50">
      <div className="relative mx-auto flex flex-col items-center rounded-md bg-surface-neutral-surface-lv2 p-6 shadow-lg shadow-black/80 sm:w-400px sm:px-3">
        <div className="flex gap-2.5 px-5 py-4">
          <div className="flex flex-1 flex-col justify-center space-y-2 text-center">
            <div className="text-xl font-bold text-card-text-primary">Set User Name</div>
            <div className="text-xs text-card-text-secondary">
              This username will be applied to your device.
            </div>
          </div>
          <div className="absolute right-3 top-3">
            <button
              type="button"
              onClick={modalVisibilityHandler}
              className="flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#314362"
                  fillRule="evenodd"
                  d="M6.296 6.294a1 1 0 011.414 0l4.293 4.293 4.293-4.293a1 1 0 111.414 1.414l-4.293 4.293 4.293 4.293a1 1 0 11-1.414 1.414l-4.293-4.293-4.293 4.293a1 1 0 01-1.414-1.414l4.293-4.293-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="flex w-full flex-col justify-center px-0 py-2.5 lg:px-5">
          <div className="flex rounded-sm border border-input-stroke-input bg-input-surface-input-background shadow-sm">
            <div className="flex items-center justify-center px-3 py-2.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 16 16"
              >
                <path
                  fill="#314362"
                  d="M8.093 1.501a6.51 6.51 0 00-6.59 6.59c.048 3.507 2.903 6.361 6.409 6.41a6.507 6.507 0 006.59-6.59c-.049-3.506-2.903-6.361-6.41-6.41zm3.95 10.227a.126.126 0 01-.15.025.123.123 0 01-.041-.035 3.884 3.884 0 00-1.011-.925c-.796-.51-1.804-.792-2.839-.792s-2.043.281-2.838.792c-.39.246-.732.559-1.011.924a.126.126 0 01-.192.01 5.479 5.479 0 01-1.459-3.632C2.452 5.054 4.947 2.509 7.99 2.5a5.504 5.504 0 015.513 5.5 5.479 5.479 0 01-1.459 3.727z"
                ></path>
                <path
                  fill="#314362"
                  d="M8.002 4.501c-.616 0-1.173.231-1.57.65-.395.42-.593 1-.548 1.624C5.974 8 6.924 9 8.002 9c1.078 0 2.026-1 2.119-2.226a2.1 2.1 0 00-.553-1.62 2.122 2.122 0 00-1.566-.654z"
                ></path>
              </svg>
            </div>
            <div className="flex flex-1">
              <input
                ref={inputRef}
                type="text"
                className="mx-2 w-full bg-transparent px-1 py-2.5 text-base text-input-text-input-filled placeholder:text-input-text-input-placeholder focus:outline-none"
                placeholder="Username"
                onKeyDown={onEnterPress}
                onCompositionStart={handleCompositionStart}
                onCompositionEnd={handleCompositionEnd}
              />
            </div>
          </div>
        </div>
        <div className="flex w-full items-end justify-end px-5 py-4 text-sm font-medium">
          <div className="flex gap-3">
            {/* TODO: button component (20240409 - Shirley) */}
            <Button type="button" variant="tertiaryBorderless" onClick={modalVisibilityHandler}>
              Cancel
            </Button>
            <Button type="button" variant={'tertiary'} onClick={registerClickHandler}>
              Register
            </Button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
  return <div> {isDisplayedRegisterModal}</div>;
};

export default RegisterFormModal;
