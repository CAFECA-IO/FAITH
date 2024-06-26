import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/button/button';

const ChatSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  return (
    <div className="font-barlow">
      <div
        className={`relative ${isExpanded ? 'w-200px' : 'w-0'} transition-all duration-300 ease-in-out`}
      ></div>

      <Button
        variant={'secondaryBorderless'}
        size={'extraSmall'}
        type="button"
        onClick={toggleSidebar}
        className={`absolute top-96 ${isExpanded ? 'left-240px' : 'left-0'} z-40 hidden transition-all duration-300 ease-in-out lg:block`}
      >
        {isExpanded ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="38"
            fill="none"
            viewBox="0 0 8 38"
          >
            <path stroke="#C1C9D5" strokeLinecap="round" strokeWidth="6" d="M4 3v32"></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="38"
            fill="none"
            viewBox="0 0 14 38"
          >
            <path
              stroke="#C1C9D5"
              strokeLinecap="round"
              strokeWidth="6"
              d="M3 35l6.882-13.764a5 5 0 000-4.472L3 3"
            ></path>
          </svg>
        )}
      </Button>

      {/* Info: ----- desktop version (20240423 - Shirley) ----- */}
      <div
        className={`fixed z-10 hidden h-screen flex-col items-center bg-surface-brand-primary-5 lg:flex ${isExpanded ? 'w-240px' : 'w-0 -translate-x-240px'} px-12px pb-40px pt-100px transition-all duration-300 ease-in-out`}
      >
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center">
            <Image
              src={'/logo/isunfa_pure_logo.svg'}
              width={20}
              height={20}
              alt="isunfa logo"
              className="z-10 h-5 w-5"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="none"
              viewBox="0 0 40 40"
              className="absolute"
            >
              <circle cx="20" cy="20" r="19" stroke="#CDD1D9" strokeWidth="2"></circle>
            </svg>
          </div>

          <p
            className={`text-lg font-medium text-button-text-secondary transition-all duration-300 ease-in-out`}
          >
            My Chat List
          </p>
        </div>

        <div className="flex h-full w-full flex-col items-center justify-end text-lg">
          <Button
            size={'medium'}
            variant={'secondaryOutline'}
            className="text-button-text-secondary"
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
                d="M8.438 3.301c-.117-.04-.264-.05-.917-.05H4.336c-.48 0-.794 0-1.034.02-.231.02-.327.052-.382.08a.917.917 0 00-.401.4c-.028.056-.06.152-.08.383-.018.226-.02.518-.02.95h7.203l-.387-.773.636-.318-.636.318c-.291-.584-.366-.712-.455-.798a.917.917 0 00-.342-.212zm2.861 1.783l-.722-1.444-.044-.089c-.223-.447-.411-.824-.703-1.11l-.525.536.525-.536a2.417 2.417 0 00-.903-.558l-.2.58.2-.58c-.386-.133-.807-.133-1.307-.132H4.306c-.441 0-.817 0-1.126.025-.324.027-.64.085-.941.238a2.417 2.417 0 00-1.056 1.057c-.154.301-.212.617-.239.941C.92 4.321.92 4.697.92 5.138v8.395c0 .673 0 1.224.037 1.671.038.463.118.882.317 1.273a3.25 3.25 0 001.42 1.42c.391.199.81.28 1.273.318.448.036.998.036 1.672.036H14.367c.674 0 1.224 0 1.672-.037.463-.037.881-.118 1.272-.317a3.25 3.25 0 001.42-1.42c.2-.391.28-.81.318-1.273.037-.447.037-.998.037-1.671v-3.73c0-.673 0-1.224-.037-1.672-.038-.463-.118-.881-.317-1.272a3.25 3.25 0 00-1.42-1.42c-.392-.2-.81-.28-1.273-.318-.448-.037-.998-.037-1.672-.037H11.3zm-.478 1.5h3.515c.712 0 1.201.001 1.58.032.371.03.57.086.714.16.33.167.597.435.765.764.073.144.129.343.16.714.03.379.03.868.03 1.58v3.667c0 .713 0 1.202-.03 1.581-.031.37-.087.57-.16.714a1.75 1.75 0 01-.765.764c-.144.074-.343.13-.713.16-.38.03-.869.031-1.581.031H5.669c-.712 0-1.202 0-1.58-.032-.371-.03-.57-.085-.714-.159a1.75 1.75 0 01-.765-.764c-.074-.144-.129-.343-.16-.714-.03-.38-.03-.869-.03-1.58V6.583h8.4zm-.819 1.834a.75.75 0 01.75.75v1.75h1.75a.75.75 0 110 1.5h-1.75v1.75a.75.75 0 01-1.5 0v-1.75h-1.75a.75.75 0 010-1.5h1.75v-1.75a.75.75 0 01.75-.75z"
                clipRule="evenodd"
              ></path>
            </svg>
            <p className="text-base">Add New Folder</p>{' '}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
