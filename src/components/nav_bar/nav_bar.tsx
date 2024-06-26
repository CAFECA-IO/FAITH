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
