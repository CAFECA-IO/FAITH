import Head from 'next/head';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useChatCtx } from '@/contexts/chat_context';
import ChatSidebar from '@/components/chat_sidebar/chat_sidebar';
import NavBar from '@/components/nav_bar/nav_bar';
import { Button } from '@/components/button/button';
import { cn } from '@/lib/utils/common';
import useOuterClick from '@/lib/hooks/use_outer_click';
import { SortOptions } from '@/constants/display';
import SortToggle from '@/components/sort_toggle/sort_toggle';
import { IChat, dummyChats } from '@/interfaces/chat';
import ChatList from '@/components/chat_list/chat_list';
import Pagination from '@/components/pagination/pagination';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { ITranslateFunction } from '@/interfaces/locale';

enum FolderType {
  ALL = 'COMMON.ALL_TYPE',
  SHARED = 'FOLDER.SHARED_CHATS',
  PRIVATE = 'FOLDER.PRIVATE_CHATS',
}

interface IFolderOverviewPageProps {
  folderId: string;
}

const FolderOverviewPage = ({ folderId }: IFolderOverviewPageProps) => {
  const { t }: { t: ITranslateFunction } = useTranslation('common');
  const { folders, renameFolder } = useChatCtx();

  const folderData = folders ? folders.find((f) => f.id === folderId) : null;

  const id = folderData?.id ?? '';
  const folderName = folderData?.name ?? '';

  const [isRenaming, setIsRenaming] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const [newName, setNewName] = useState(folderName);
  const inputRef = useRef<HTMLInputElement>(null);

  const [selectedType, setSelectedType] = useState<FolderType>(FolderType.ALL);
  const [search, setSearch] = useState<string>('');
  const [sort, setSort] = useState<SortOptions>(SortOptions.NEWEST);
  const [currentPage, setCurrentPage] = useState<number>(1);
  // ToDo: (20240708 - Julian) Filtered chats
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filteredChats, setFilteredChats] = useState<IChat[]>(dummyChats);
  // ToDo: (20240708 - Julian) Get total page from API
  const totalPages = 5;

  useEffect(() => {
    if (isRenaming && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isRenaming]);

  const {
    targetRef: typeRef,
    componentVisible: typeVisible,
    setComponentVisible: setTypeVisible,
  } = useOuterClick<HTMLDivElement>(false);

  // Info: (20240709 - Julian) Renaming handler
  const renamingHandler = () => {
    setIsRenaming(true);
  };
  const handleRenameSubmit = () => {
    if (newName.trim() !== '' && !isComposing) {
      renameFolder(id, newName);
      setNewName(newName.trim());
      setIsRenaming(false);
    }
  };
  const handleCompositionStart = () => setIsComposing(true);
  const handleCompositionEnd = () => setIsComposing(false);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isComposing) {
      handleRenameSubmit();
    }
  };

  const searchChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  const sortClickHandler = () => {
    setSort(sort === SortOptions.NEWEST ? SortOptions.OLDEST : SortOptions.NEWEST);
  };
  const typeToggleHandler = () => {
    setTypeVisible(!typeVisible);
  };

  // ToDo: (20240708 - Julian) Description needed
  const description =
    'The UI/UX folder collects related questions and information about UI and UX.';
  const totalChatCount = 99;
  const sharedChatCount = 46;
  const privateChatCount = 11;

  const displayedTypeOptions = (
    <div
      ref={typeRef}
      className={`absolute top-50px z-30 flex flex-col gap-y-16px rounded-sm ${typeVisible ? 'visible opacity-100' : 'invisible opacity-0'} bg-surface-neutral-surface-lv2 py-16px text-base shadow-dropmenu transition-all duration-150 ease-in-out`}
    >
      {Object.values(FolderType).map((type) => {
        const clickHandler = () => {
          setSelectedType(type as FolderType);
          setTypeVisible(false);
        };
        return (
          <Button
            key={type}
            type="button"
            variant="tertiaryBorderless"
            className="w-full whitespace-nowrap py-8px"
            onClick={clickHandler}
          >
            {t(type)}
          </Button>
        );
      })}
    </div>
  );

  const displayedChatList =
    filteredChats.length > 0 ? (
      <ChatList chats={filteredChats} />
    ) : (
      <div className="py-30px text-center font-medium">
        <p>{t('FOLDER.NO_CHATS_FOUND')}</p>
      </div>
    );

  const displayTitle = isRenaming ? (
    <input
      id="folder-rename-input"
      ref={inputRef}
      type="text"
      value={newName}
      onChange={(e) => setNewName(e.target.value)}
      onBlur={handleRenameSubmit}
      onKeyDown={handleKeyDown}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
      className="w-150px rounded border bg-input-surface-input-background px-2 py-1 text-48px font-normal"
    />
  ) : (
    <h1 className="text-48px font-bold text-text-neutral-primary">{folderName}</h1>
  );

  const displayedPageBody = folderData ? (
    <div className="mx-80px my-140px flex w-screen flex-col items-center gap-y-40px">
      {/* Info: (20240709 - Julian) Title */}
      <div className="relative flex w-full flex-col items-center gap-y-20px">
        <div className="flex items-center gap-x-16px">
          {displayTitle}

          <Button
            type="button"
            variant={'secondaryBorderless'}
            className={cn('px-2 py-1')}
            onClick={renamingHandler}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="fill-current"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.8888 1.55433C15.872 0.571082 17.4662 0.571083 18.4494 1.55433C19.4327 2.53758 19.4327 4.13174 18.4494 5.11499L10.4805 13.0839C10.4647 13.0997 10.4491 13.1153 10.4337 13.1308C10.1916 13.3733 9.98728 13.5779 9.74146 13.7285C9.52524 13.861 9.28951 13.9587 9.04292 14.0179C8.76258 14.0852 8.4734 14.085 8.13073 14.0847C8.10889 14.0847 8.08683 14.0847 8.06454 14.0847H6.66909C6.25488 14.0847 5.91909 13.7489 5.91909 13.3347V11.9392C5.91909 11.9169 5.91907 11.8949 5.91906 11.873C5.91879 11.5304 5.91856 11.2412 5.98586 10.9609C6.04506 10.7143 6.14271 10.4785 6.27521 10.2623C6.42585 10.0165 6.63049 9.81217 6.87299 9.57006C6.88844 9.55463 6.90405 9.53904 6.91981 9.52328L14.8888 1.55433ZM17.3888 2.61499C16.9913 2.21753 16.3469 2.21753 15.9494 2.61499L7.98047 10.5839C7.66698 10.8974 7.60007 10.9712 7.55417 11.0461C7.50391 11.1281 7.46687 11.2175 7.44442 11.311C7.42391 11.3964 7.41909 11.4959 7.41909 11.9392V12.5847H8.06454C8.50789 12.5847 8.60733 12.5798 8.69275 12.5593C8.78628 12.5369 8.8757 12.4998 8.95772 12.4496C9.03262 12.4037 9.10633 12.3368 9.41983 12.0233L17.3888 4.05433C17.7862 3.65687 17.7862 3.01245 17.3888 2.61499ZM5.6377 2.58466L5.66911 2.58466H9.16911C9.58333 2.58466 9.91911 2.92045 9.91911 3.33466C9.91911 3.74888 9.58333 4.08466 9.16911 4.08466H5.66911C4.95667 4.08466 4.46745 4.08525 4.08819 4.11623C3.71769 4.1465 3.51867 4.20201 3.37463 4.2754C3.04535 4.44318 2.77763 4.7109 2.60985 5.04018C2.53646 5.18422 2.48095 5.38324 2.45068 5.75374C2.4197 6.133 2.41911 6.62222 2.41911 7.33466V14.3347C2.41911 15.0471 2.4197 15.5363 2.45068 15.9156C2.48095 16.2861 2.53646 16.4851 2.60985 16.6291C2.77763 16.9584 3.04535 17.2261 3.37463 17.3939C3.51867 17.4673 3.71769 17.5228 4.08819 17.5531C4.46745 17.5841 4.95667 17.5847 5.66911 17.5847H12.6691C13.3816 17.5847 13.8708 17.5841 14.25 17.5531C14.6205 17.5228 14.8196 17.4673 14.9636 17.3939C15.2929 17.2261 15.5606 16.9584 15.7284 16.6291C15.8018 16.4851 15.8573 16.2861 15.8875 15.9156C15.9185 15.5363 15.9191 15.0471 15.9191 14.3347V10.8347C15.9191 10.4204 16.2549 10.0847 16.6691 10.0847C17.0833 10.0847 17.4191 10.4204 17.4191 10.8347V14.3347V14.3661C17.4191 15.0394 17.4191 15.5902 17.3826 16.0377C17.3447 16.501 17.264 16.9194 17.0649 17.3101C16.7533 17.9217 16.2561 18.4188 15.6446 18.7304C15.2538 18.9295 14.8354 19.0103 14.3722 19.0481C13.9246 19.0847 13.3739 19.0847 12.7006 19.0847H12.6691H5.66911H5.63768C4.96431 19.0847 4.4136 19.0847 3.96604 19.0481C3.50278 19.0103 3.08438 18.9295 2.69364 18.7304C2.08212 18.4188 1.58493 17.9217 1.27334 17.3101C1.07425 16.9194 0.993515 16.501 0.955665 16.0377C0.919098 15.5902 0.919105 15.0395 0.919113 14.3661L0.919114 14.3347V7.33466L0.919113 7.30324C0.919105 6.62987 0.919098 6.07916 0.955665 5.63159C0.993515 5.16833 1.07425 4.74993 1.27334 4.35919C1.58493 3.74767 2.08212 3.25048 2.69364 2.93889C3.08439 2.7398 3.50278 2.65906 3.96604 2.62121C4.41361 2.58465 4.96432 2.58465 5.6377 2.58466Z"
              />
            </svg>
          </Button>
        </div>
        {/* ToDo: (20240709 - Julian) Description */}
        <p className="text-base font-semibold text-text-neutral-tertiary">{description}</p>
        {/* Info: (20240709 - Julian) Share button */}
        <Button
          type="button"
          variant="tertiary"
          className="absolute right-0 top-0 flex items-center gap-x-8px"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="fill-current"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.0024 2.41797C14.0359 2.41797 13.2524 3.20147 13.2524 4.16797C13.2524 4.47311 13.3305 4.76001 13.4678 5.00978C13.4762 5.02229 13.4842 5.03512 13.4919 5.04828C13.4995 5.06134 13.5067 5.07453 13.5134 5.08783C13.8219 5.58607 14.3734 5.91797 15.0024 5.91797C15.9689 5.91797 16.7524 5.13447 16.7524 4.16797C16.7524 3.20147 15.9689 2.41797 15.0024 2.41797ZM12.6485 6.40883C13.2405 7.03051 14.0762 7.41797 15.0024 7.41797C16.7974 7.41797 18.2524 5.96289 18.2524 4.16797C18.2524 2.37304 16.7974 0.917969 15.0024 0.917969C13.2075 0.917969 11.7524 2.37304 11.7524 4.16797C11.7524 4.49684 11.8013 4.8143 11.8921 5.11349L7.35639 7.76044C6.7644 7.13876 5.92867 6.7513 5.00244 6.7513C3.20752 6.7513 1.75244 8.20638 1.75244 10.0013C1.75244 11.7962 3.20752 13.2513 5.00244 13.2513C5.92882 13.2513 6.76468 12.8637 7.35669 12.2418L11.8933 14.8854C11.8017 15.1857 11.7524 15.5044 11.7524 15.8346C11.7524 17.6296 13.2075 19.0846 15.0024 19.0846C16.7974 19.0846 18.2524 17.6296 18.2524 15.8346C18.2524 14.0397 16.7974 12.5846 15.0024 12.5846C14.0776 12.5846 13.243 12.9709 12.6512 13.591L8.11289 10.9464C8.20364 10.6473 8.25244 10.33 8.25244 10.0013C8.25244 9.67243 8.20359 9.35497 8.11276 9.05578L12.6485 6.40883ZM6.49146 9.08143C6.49821 9.09474 6.50539 9.10793 6.51301 9.12099C6.52069 9.13415 6.52871 9.14699 6.53705 9.1595C6.67434 9.40926 6.75244 9.69616 6.75244 10.0013C6.75244 10.3064 6.67435 10.5933 6.53705 10.8431C6.52862 10.8557 6.52052 10.8687 6.51277 10.882C6.50524 10.8949 6.49814 10.908 6.49147 10.9212C6.18302 11.4194 5.63149 11.7513 5.00244 11.7513C4.03594 11.7513 3.25244 10.9678 3.25244 10.0013C3.25244 9.0348 4.03594 8.2513 5.00244 8.2513C5.63149 8.2513 6.18302 8.5832 6.49146 9.08143ZM13.4444 15.037C13.4646 15.0109 13.4834 14.9832 13.5004 14.9539C13.5169 14.9257 13.5312 14.897 13.5436 14.8677C13.8571 14.3957 14.3934 14.0846 15.0024 14.0846C15.9689 14.0846 16.7524 14.8681 16.7524 15.8346C16.7524 16.8011 15.9689 17.5846 15.0024 17.5846C14.0359 17.5846 13.2524 16.8011 13.2524 15.8346C13.2524 15.5473 13.3217 15.2762 13.4444 15.037Z"
            />
          </svg>

          <p>{t('FOLDER.SHARE')}</p>
        </Button>
      </div>
      {/* Info: (20240708 - Julian) Info blocks */}
      <div className="grid grid-cols-3 items-center gap-x-40px">
        {/* Info: (20240708 - Julian) Chat in the folder */}
        <div className="flex items-end justify-between rounded-sm border border-stroke-brand-secondary p-12px">
          <div className="flex flex-col gap-y-12px">
            <p className="text-lg font-semibold text-text-neutral-secondary">
              {t('FOLDER.CHAT_IN_FOLDER')}
            </p>
            <Image src="/icons/chat_box.svg" width={32} height={32} alt="chat_box_icon" />
          </div>
          <p className="text-4xl font-bold text-text-neutral-primary">{totalChatCount}</p>
        </div>
        {/* Info: (20240708 - Julian) Shared Chats */}
        <div className="flex items-end justify-between rounded-sm border border-stroke-brand-secondary p-12px">
          <div className="flex flex-col gap-y-12px">
            <p className="text-lg font-semibold text-text-neutral-secondary">
              {t('FOLDER.SHARED_CHATS')}
            </p>
            <Image src="/icons/share.svg" width={32} height={32} alt="share_icon" />
          </div>
          <p className="text-4xl font-bold text-text-neutral-primary">{sharedChatCount}</p>
        </div>
        {/* Info: (20240708 - Julian) Private Chats */}
        <div className="flex items-end justify-between rounded-sm border border-stroke-brand-secondary p-12px">
          <div className="flex flex-col gap-y-12px">
            <p className="text-lg font-semibold text-text-neutral-secondary">
              {t('FOLDER.PRIVATE_CHATS')}
            </p>
            <Image src="/icons/lock.svg" width={32} height={32} alt="lock_icon" />
          </div>
          <p className="text-4xl font-bold text-text-neutral-primary">{privateChatCount}</p>
        </div>
      </div>
      {/* Info: (20240708 - Julian) Filter */}
      <div className="flex w-full items-center gap-x-40px">
        {/* Info: (20240708 - Julian) Type */}
        <div
          onClick={typeToggleHandler}
          className={`relative flex w-200px items-center gap-x-12px rounded-sm border bg-input-surface-input-background ${typeVisible ? 'border-input-stroke-selected' : 'border-input-stroke-input'} px-12px py-10px font-medium text-input-text-input-placeholder hover:cursor-pointer`}
        >
          <Image src="/icons/funnel.svg" width={16} height={16} alt="funnel_icon" />

          <p className="flex-1 whitespace-nowrap">{t(selectedType)}</p>
          <Image src="/icons/chevron_down.svg" width={20} height={20} alt="chevron_down_icon" />
          {displayedTypeOptions}
        </div>
        {/* Info: (20240708 - Julian) Search */}
        <div className="flex flex-1 rounded-sm border border-input-stroke-input bg-input-surface-input-background px-12px py-10px">
          <input
            type="text"
            value={search}
            onChange={searchChangeHandler}
            placeholder={t('COMMON.SEARCH')}
            className="w-full bg-transparent outline-none placeholder:text-input-text-input-placeholder"
          />
          <Image src="/icons/search.svg" width={20} height={20} alt="search_icon" />
        </div>
        {/* Info: (20240708 - Julian) Sort */}
        <SortToggle currentSort={sort} clickHandler={sortClickHandler} />
      </div>
      {/* Info: (20240708 - Julian) Chat list */}
      <div className="min-h-200px w-full">{displayedChatList}</div>
      {/* Info: (20240708 - Julian) Pagination */}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  ) : (
    // ToDo: (20240708 - Julian) Not found page
    <div className="mx-100px my-140px flex w-screen flex-col items-center">
      <h1 className="text-48px font-bold text-text-neutral-primary">Folder not found</h1>
    </div>
  );

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon/favicon.ico" />
        {/* TODO: (2024606 - Julian) i18n */}
        <title>Discover - iSunFA</title>
      </Head>

      <div className="relative">
        <NavBar />

        <div className="flex min-h-screen justify-center bg-surface-neutral-main-background font-barlow">
          <ChatSidebar />
          {displayedPageBody}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale, params }) => {
  if (!params || !params.folderId || typeof params.folderId !== 'string') {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      folderId: params.folderId,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  };
};

export default FolderOverviewPage;
