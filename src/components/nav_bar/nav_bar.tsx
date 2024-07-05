import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { NATIVE_ROUTE } from '@/constants/url';
import version from '@/lib/version';
import { Button } from '@/components/button/button';
import { cn } from '@/lib/utils/common';
import { useChatCtx } from '@/contexts/chat_context';
import { useUserCtx } from '@/contexts/user_context';
import { useGlobalCtx } from '@/contexts/global_context';
import useOuterClick from '@/lib/hooks/use_outer_click';
import { ToastType } from '@/interfaces/toastify';
import { ToastId } from '@/constants/toast_id';

const NavBar = () => {
  const router = useRouter();

  const { isSignedIn, signOut } = useUserCtx();
  const { addEmptyChat } = useChatCtx();
  const { chatSettingModalVisibilityHandler, toastHandler, eliminateToast } = useGlobalCtx();

  // TODO: in dev (20240625 - Shirley)
  const {
    targetRef: userMenuRef,
    componentVisible: isUserMenuOpen,
    setComponentVisible: setIsUserMenuOpen,
  } = useOuterClick<HTMLDivElement>(false);

  const avatarClickHandler = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const logOutClickHandler = async () => {
    setIsUserMenuOpen(false);
    signOut();
    addEmptyChat();

    eliminateToast();
    toastHandler({
      id: ToastId.LOGOUT,
      type: ToastType.SUCCESS,
      content: 'You have successfully logged out!',
      closeable: true,
      autoClose: 3000,
    });
  };

  const buttonClickHandler = () => {
    router.push(NATIVE_ROUTE.LOGIN);
  };

  const newChatClickHandler = () => {
    // Info: redirect to / if now is not on / (20240627 - Shirley)
    if (router.pathname !== NATIVE_ROUTE.HOME) {
      router.push(NATIVE_ROUTE.HOME);
    } else {
      addEmptyChat();
    }
  };

  const languageButton = (
    <Button size={'small'} variant={'secondaryBorderless'}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <g>
          <path
            className="fill-current"
            fillRule="evenodd"
            d="M3.226 10.001a9.029 9.029 0 000 4h3.94a16.3 16.3 0 01-.163-2.02A16.3 16.3 0 017.165 10H3.226zm.712-2h3.644a16.302 16.302 0 012.147-4.71A9.02 9.02 0 003.939 8zm8.065-4.45a14.302 14.302 0 00-2.336 4.45h4.671a14.298 14.298 0 00-2.335-4.45zm2.814 6.45H9.19c-.108.658-.17 1.326-.186 2 .015.674.078 1.342.186 2h5.628c.108-.658.17-1.326.186-2a14.302 14.302 0 00-.186-2zm2.023 4a16.31 16.31 0 00.163-2.02A16.31 16.31 0 0016.84 10h3.94c.146.643.223 1.313.223 2 0 .688-.077 1.357-.223 2h-3.94zm-2.502 2h-4.67a14.302 14.302 0 002.335 4.45A14.298 14.298 0 0014.338 16zm-4.61 4.71a16.303 16.303 0 01-2.146-4.71H3.938a9.02 9.02 0 005.79 4.71zm4.55 0a16.303 16.303 0 002.146-4.71h3.643a9.02 9.02 0 01-5.79 4.71zm5.79-12.71h-3.644a16.302 16.302 0 00-2.147-4.71A9.02 9.02 0 0120.067 8zm-19.065 4c0-6.075 4.925-11 11-11s11 4.925 11 11-4.925 11-11 11-11-4.925-11-11z"
            clipRule="evenodd"
          ></path>
        </g>
      </svg>
    </Button>
  );

  const contactUsButton = (
    <Button
      size={'small'}
      variant={'secondaryBorderless'}
      className="flex justify-center py-1 max-md:px-5"
    >
      <div className="my-auto flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 20 20"
        >
          <g>
            <path
              className="fill-current"
              fillRule="evenodd"
              d="M5.629 2.334H14.376c.666 0 1.225 0 1.683.038.479.039.934.124 1.366.344a3.5 3.5 0 011.53 1.53c.209.41.296.843.337 1.296.047.152.055.31.03.462.014.375.014.804.014 1.29v5.414c0 .666 0 1.225-.038 1.683-.039.479-.124.934-.344 1.366a3.5 3.5 0 01-1.53 1.53c-.431.22-.886.304-1.365.343-.458.038-1.017.038-1.683.038H5.629c-.666 0-1.225 0-1.683-.038-.479-.039-.934-.124-1.366-.344a3.5 3.5 0 01-1.53-1.53c-.22-.431-.304-.886-.344-1.365C.67 13.933.67 13.374.67 12.708V7.294c0-.486 0-.915.015-1.29a1 1 0 01.028-.462c.042-.453.13-.885.339-1.297a3.5 3.5 0 011.53-1.53c.431-.22.886-.304 1.365-.343.458-.038 1.017-.038 1.683-.038zm-2.96 5.421v4.913c0 .716 0 1.194.03 1.56.03.355.081.518.134.62a1.5 1.5 0 00.655.656c.103.053.266.104.62.133.367.03.845.03 1.561.03h8.667c.716 0 1.194 0 1.56-.03.355-.029.518-.08.62-.133a1.5 1.5 0 00.656-.655c.053-.103.104-.266.133-.62.03-.367.03-.845.03-1.561V7.755l-5.23 3.661a58.34 58.34 0 00-.103.073c-.445.313-.87.61-1.355.732a2.666 2.666 0 01-1.29 0c-.485-.121-.91-.42-1.354-.732l-.103-.073-5.23-3.66zm14.58-2.38l-6.29 4.403c-.62.433-.719.483-.795.502a.667.667 0 01-.323 0c-.076-.019-.176-.069-.794-.502l-6.29-4.403c.022-.101.049-.17.076-.222a1.5 1.5 0 01.655-.655c.103-.053.265-.104.62-.133.367-.03.845-.03 1.561-.03h8.667c.716 0 1.194 0 1.56.03.355.03.518.08.62.133a1.5 1.5 0 01.656.655c.027.053.053.12.077.222z"
              clipRule="evenodd"
            ></path>
          </g>
        </svg>
      </div>
      <div className="hidden text-base font-normal leading-6 tracking-normal lg:block">
        Contact us
      </div>
    </Button>
  );

  const displayedUserMenu = isUserMenuOpen ? (
    <div className="absolute right-10 top-4.5rem z-50">
      <div className="flex flex-col gap-5 rounded-xs bg-white p-8px shadow-userMenu lg:p-4">
        <div className="flex items-center border-b border-divider-stroke-lv-4 pb-8px lg:hidden">
          <div>{languageButton}</div>
          <div>{contactUsButton}</div>
        </div>

        <Button
          size={'small'}
          variant={'secondaryBorderless'}
          className="flex w-full justify-start"
          onClick={chatSettingModalVisibilityHandler}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 20 20"
          >
            <g
              className="stroke-current"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            >
              <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"></path>
              <path d="M15.606 12.273a1.25 1.25 0 00.25 1.379l.046.045a1.517 1.517 0 11-2.144 2.144l-.046-.045a1.25 1.25 0 00-1.379-.25 1.25 1.25 0 00-.757 1.143v.13a1.515 1.515 0 01-3.03 0v-.069a1.25 1.25 0 00-.819-1.144 1.25 1.25 0 00-1.379.25l-.045.046a1.514 1.514 0 01-2.473-.492 1.515 1.515 0 01.329-1.652l.046-.046a1.25 1.25 0 00.25-1.379 1.25 1.25 0 00-1.144-.757h-.13a1.515 1.515 0 010-3.03h.069a1.25 1.25 0 001.144-.819 1.25 1.25 0 00-.25-1.379l-.046-.045a1.515 1.515 0 112.144-2.144l.046.046a1.25 1.25 0 001.379.25h.06a1.25 1.25 0 00.758-1.144v-.13a1.515 1.515 0 013.03 0v.069a1.25 1.25 0 00.758 1.144 1.25 1.25 0 001.379-.25l.045-.046a1.516 1.516 0 112.144 2.144l-.046.046a1.25 1.25 0 00-.25 1.379v.06a1.25 1.25 0 001.144.758h.13a1.515 1.515 0 110 3.03h-.069a1.25 1.25 0 00-1.144.758z"></path>
            </g>
          </svg>
          <p className="font-normal">Setting</p>
        </Button>

        <Button
          size={'small'}
          variant={'secondaryBorderless'}
          className="flex w-full justify-start"
          onClick={logOutClickHandler}
        >
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
              d="M7.955 3.31c-.198-.052-.463-.059-1.286-.059h-.417c-.592 0-1 0-1.316.022-.31.021-.48.06-.603.111a1.75 1.75 0 00-.947.947c-.051.123-.09.293-.112.603-.021.317-.022.724-.022 1.317v7.5c0 .593 0 1 .022 1.317.022.31.06.48.112.603.177.429.518.77.947.947.123.05.292.09.603.111.317.022.724.022 1.316.022h.417c.823 0 1.088-.006 1.286-.06a1.75 1.75 0 001.238-1.237c.053-.199.06-.463.06-1.286a.75.75 0 011.5 0v.108c0 .67 0 1.15-.111 1.566a3.25 3.25 0 01-2.298 2.298c-.416.112-.897.111-1.567.111h-.551c-.56 0-1.018 0-1.393-.025-.386-.027-.738-.083-1.074-.222a3.25 3.25 0 01-1.76-1.76c-.138-.335-.195-.687-.221-1.074-.026-.374-.026-.832-.026-1.393V6.225c0-.56 0-1.019.026-1.393.026-.387.083-.738.222-1.075a3.25 3.25 0 011.759-1.759c.336-.139.688-.195 1.075-.221.374-.026.832-.026 1.392-.026h.551c.67 0 1.151 0 1.567.11a3.25 3.25 0 012.298 2.299c.111.415.11.897.11 1.566v.108a.75.75 0 11-1.5 0c0-.823-.006-1.087-.06-1.286a1.75 1.75 0 00-1.237-1.237zm4.85 1.994a.75.75 0 011.061 0l4.167 4.167a.75.75 0 010 1.06l-4.167 4.167a.75.75 0 01-1.06-1.06l2.886-2.887h-8.19a.75.75 0 010-1.5h8.19l-2.887-2.886a.75.75 0 010-1.06z"
              clipRule="evenodd"
            ></path>
          </svg>
          <p className="font-normal">Logout</p>
        </Button>
      </div>
    </div>
  ) : null;

  const isDisplayedDiscoverButton = isSignedIn ? (
    <Link href={NATIVE_ROUTE.DISCOVER} className="my-auto hidden lg:flex">
      <Button size={'small'} variant={'secondaryBorderless'}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path
              className="fill-current"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.0029 1.25098C12.4171 1.25098 12.7529 1.58676 12.7529 2.00098V3.00098C12.7529 3.41519 12.4171 3.75098 12.0029 3.75098C11.5887 3.75098 11.2529 3.41519 11.2529 3.00098V2.00098C11.2529 1.58676 11.5887 1.25098 12.0029 1.25098ZM4.3725 4.37055C4.6654 4.07766 5.14027 4.07766 5.43316 4.37055L6.03326 4.97065C6.32615 5.26354 6.32615 5.73841 6.03326 6.03131C5.74037 6.3242 5.26549 6.3242 4.9726 6.03131L4.3725 5.43121C4.07961 5.13832 4.07961 4.66344 4.3725 4.37055ZM19.6336 4.37062C19.9264 4.66355 19.9264 5.13842 19.6334 5.43128L19.0332 6.03137C18.7403 6.32423 18.2654 6.32417 17.9725 6.03124C17.6797 5.73831 17.6797 5.26344 17.9727 4.97058L18.5729 4.37048C18.8658 4.07763 19.3407 4.07769 19.6336 4.37062ZM5.25293 12.001C5.25293 8.27305 8.27501 5.25098 12.0029 5.25098C15.7309 5.25098 18.7529 8.27305 18.7529 12.001C18.7529 14.1188 17.7769 16.0087 16.2529 17.2453V18.801V18.8314C16.2529 19.3656 16.2529 19.8114 16.2232 20.1756C16.1922 20.5555 16.125 20.9122 15.9532 21.2495C15.6895 21.7669 15.2688 22.1876 14.7514 22.4512C14.4141 22.6231 14.0575 22.6902 13.6776 22.7212C13.3134 22.751 12.8675 22.751 12.3334 22.751H12.3029H11.7029H11.6725C11.1383 22.751 10.6925 22.751 10.3283 22.7212C9.94837 22.6902 9.59172 22.6231 9.25446 22.4512C8.73701 22.1876 8.31631 21.7669 8.05266 21.2495C7.88082 20.9122 7.81371 20.5555 7.78267 20.1756C7.75291 19.8114 7.75292 19.3656 7.75293 18.8314V18.801V17.2453C6.22892 16.0087 5.25293 14.1188 5.25293 12.001ZM12.0029 6.75098C9.10343 6.75098 6.75293 9.10148 6.75293 12.001C6.75293 13.757 7.61432 15.3118 8.94091 16.2661C9.13681 16.407 9.25293 16.6336 9.25293 16.8749V18.801C9.25293 19.3734 9.25351 19.7576 9.27769 20.0535C9.30115 20.3406 9.34303 20.4779 9.38917 20.5685C9.50901 20.8037 9.70024 20.9949 9.93544 21.1147C10.026 21.1609 10.1633 21.2028 10.4504 21.2262C10.7463 21.2504 11.1305 21.251 11.7029 21.251H12.3029C12.8754 21.251 13.2596 21.2504 13.5555 21.2262C13.8426 21.2028 13.9799 21.1609 14.0704 21.1147C14.3056 20.9949 14.4968 20.8037 14.6167 20.5685C14.6628 20.4779 14.7047 20.3406 14.7282 20.0535C14.7523 19.7576 14.7529 19.3734 14.7529 18.801V16.8749C14.7529 16.6336 14.8691 16.407 15.065 16.2661C16.3915 15.3118 17.2529 13.757 17.2529 12.001C17.2529 9.10148 14.9024 6.75098 12.0029 6.75098ZM1.25293 12.001C1.25293 11.5868 1.58872 11.251 2.00293 11.251H3.00293C3.41714 11.251 3.75293 11.5868 3.75293 12.001C3.75293 12.4152 3.41714 12.751 3.00293 12.751H2.00293C1.58872 12.751 1.25293 12.4152 1.25293 12.001ZM20.2529 12.001C20.2529 11.5868 20.5887 11.251 21.0029 11.251H22.0029C22.4171 11.251 22.7529 11.5868 22.7529 12.001C22.7529 12.4152 22.4171 12.751 22.0029 12.751H21.0029C20.5887 12.751 20.2529 12.4152 20.2529 12.001ZM9.25293 13.501C9.25293 13.0868 9.58872 12.751 10.0029 12.751H12.0029H14.0029C14.4171 12.751 14.7529 13.0868 14.7529 13.501C14.7529 13.9152 14.4171 14.251 14.0029 14.251H12.7529V18.501C12.7529 18.9152 12.4171 19.251 12.0029 19.251C11.5887 19.251 11.2529 18.9152 11.2529 18.501V14.251H10.0029C9.58872 14.251 9.25293 13.9152 9.25293 13.501Z"
              fill="#001840"
            />
          </g>
        </svg>
      </Button>
    </Link>
  ) : null;

  const displayedLogInBtn = isSignedIn ? (
    <div ref={userMenuRef}>
      <button
        type="button"
        onClick={avatarClickHandler}
        className="flex h-full w-full justify-center"
      >
        {/* Info: avatar svg (20240408 - Shirley) */}
        <Image src={`/elements/default_user.svg`} alt="avatar" width={40} height={40} />
      </button>
      {displayedUserMenu}
    </div>
  ) : (
    <>
      {/* Info: (20240704 - Julian) Desktop login button */}
      <div className="hidden space-x-5 lg:flex">
        <Button onClick={buttonClickHandler} variant={'tertiary'} size={'medium'}>
          <p>Register</p>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 16 16"
          >
            <g>
              <path
                fill="#FCFDFF"
                fillRule="evenodd"
                d="M6.669 2.751a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zm-3.75 2.25a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zm9.75 4.25a.75.75 0 01.75.75v1.25h1.25a.75.75 0 010 1.5h-1.25v1.25a.75.75 0 01-1.5 0v-1.25h-1.25a.75.75 0 110-1.5h1.25v-1.25a.75.75 0 01.75-.75zm-7.791.333h3.124a.75.75 0 110 1.5h-3c-.985 0-1.311.009-1.556.083a1.917 1.917 0 00-1.278 1.278c-.074.245-.082.571-.082 1.556a.75.75 0 01-1.5 0v-.124c0-.81-.001-1.38.147-1.868A3.417 3.417 0 013.01 9.732c.488-.148 1.058-.148 1.868-.148z"
                clipRule="evenodd"
              ></path>
            </g>
          </svg>
        </Button>
        <Button
          onClick={buttonClickHandler}
          className=""
          variant={'tertiaryOutline'}
          size={'medium'}
        >
          <p className={cn('text-base leading-6 tracking-normal')}>Login</p>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 16 16"
          >
            <g>
              <path
                className="fill-current"
                fillRule="evenodd"
                d="M6.557 1.001h4.284c.527 0 .982 0 1.356.03.396.033.789.104 1.167.297l-.448.88.448-.88a3 3 0 011.311 1.311c.193.379.264.772.297 1.167.03.375.03.83.03 1.357v5.677c0 .527 0 .982-.03 1.356-.033.396-.104.789-.297 1.167a3 3 0 01-1.31 1.311c-.38.193-.772.264-1.168.296-.374.031-.83.031-1.356.031H6.557c-.508 0-.946.001-1.331-.102a3 3 0 01-2.122-2.121c-.103-.386-.102-.824-.102-1.332v-.112a1 1 0 112 0c0 .685.009.83.034.926l-.966.259.966-.26a1 1 0 00.707.708c.095.025.241.034.926.034h4.133c.577 0 .949 0 1.232-.024.272-.022.373-.06.422-.085a1 1 0 00.437-.437c.025-.05.063-.15.085-.422.023-.283.024-.655.024-1.232v-5.6c0-.576 0-.949-.024-1.232-.022-.272-.06-.372-.085-.422a1 1 0 00-.437-.437l.454-.89-.454.89c-.05-.025-.15-.063-.422-.085-.283-.023-.655-.024-1.232-.024H6.67c-.684 0-.83.009-.926.034a1 1 0 00-.707.707c-.025.095-.034.241-.034.926a1 1 0 01-2 0v-.112c0-.508 0-.946.102-1.331a3 3 0 012.122-2.122C5.61 1 6.049 1 6.557 1.001zm.738 3.626a1 1 0 011.414 0l2.667 2.667a1 1 0 010 1.414l-2.667 2.667A1 1 0 017.295 9.96l.96-.96H2.002a1 1 0 110-2h6.253l-.96-.96a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </g>
          </svg>
        </Button>
      </div>
      {/* Info: (20240704 - Julian) Mobile login button */}
      <div className="block lg:hidden">
        <Button type="button" className="h-44px w-44px p-0" onClick={buttonClickHandler}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path
                className="fill-current"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.22784 1.75107C8.26328 1.75108 8.29925 1.7511 8.33577 1.7511H13.5024L13.5339 1.7511C14.2072 1.75109 14.7579 1.75108 15.2055 1.78765C15.6688 1.8255 16.0872 1.90624 16.4779 2.10533L16.1397 2.76903L16.4779 2.10533C17.0894 2.41692 17.5866 2.9141 17.8982 3.52563C18.0973 3.91637 18.178 4.33477 18.2159 4.79803C18.2525 5.2456 18.2524 5.79632 18.2524 6.46971V6.5011V13.5011V13.5325C18.2524 14.2059 18.2525 14.7566 18.2159 15.2042C18.178 15.6674 18.0973 16.0858 17.8982 16.4766C17.5866 17.0881 17.0894 17.5853 16.4779 17.8969C16.0872 18.096 15.6688 18.1767 15.2055 18.2146C14.7579 18.2511 14.2072 18.2511 13.5338 18.2511H13.5024H8.33577C8.29926 18.2511 8.26329 18.2511 8.22785 18.2511C7.55797 18.2514 7.07664 18.2517 6.66128 18.1404C5.53973 17.8398 4.6637 16.9638 4.36318 15.8423C4.25189 15.4269 4.25211 14.9456 4.25241 14.2757C4.25242 14.2403 4.25244 14.2043 4.25244 14.1678C4.25244 13.7536 4.58823 13.4178 5.00244 13.4178C5.41665 13.4178 5.75244 13.7536 5.75244 14.1678C5.75244 14.991 5.75888 15.2555 5.81207 15.454L5.08763 15.6481L5.81207 15.454C5.97389 16.0579 6.4456 16.5297 7.04951 16.6915C7.24801 16.7447 7.51251 16.7511 8.33577 16.7511H13.5024C14.2149 16.7511 14.7041 16.7505 15.0834 16.7195C15.4539 16.6893 15.6529 16.6338 15.7969 16.5604C16.1262 16.3926 16.3939 16.1249 16.5617 15.7956C16.6351 15.6515 16.6906 15.4525 16.7209 15.082C16.7519 14.7028 16.7524 14.2135 16.7524 13.5011V6.5011C16.7524 5.78866 16.7519 5.29943 16.7209 4.92018C16.6906 4.54968 16.6351 4.35066 16.5617 4.20662L17.1951 3.8839L16.5617 4.20662C16.3939 3.87733 16.1262 3.60962 15.7969 3.44184C15.6529 3.36845 15.4539 3.31294 15.0834 3.28267C14.7041 3.25168 14.2149 3.2511 13.5024 3.2511H8.33577C7.51251 3.2511 7.24801 3.25754 7.04951 3.31073C6.4456 3.47255 5.97389 3.94426 5.81207 4.54817C5.75888 4.74667 5.75244 5.01117 5.75244 5.83443C5.75244 6.24865 5.41665 6.58443 5.00244 6.58443C4.58823 6.58443 4.25244 6.24865 4.25244 5.83443C4.25244 5.79791 4.25242 5.76194 4.25241 5.7265C4.25211 5.05662 4.25189 4.57529 4.36318 4.15994C4.6637 3.03839 5.53973 2.16236 6.66128 1.86184C7.07663 1.75055 7.55796 1.75077 8.22784 1.75107ZM9.47211 6.13744C9.765 5.84454 10.2399 5.84454 10.5328 6.13744L13.8661 9.47077C14.159 9.76366 14.159 10.2385 13.8661 10.5314L10.5328 13.8648C10.2399 14.1577 9.765 14.1577 9.47211 13.8648C9.17922 13.5719 9.17922 13.097 9.47211 12.8041L11.5251 10.7511H2.50244C2.08823 10.7511 1.75244 10.4153 1.75244 10.0011C1.75244 9.58689 2.08823 9.2511 2.50244 9.2511H11.5251L9.47211 7.1981C9.17922 6.9052 9.17922 6.43033 9.47211 6.13744Z"
              />
            </g>
          </svg>
        </Button>
      </div>
    </>
  );

  return (
    <div className="fixed top-0 z-20 flex w-screen">
      <div className="z-60 flex h-80px w-full items-center gap-5 bg-surface-neutral-surface-lv1 px-80px py-8px shadow-navbar max-md:flex-wrap max-md:px-5 lg:h-60px">
        <div className="my-auto hidden flex-1 items-center lg:flex">
          <div className="flex flex-col items-center justify-center gap-2 lg:flex-row lg:items-end lg:justify-end">
            <Link href={NATIVE_ROUTE.HOME} className="shrink-0">
              {/* Info: (20240417 - Julian) Desktop logo */}
              <Image
                src="/logo/isunfa_logo_light.svg"
                width={130}
                height={20}
                alt="iSunFA_logo"
                className="hidden lg:block"
              />
              {/* Info: (20240417 - Julian) Mobile logo */}
              <Image
                src="/logo/isunfa_logo_small_light.svg"
                width={50}
                height={40}
                alt="iSunFA_logo"
                className="block lg:hidden"
              />
            </Link>
            <div className="my-auto flex flex-col justify-center self-stretch rounded-xs bg-primaryYellow3 px-1 text-primaryYellow2">
              <div className="flex flex-col justify-center rounded-xs px-0.1rem py-1">
                <div className="justify-center px-1 text-xs">v{version}</div>
              </div>
            </div>
          </div>

          {/* TODO: links on mobile (20240408 - Shirley) */}
          <div className="my-auto flex flex-1 gap-5 max-md:flex-wrap lg:pr-0">
            <Button
              onClick={newChatClickHandler}
              size={'small'}
              variant={'secondaryBorderless'}
              className="flex justify-center py-1 lg:ml-10"
            >
              <div className="my-auto flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <g>
                    <path
                      className="stroke-current"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M5.079 9.357A6.674 6.674 0 015 8.333c0-3.682 3.004-6.666 6.71-6.666 3.707 0 6.711 2.984 6.711 6.666 0 .832-.153 1.628-.433 2.362-.058.153-.088.23-.1.289a.744.744 0 00-.02.16c-.002.062.006.129.023.263l.335 2.725c.037.295.055.443.006.55a.417.417 0 01-.214.21c-.109.046-.256.024-.55-.019l-2.654-.389c-.139-.02-.208-.03-.271-.03a.743.743 0 00-.167.018c-.062.013-.14.042-.298.101a6.735 6.735 0 01-3.393.35m-4.325 3.41c2.47 0 4.473-2.052 4.473-4.583S8.83 9.167 6.36 9.167c-2.471 0-4.474 2.052-4.474 4.583 0 .509.08.998.23 1.456.063.193.095.29.105.356a.71.71 0 01.01.177c-.005.067-.022.142-.055.293l-.51 2.301 2.496-.34c.137-.02.205-.028.264-.028.063 0 .096.004.157.016.059.012.145.042.319.103a4.37 4.37 0 001.458.25z"
                    ></path>
                  </g>
                </svg>
              </div>
              <div className="text-base font-normal leading-6 tracking-normal">New Chat</div>
            </Button>
            {contactUsButton}
          </div>
        </div>

        {isDisplayedDiscoverButton}

        {/* TODO: icons on mobile (20240408 - Shirley) */}
        <div className="my-auto hidden lg:flex">{languageButton}</div>

        <div className="hidden flex-col items-start justify-center lg:flex">
          <div className="h-40px w-px shrink-0 bg-lightGray6" />
        </div>

        {/* TODO: (20240704 - Julian) Mobile sidebar */}
        <div className="block flex-1 lg:hidden">
          <button id="mobile-sidebar-toggle" type="button" className="p-10px">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.25293 6.0011C2.25293 5.58689 2.58872 5.2511 3.00293 5.2511H21.0029C21.4171 5.2511 21.7529 5.58689 21.7529 6.0011C21.7529 6.41531 21.4171 6.7511 21.0029 6.7511H3.00293C2.58872 6.7511 2.25293 6.41531 2.25293 6.0011ZM2.25293 12.0011C2.25293 11.5869 2.58872 11.2511 3.00293 11.2511H21.0029C21.4171 11.2511 21.7529 11.5869 21.7529 12.0011C21.7529 12.4153 21.4171 12.7511 21.0029 12.7511H3.00293C2.58872 12.7511 2.25293 12.4153 2.25293 12.0011ZM2.25293 18.0011C2.25293 17.5869 2.58872 17.2511 3.00293 17.2511H21.0029C21.4171 17.2511 21.7529 17.5869 21.7529 18.0011C21.7529 18.4153 21.4171 18.7511 21.0029 18.7511H3.00293C2.58872 18.7511 2.25293 18.4153 2.25293 18.0011Z"
                  fill="#001840"
                />
              </g>
            </svg>
          </button>
        </div>

        <div className="my-auto">{displayedLogInBtn}</div>
      </div>
    </div>
  );
};

export default NavBar;
