import Image from 'next/image';
import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { ITranslateFunction } from '@/interfaces/locale';
import Pagination from '@/components/pagination/pagination';
import SortToggle from '@/components/sort_toggle/sort_toggle';
import { SortOptions } from '@/constants/display';
import { IChat, IFolder, dummyChats, dummyFolders } from '@/interfaces/chat';
import ChatList from '@/components/chat_list/chat_list';
import FolderList from '@/components/folder_list/folder_list';

enum TabOptions {
  FOLDER = 'folder',
  UNCATEGORIZED = 'uncategorized',
}

const FolderOverviewPageBody = () => {
  const { t }: { t: ITranslateFunction } = useTranslation('common');

  const [search, setSearch] = useState('');
  const [sort, setSort] = useState(SortOptions.NEWEST);
  const [currentTab, setCurrentTab] = useState<TabOptions>(TabOptions.FOLDER);
  const [currentPage, setCurrentPage] = useState<number>(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filteredChats, setFilteredChats] = useState<IChat[]>(dummyChats);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filteredFolders, setFilteredFolders] = useState<IFolder[]>(dummyFolders);

  // ToDo: (20240912 - Julian) replace dummy data with real data
  const totalPages = 10;
  const totalNumberOfFolders = 78;
  const sharedFolders = 122;
  const uncatagorizedChats = 435;

  const overviewInfo = [
    {
      title: 'OVERVIEW.COUNT_OF_FOLDER',
      imgSrc: '/icons/folder.svg',
      count: totalNumberOfFolders,
    },
    {
      title: 'OVERVIEW.SHARED_FOLDER',
      imgSrc: '/icons/share.svg',
      count: sharedFolders,
    },
    {
      title: 'OVERVIEW.UNCATEGORIZED_CHATS',
      imgSrc: '/icons/unknown_chat.svg',
      count: uncatagorizedChats,
    },
  ];

  const searchChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const sortClickHandler = () => {
    setSort(sort === SortOptions.NEWEST ? SortOptions.OLDEST : SortOptions.NEWEST);
  };

  const folderTabClickHandler = () => {
    setCurrentTab(TabOptions.FOLDER);
  };

  const uncategorizedTabClickHandler = () => {
    setCurrentTab(TabOptions.UNCATEGORIZED);
  };

  const displayedInfoDesktop = (
    <div className="hidden w-full grid-cols-3 items-center gap-x-40px lg:grid">
      {overviewInfo.map((info) => (
        <div
          key={info.title}
          className="flex h-full w-full flex-col justify-between gap-y-12px rounded-sm border border-stroke-brand-secondary py-16px pl-12px pr-20px"
        >
          <p className="text-lg font-semibold text-text-neutral-secondary">{t(info.title)}</p>
          <div className="flex justify-between gap-y-12px">
            <Image src={info.imgSrc} width={32} height={32} alt={`${info.title}_icon`} />
            <p className="text-4xl font-bold text-text-neutral-primary">{info.count}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const displayedInfoMobile = (
    <div className="grid w-full grid-cols-1 items-center gap-y-10px lg:hidden">
      {overviewInfo.map((info) => (
        <div
          key={info.title}
          className="flex items-center justify-between rounded-xs border border-stroke-brand-secondary px-16px py-10px"
        >
          <Image src={info.imgSrc} width={20} height={20} alt={`${info.title}_icon`} />
          <p className="text-sm font-semibold text-text-neutral-secondary">{t(info.title)}</p>
          <p className="text-2xl font-bold text-text-neutral-primary">{info.count}</p>
        </div>
      ))}
    </div>
  );

  const displayedFolderList =
    filteredFolders.length > 0 ? (
      <FolderList folders={filteredFolders} />
    ) : (
      <div className="py-30px text-center font-medium">
        <p>{t('OVERVIEW.NO_FOLDER_FOUND')}</p>
      </div>
    );

  const displayedChatList =
    filteredChats.length > 0 ? (
      <ChatList chats={filteredChats} />
    ) : (
      <div className="py-30px text-center font-medium">
        <p>{t('OVERVIEW.NO_CHATS_FOUND')}</p>
      </div>
    );

  return (
    <div className="flex w-screen flex-col items-center gap-y-20px px-20px pb-60px pt-100px lg:gap-y-40px lg:px-80px lg:py-140px">
      {/* Info: (20240912 - Julian) Title */}
      <div className="relative flex w-full flex-col items-center gap-y-20px">
        <div className="text-2xl font-bold text-text-neutral-primary lg:text-48px">
          {t('OVERVIEW.PAGE_TITLE')}
        </div>
        {/* Info: (20240912 - Julian) Description */}
        <p className="text-xs font-semibold text-text-neutral-tertiary lg:text-base">
          {t('OVERVIEW.DESCRIPTION')}
        </p>
      </div>
      {/* Info: (20240912 - Julian) Info blocks */}
      {displayedInfoDesktop}
      {displayedInfoMobile}
      {/* Info: (20240913 - Julian) Tabs */}
      <div className="grid w-full grid-cols-2 gap-10px lg:gap-40px">
        <button
          id="folder-list-tab"
          type="button"
          onClick={folderTabClickHandler}
          className={`border-b-2 px-4px py-8px hover:border-tabs-stroke-hover hover:text-tabs-text-hover lg:px-12px ${currentTab === TabOptions.FOLDER ? 'border-tabs-stroke-active text-tabs-text-active' : 'border-tabs-stroke-default text-tabs-text-default'}`}
        >
          {t('OVERVIEW.FOLDER')}
        </button>
        <button
          id="uncategorized-chat-tab"
          type="button"
          onClick={uncategorizedTabClickHandler}
          className={`border-b-2 px-4px py-8px hover:border-tabs-stroke-hover hover:text-tabs-text-hover lg:px-12px ${currentTab === TabOptions.UNCATEGORIZED ? 'border-tabs-stroke-active text-tabs-text-active' : 'border-tabs-stroke-default text-tabs-text-default'}`}
        >
          {t('OVERVIEW.UNCATEGORIZED_CHATS')}
        </button>
      </div>
      {/* Info: (20240912 - Julian) Filter */}
      <div className="flex w-full items-center gap-x-16px lg:gap-x-40px">
        {/* Info: (20240912 - Julian) Search */}
        <div className="flex flex-1 rounded-sm border border-input-stroke-input bg-input-surface-input-background px-12px py-10px">
          <input
            id="chat-search-input"
            type="text"
            value={search}
            onChange={searchChangeHandler}
            placeholder={t('COMMON.SEARCH')}
            className="w-full bg-transparent outline-none placeholder:text-input-text-input-placeholder"
          />
          <Image src="/icons/search.svg" width={20} height={20} alt="search_icon" />
        </div>
        {/* Info: (20240912 - Julian) Sort */}
        <div className="hidden lg:block">
          <SortToggle currentSort={sort} clickHandler={sortClickHandler} />
        </div>
      </div>
      {/* ToDo: (20240912 - Julian) List */}
      <div className="min-h-200px w-full">
        {currentTab === TabOptions.FOLDER ? displayedFolderList : displayedChatList}
      </div>
      {/* Info: (20240912 - Julian) Pagination */}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default FolderOverviewPageBody;
