import { useEffect, useState } from 'react';
import { Button } from '@/components/button/button';
import { useGlobalCtx } from '@/contexts/global_context';
import { useUserCtx } from '@/contexts/user_context';
import Image from 'next/image';
import { ToastType } from '@/interfaces/toastify';
import { ToastId } from '@/constants/toast_id';
import { checkboxStyle } from '@/constants/display';

const LoginPageBody = () => {
  const { signIn, signedIn } = useUserCtx();
  const {
    registerModalVisibilityHandler,
    toastHandler,
    eliminateToast,
    userCodeModalVisibilityHandler,
  } = useGlobalCtx();

  const [isUserGuideChecked, setIsUserGuideChecked] = useState(false);

  const userGuideCheckHandler = () => {
    setIsUserGuideChecked(!isUserGuideChecked);
  };

  const logInClickHandler = () => {
    signIn();
  };

  const registerClickHandler = () => {
    registerModalVisibilityHandler();
    // signUp();
  };

  useEffect(() => {
    if (signedIn) {
      eliminateToast();
      toastHandler({
        id: ToastId.LOGIN,
        type: ToastType.SUCCESS,
        content: 'You have successfully logged in!',
        closeable: true,
        autoClose: 3000,
      });
    }
  }, [signedIn]);

  return (
    <div className="md:bg-login bg-loginMobile flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat px-16 pb-20 pt-10 max-md:px-5">
      <div className="flex items-center justify-center px-16 max-md:px-5">
        <div className="flex max-w-full flex-col items-center md:w-600px">
          <Image
            src="/logo/isunfa_logo_with_ring.svg"
            alt="isunfa logo"
            width={60}
            height={60}
            className="hidden md:block"
          />
          <div className="my-5 hidden text-5xl font-bold leading-8 text-text-neutral-primary md:block">
            Welcome Back!
          </div>

          {/* ToDo: (20240705 - Julian) mobile title */}
          <div className="flex items-center gap-x-16px text-2xl font-bold text-surface-brand-secondary md:hidden">
            <Image src="/logo/isunfa_logo_with_ring.svg" alt="isunfa logo" width={40} height={40} />
            <p>Welcome Back!</p>
          </div>
          <div className="mt-5 rounded-3xl bg-white/30 px-32px py-40px max-md:mt-10 max-md:max-w-full md:px-48px md:py-80px">
            <div className="mt-10 flex flex-col items-center">
              <div className="relative h-100px w-100px md:h-180px md:w-180px">
                <Image
                  src="/elements/avatar_login.svg"
                  alt="avatar"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>

              <div className="mt-8 flex w-full flex-col justify-center gap-8">
                <Button
                  variant={'default'}
                  onClick={logInClickHandler}
                  className="mx-auto mt-0 flex max-w-400px justify-center rounded-sm bg-button-surface-strong-primary px-4 py-1 text-button-text-primary-solid hover:bg-button-surface-strong-primary-hover lg:gap-2 lg:space-x-2 lg:px-6 lg:py-3.5"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="24"
                    fill="none"
                    viewBox="0 0 25 24"
                  >
                    <g>
                      <path
                        className="fill-current"
                        fill="none"
                        fillRule="evenodd"
                        d="M8.664 1.001h7.677c.528 0 .982 0 1.357.03.395.033.788.104 1.167.297a3 3 0 011.311 1.311c.193.379.264.772.296 1.167.031.375.03.83.03 1.357V18.84c0 .527.001.982-.03 1.356-.032.395-.103.789-.296 1.167a3 3 0 01-1.311 1.311c-.378.193-.772.264-1.167.297-.375.03-.83.03-1.357.03H8.665c-.527 0-.982 0-1.356-.03-.395-.033-.789-.104-1.167-.297a3 3 0 01-1.311-1.31c-.193-.38-.264-.773-.296-1.168a17.9 17.9 0 01-.031-1.356V5.163c0-.528 0-.982.03-1.357.033-.395.104-.788.297-1.167A3 3 0 016.14 1.33c.378-.194.772-.265 1.167-.297.374-.03.83-.03 1.356-.03zM7.471 3.025c-.272.022-.373.06-.422.085a1 1 0 00-.437.437c-.025.05-.063.15-.085.422-.023.283-.024.656-.024 1.232v13.6c0 .577 0 .949.024 1.232.022.272.06.373.085.422a1 1 0 00.437.437c.05.025.15.063.422.085.283.023.655.024 1.232.024h7.6c.576 0 .949 0 1.232-.024.272-.022.372-.06.422-.085a1 1 0 00.437-.437c.025-.05.063-.15.085-.422.023-.283.024-.655.024-1.232v-13.6c0-.576 0-.949-.024-1.232-.022-.272-.06-.372-.085-.422a1 1 0 00-.437-.437c-.05-.025-.15-.063-.422-.085-.283-.023-.655-.024-1.232-.024h-7.6c-.577 0-.949 0-1.232.024zm3.532 14.476a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
                        clipRule="evenodd"
                      ></path>
                    </g>
                  </svg>
                  <div className="text-sm leading-7 tracking-normal lg:text-lg lg:font-medium">
                    Log in with Device
                  </div>
                </Button>

                <button
                  onClick={registerClickHandler}
                  type="button"
                  className="mt-0 flex max-w-full flex-col justify-center self-center text-sm font-semibold leading-6 tracking-normal text-link-text-primary hover:opacity-70 lg:mt-0 lg:text-base"
                >
                  <div className="justify-center rounded-sm">Register your Device</div>
                </button>

                <div className="flex gap-x-8px text-sm text-checkbox-text-primary">
                  <div className="relative h-16px w-16px">
                    <input
                      type="checkbox"
                      checked={isUserGuideChecked}
                      onChange={userGuideCheckHandler}
                      className={`${checkboxStyle}`}
                    />
                  </div>
                  <p className="text-xs md:text-sm">
                    I have read the{' '}
                    <button
                      type="button"
                      className="font-semibold text-text-neutral-link hover:underline"
                      onClick={userCodeModalVisibilityHandler}
                    >
                      User guide
                    </button>{' '}
                    and agree to comply with the platform&apos;s regulations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPageBody;
