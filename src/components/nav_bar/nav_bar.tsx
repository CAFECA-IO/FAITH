import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
// import useOuterClick from '../../lib/hooks/use_outer_click';
import { NATIVE_ROUTE } from '@/constants/url';
import version from '@/lib/version';
import { Button } from '@/components/button/button';
import { cn } from '@/lib/utils/common';

const NavBar = () => {
  // TODO: in dev (20240625 - Shirley)
  // const {
  //   targetRef: userMenuRef,
  //   componentVisible: isUserMenuOpen,
  //   setComponentVisible: setIsUserMenuOpen,
  // } = useOuterClick<HTMLDivElement>(false);

  // const logOutClickHandler = async () => {
  //   setIsUserMenuOpen(false);
  // };

  // const displayedUserMenu = isUserMenuOpen ? (
  //   <div className="absolute right-10 top-20 z-50">
  //     <div className="max-w-[248px] flex-col rounded-2xl bg-white p-4 shadow-xl">
  //       <img
  //         srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/a7d6ae28b20ae9f8039f351ff2014cd414f4bdb3f62c8e6e14e9d5a5c7a391cf?apiKey=0e17b0b875f041659e186639705112b1&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/a7d6ae28b20ae9f8039f351ff2014cd414f4bdb3f62c8e6e14e9d5a5c7a391cf?apiKey=0e17b0b875f041659e186639705112b1&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a7d6ae28b20ae9f8039f351ff2014cd414f4bdb3f62c8e6e14e9d5a5c7a391cf?apiKey=0e17b0b875f041659e186639705112b1&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/a7d6ae28b20ae9f8039f351ff2014cd414f4bdb3f62c8e6e14e9d5a5c7a391cf?apiKey=0e17b0b875f041659e186639705112b1&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/a7d6ae28b20ae9f8039f351ff2014cd414f4bdb3f62c8e6e14e9d5a5c7a391cf?apiKey=0e17b0b875f041659e186639705112b1&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a7d6ae28b20ae9f8039f351ff2014cd414f4bdb3f62c8e6e14e9d5a5c7a391cf?apiKey=0e17b0b875f041659e186639705112b1&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/a7d6ae28b20ae9f8039f351ff2014cd414f4bdb3f62c8e6e14e9d5a5c7a391cf?apiKey=0e17b0b875f041659e186639705112b1&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/a7d6ae28b20ae9f8039f351ff2014cd414f4bdb3f62c8e6e14e9d5a5c7a391cf?apiKey=0e17b0b875f041659e186639705112b1&"
  //         className="mx-auto aspect-square w-16 self-center"
  //       />
  //       <div className="mt-3 flex justify-center gap-0 px-16">
  //         <div className="text-secondaryBlue my-auto text-base font-semibold leading-6 tracking-normal">
  //           Joyce
  //         </div>
  //         <div className="flex flex-col justify-center rounded-md p-2.5">
  //           <div className="flex items-center justify-center">
  //             <img
  //               src="https://cdn.builder.io/api/v1/image/assets/TEMP/81424e1f4bb6c5d2f3b559ea40f9f188932a4c8bd82176e3de86e8257c95ec6e?apiKey=0e17b0b875f041659e186639705112b1&"
  //               className="aspect-square w-4"
  //             />
  //           </div>
  //         </div>
  //       </div>
  //       <div className="mt-3 flex flex-col justify-center">
  //         <div className="flex flex-col justify-center">
  //           <div className="h-px shrink-0 border border-solid border-gray-300 bg-gray-300" />
  //         </div>
  //       </div>
  //       <div className="mt-3 flex gap-2 rounded-md px-6 py-2.5">
  //         <div className="my-auto flex items-center justify-center">
  //           <img
  //             src="https://cdn.builder.io/api/v1/image/assets/TEMP/b2440bc7dff988603a015147398e81878220ce5264999f173e13e28a3f19ba26?apiKey=0e17b0b875f041659e186639705112b1&"
  //             className="aspect-square w-5"
  //           />
  //         </div>
  //         <div className="text-base font-normal leading-6 tracking-normal text-sky-950">
  //           Subscription & Bills
  //         </div>
  //       </div>
  //       <div className="mt-3 flex gap-2 rounded-md px-6 py-2.5">
  //         <div className="my-auto flex items-center justify-center">
  //           <img
  //             src="https://cdn.builder.io/api/v1/image/assets/TEMP/d483779fe7b5d1853e7ad9a6a31acef6c171fae39e7875d3e3e346af17601c37?apiKey=0e17b0b875f041659e186639705112b1&"
  //             className="aspect-square w-5"
  //           />
  //         </div>
  //         <div className="text-base font-normal leading-6 tracking-normal text-sky-950">
  //           Setting
  //         </div>
  //       </div>
  //       <div className="mt-3 flex flex-col justify-center py-2.5">
  //         <div className="flex flex-col justify-center">
  //           <div className="h-px shrink-0 border border-solid border-gray-300 bg-gray-300" />
  //         </div>
  //       </div>
  //       <button
  //         type="button"
  //         onClick={logOutClickHandler}
  //         className="mt-3 flex w-full gap-2 rounded-md px-6 py-2.5 hover:opacity-70"
  //       >
  //         <div className="my-auto flex items-center justify-center">
  //           <img
  //             src="https://cdn.builder.io/api/v1/image/assets/TEMP/ca0dfc144be43547f4337c7f445306d81e5d800962d761f417c4dcad926c5c8a?apiKey=0e17b0b875f041659e186639705112b1&"
  //             className="aspect-square w-5"
  //           />
  //         </div>
  //         <div className="text-secondaryBlue2 text-base font-normal leading-6 tracking-normal">
  //           Logout
  //         </div>
  //       </button>
  //     </div>
  //   </div>
  // ) : null;

  const isDisplayedDiscoverButton = (
    /* ToDo: (20240626 - Julian) icons on mobile */
    /* ToDo: (20240626 - Julian) only show when user is logged in */
    <Link href={'/discover'} className="my-auto hidden lg:flex">
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
  );

  const displayedLogInBtn = (
    <div className="flex space-x-5">
      <Button variant={'tertiary'} size={'medium'}>
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
      <Button className="" variant={'tertiaryOutline'} size={'medium'}>
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
  );

  return (
    <div className="fixed top-0 z-20 flex w-screen">
      <div className="z-60 flex h-80px w-full items-center gap-5 bg-surface-neutral-surface-lv1 px-80px py-8px shadow-navbar max-md:flex-wrap max-md:px-5 lg:h-60px">
        <div className="my-auto flex flex-1 items-center">
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
          <div className="my-auto hidden flex-1 gap-5 max-md:flex-wrap lg:flex lg:pr-0">
            <Button
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
                  <g clipPath="url(#clip0_223_1983)">
                    <path
                      className="stroke-current"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M5.079 9.357A6.674 6.674 0 015 8.333c0-3.682 3.004-6.666 6.71-6.666 3.707 0 6.711 2.984 6.711 6.666 0 .832-.153 1.628-.433 2.362-.058.153-.088.23-.1.289a.744.744 0 00-.02.16c-.002.062.006.129.023.263l.335 2.725c.037.295.055.443.006.55a.417.417 0 01-.214.21c-.109.046-.256.024-.55-.019l-2.654-.389c-.139-.02-.208-.03-.271-.03a.743.743 0 00-.167.018c-.062.013-.14.042-.298.101a6.735 6.735 0 01-3.393.35m-4.325 3.41c2.47 0 4.473-2.052 4.473-4.583S8.83 9.167 6.36 9.167c-2.471 0-4.474 2.052-4.474 4.583 0 .509.08.998.23 1.456.063.193.095.29.105.356a.71.71 0 01.01.177c-.005.067-.022.142-.055.293l-.51 2.301 2.496-.34c.137-.02.205-.028.264-.028.063 0 .096.004.157.016.059.012.145.042.319.103a4.37 4.37 0 001.458.25z"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_223_1983">
                      <path fill="#fff" d="M0 0H20V20H0z"></path>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="text-base font-normal leading-6 tracking-normal">New Chat</div>
            </Button>
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
              <div className="text-base font-normal leading-6 tracking-normal">Contact us</div>
            </Button>
          </div>
        </div>

        {isDisplayedDiscoverButton}

        {/* TODO: icons on mobile (20240408 - Shirley) */}
        <div className="my-auto hidden lg:flex">
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
        </div>

        <div className="hidden flex-col items-start justify-center lg:flex">
          <div className="h-40px w-px shrink-0 bg-lightGray6" />
        </div>

        <div className="my-auto hidden lg:flex"> {displayedLogInBtn}</div>
      </div>
    </div>
  );
};

export default NavBar;
