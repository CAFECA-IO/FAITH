'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/button/button';
import { useGlobalCtx } from '@/contexts/global_context';
import { useUserCtx } from '@/contexts/user_context';
import { ToastType } from '@/interfaces/toastify';
import { ToastId } from '@/constants/toast_id';
import { checkboxStyle } from '@/constants/display';
import useOuterClick from '@/lib/hooks/use_outer_click';
import { useTranslation } from 'react-i18next';
import { INTERNATIONALIZATION_LIST } from '@/constants/i18n';
import { I_SUN_FA_URL } from '@/constants/url';
import { useRouter } from 'next/router';

const LoginPageBody = () => {
  const { t } = useTranslation();
  const { asPath } = useRouter();

  const { signIn, isSignedIn } = useUserCtx();
  const {
    registerModalVisibilityHandler,
    toastHandler,
    eliminateToast,
    userCodeModalVisibilityHandler,
  } = useGlobalCtx();

  const [isUserGuideChecked, setIsUserGuideChecked] = useState(false);

  const {
    targetRef: lanRef,
    componentVisible: lanVisible,
    setComponentVisible: setLanVisible,
  } = useOuterClick<HTMLDivElement>(false);

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

  const languageClickHandler = () => setLanVisible(!lanVisible);

  useEffect(() => {
    if (isSignedIn) {
      eliminateToast();
      toastHandler({
        id: ToastId.LOGIN,
        type: ToastType.SUCCESS,
        content: t('TOAST.LOGGED_SUCCESS'),
        closeable: true,
        autoClose: 3000,
      });
    }
  }, [isSignedIn]);

  const languageMenu = INTERNATIONALIZATION_LIST.map((item) => {
    return (
      <Link
        key={item.value}
        href={asPath}
        scroll={false}
        locale={item.value}
        onClick={languageClickHandler}
        className="w-full whitespace-nowrap border-b border-stroke-neutral-solid-light px-24px py-10px text-center hover:border-button-stroke-primary-hover hover:text-button-text-primary-hover"
      >
        {item.label}
      </Link>
    );
  });

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-loginMobile bg-cover bg-center bg-no-repeat px-16 pb-20 pt-10 max-md:px-5 md:bg-login">
      <div className="flex items-center justify-center px-16 max-md:px-5">
        <div className="flex max-w-full flex-col items-center md:w-600px">
          <Image
            src="/logo/isunfa_logo_with_ring.svg"
            alt="isunfa logo"
            width={60}
            height={60}
            className="hidden md:block"
          />
          <div className="my-5 hidden w-full text-center text-5xl font-bold leading-8 text-text-neutral-primary md:block">
            {t('LOGIN.WELCOME')}
          </div>

          {/* ToDo: (20240705 - Julian) mobile title */}
          <div className="flex items-center gap-x-16px text-2xl font-bold text-surface-brand-secondary md:hidden">
            <Image src="/logo/isunfa_logo_with_ring.svg" alt="isunfa logo" width={40} height={40} />
            <p>{t('LOGIN.WELCOME')}</p>
          </div>
          <div className="mt-5 rounded-3xl bg-white/30 px-32px py-40px max-md:mt-10 md:px-48px md:py-80px lg:w-600px">
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
                  type="button"
                  variant={'default'}
                  onClick={logInClickHandler}
                  disabled={!isUserGuideChecked}
                  className="mx-auto mt-0 flex max-w-400px justify-center rounded-sm bg-button-surface-strong-primary px-4 py-1 text-button-text-primary-solid hover:bg-button-surface-strong-primary-hover lg:gap-2 lg:space-x-2 lg:px-6 lg:py-3.5"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="24"
                    fill="none"
                    viewBox="0 0 25 24"
                  >
                    <path
                      className="fill-current"
                      fill="none"
                      fillRule="evenodd"
                      d="M8.664 1.001h7.677c.528 0 .982 0 1.357.03.395.033.788.104 1.167.297a3 3 0 011.311 1.311c.193.379.264.772.296 1.167.031.375.03.83.03 1.357V18.84c0 .527.001.982-.03 1.356-.032.395-.103.789-.296 1.167a3 3 0 01-1.311 1.311c-.378.193-.772.264-1.167.297-.375.03-.83.03-1.357.03H8.665c-.527 0-.982 0-1.356-.03-.395-.033-.789-.104-1.167-.297a3 3 0 01-1.311-1.31c-.193-.38-.264-.773-.296-1.168a17.9 17.9 0 01-.031-1.356V5.163c0-.528 0-.982.03-1.357.033-.395.104-.788.297-1.167A3 3 0 016.14 1.33c.378-.194.772-.265 1.167-.297.374-.03.83-.03 1.356-.03zM7.471 3.025c-.272.022-.373.06-.422.085a1 1 0 00-.437.437c-.025.05-.063.15-.085.422-.023.283-.024.656-.024 1.232v13.6c0 .577 0 .949.024 1.232.022.272.06.373.085.422a1 1 0 00.437.437c.05.025.15.063.422.085.283.023.655.024 1.232.024h7.6c.576 0 .949 0 1.232-.024.272-.022.372-.06.422-.085a1 1 0 00.437-.437c.025-.05.063-.15.085-.422.023-.283.024-.655.024-1.232v-13.6c0-.576 0-.949-.024-1.232-.022-.272-.06-.372-.085-.422a1 1 0 00-.437-.437c-.05-.025-.15-.063-.422-.085-.283-.023-.655-.024-1.232-.024h-7.6c-.577 0-.949 0-1.232.024zm3.532 14.476a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <div className="text-sm leading-7 tracking-normal lg:text-lg lg:font-medium">
                    {t('LOGIN.LOGIN_BTN')}
                  </div>
                </Button>

                <button
                  onClick={registerClickHandler}
                  type="button"
                  className="mt-0 flex max-w-full flex-col justify-center self-center text-sm font-semibold leading-6 tracking-normal text-link-text-primary hover:opacity-70 lg:mt-0 lg:text-base"
                >
                  <div className="justify-center rounded-sm">{t('LOGIN.REGISTER')}</div>
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
                    {t('LOGIN.USER_GUIDE_HINT_1')}
                    <button
                      type="button"
                      className="font-semibold text-text-neutral-link hover:underline"
                      onClick={userCodeModalVisibilityHandler}
                    >
                      {t('LOGIN.USER_GUIDE_HINT_2')}
                    </button>
                    {t('LOGIN.USER_GUIDE_HINT_3')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Info: (20240705 - Julian) i18n & contact us */}
      <div className="absolute bottom-0 right-0 m-20px flex items-center gap-x-40px">
        <div className="relative drop-shadow-md">
          <button
            id="language-button"
            type="button"
            className="p-12px text-surface-neutral-surface-lv1 hover:text-button-text-secondary"
            onClick={languageClickHandler}
          >
            <svg
              width="24"
              height="24"
              viewBox="16 16 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <filter id="shadow">
                <feOffset in="SourceGraphic" dx="1" dy="1" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.192157 0 0 0 0 0.262745 0 0 0 0 0.384314 0 0 0 0.1 0"
                />
                <feGaussianBlur stdDeviation="1" />
                <feBlend in="SourceGraphic" in2="offOut" />
              </filter>

              <path
                filter="url(#shadow)"
                className="fill-current"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.2259 26.0012C19.08 26.6444 19.0029 27.3138 19.0029 28.0012C19.0029 28.6886 19.08 29.358 19.2259 30.0012H23.1653C23.0715 29.3484 23.017 28.6876 23.0031 28.022C23.0029 28.0082 23.0029 27.9943 23.0031 27.9804C23.017 27.3149 23.0715 26.654 23.1653 26.0012H19.2259ZM19.9384 24.0012H23.5821C24.0413 22.33 24.7651 20.7393 25.7286 19.291C23.1877 19.9526 21.0837 21.6967 19.9384 24.0012ZM28.0029 19.552C26.9633 20.8915 26.1749 22.3991 25.6673 24.0012H30.3385C29.831 22.3991 29.0426 20.8915 28.0029 19.552ZM30.8171 26.0012H25.1888C25.0807 26.6594 25.0182 27.3275 25.0032 28.0012C25.0182 28.6749 25.0807 29.3431 25.1888 30.0012H30.8171C30.9252 29.3431 30.9877 28.6749 31.0027 28.0012C30.9877 27.3275 30.9252 26.6594 30.8171 26.0012ZM32.8405 30.0012C32.9343 29.3484 32.9888 28.6876 33.0027 28.022C33.003 28.0082 33.003 27.9943 33.0027 27.9804C32.9888 27.3149 32.9343 26.654 32.8405 26.0012H36.7799C36.9259 26.6444 37.0029 27.3138 37.0029 28.0012C37.0029 28.6886 36.9259 29.358 36.7799 30.0012H32.8405ZM30.3385 32.0012H25.6673C26.1749 33.6033 26.9633 35.111 28.0029 36.4504C29.0426 35.111 29.831 33.6033 30.3385 32.0012ZM25.7286 36.7114C24.7651 35.2632 24.0413 33.6724 23.5821 32.0012H19.9384C21.0837 34.3058 23.1877 36.0498 25.7286 36.7114ZM30.2772 36.7114C31.2407 35.2632 31.9645 33.6724 32.4237 32.0012H36.0674C34.9221 34.3058 32.8181 36.0498 30.2772 36.7114ZM36.0674 24.0012H32.4237C31.9645 22.33 31.2407 20.7393 30.2772 19.291C32.8181 19.9526 34.9221 21.6967 36.0674 24.0012ZM17.0029 28.0012C17.0029 21.9261 21.9278 17.0012 28.0029 17.0012C34.0781 17.0012 39.0029 21.9261 39.0029 28.0012C39.0029 34.0764 34.0781 39.0012 28.0029 39.0012C21.9278 39.0012 17.0029 34.0764 17.0029 28.0012Z"
                fill="#FCFDFF"
              />
            </svg>
          </button>
          {/* Info: (20240705 - Julian) i18n */}
          <div
            ref={lanRef}
            className={`absolute bottom-12 right-0 flex flex-col gap-y-16px rounded-xs border border-stroke-neutral-solid-light ${lanVisible ? 'visible opacity-100' : 'invisible opacity-0'
              } overflow-hidden bg-white/40 px-20px py-16px text-base text-text-neutral-invert backdrop-blur-md transition-all duration-300 ease-in-out`}
          >
            {languageMenu}
          </div>
        </div>
        <div>
          <Link
            id="contact-us-link"
            href={I_SUN_FA_URL.CONTACT_US}
            target="_blank"
            className="p-12px text-surface-neutral-surface-lv1 hover:text-button-text-secondary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 20 20"
            >
              <filter id="shadow">
                <feOffset in="SourceGraphic" dx="1" dy="1" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.192157 0 0 0 0 0.262745 0 0 0 0 0.384314 0 0 0 0.1 0"
                />
                <feGaussianBlur stdDeviation="1" />
                <feBlend in="SourceGraphic" in2="offOut" />
              </filter>

              <path
                filter="url(#shadow)"
                className="fill-current"
                fillRule="evenodd"
                d="M5.629 2.334H14.376c.666 0 1.225 0 1.683.038.479.039.934.124 1.366.344a3.5 3.5 0 011.53 1.53c.209.41.296.843.337 1.296.047.152.055.31.03.462.014.375.014.804.014 1.29v5.414c0 .666 0 1.225-.038 1.683-.039.479-.124.934-.344 1.366a3.5 3.5 0 01-1.53 1.53c-.431.22-.886.304-1.365.343-.458.038-1.017.038-1.683.038H5.629c-.666 0-1.225 0-1.683-.038-.479-.039-.934-.124-1.366-.344a3.5 3.5 0 01-1.53-1.53c-.22-.431-.304-.886-.344-1.365C.67 13.933.67 13.374.67 12.708V7.294c0-.486 0-.915.015-1.29a1 1 0 01.028-.462c.042-.453.13-.885.339-1.297a3.5 3.5 0 011.53-1.53c.431-.22.886-.304 1.365-.343.458-.038 1.017-.038 1.683-.038zm-2.96 5.421v4.913c0 .716 0 1.194.03 1.56.03.355.081.518.134.62a1.5 1.5 0 00.655.656c.103.053.266.104.62.133.367.03.845.03 1.561.03h8.667c.716 0 1.194 0 1.56-.03.355-.029.518-.08.62-.133a1.5 1.5 0 00.656-.655c.053-.103.104-.266.133-.62.03-.367.03-.845.03-1.561V7.755l-5.23 3.661a58.34 58.34 0 00-.103.073c-.445.313-.87.61-1.355.732a2.666 2.666 0 01-1.29 0c-.485-.121-.91-.42-1.354-.732l-.103-.073-5.23-3.66zm14.58-2.38l-6.29 4.403c-.62.433-.719.483-.795.502a.667.667 0 01-.323 0c-.076-.019-.176-.069-.794-.502l-6.29-4.403c.022-.101.049-.17.076-.222a1.5 1.5 0 01.655-.655c.103-.053.265-.104.62-.133.367-.03.845-.03 1.561-.03h8.667c.716 0 1.194 0 1.56.03.355.03.518.08.62.133a1.5 1.5 0 01.656.655c.027.053.053.12.077.222z"
                clipRule="evenodd"
              ></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPageBody;
