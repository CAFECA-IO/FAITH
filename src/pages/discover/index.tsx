import Head from 'next/head';
import ChatSidebar from '@/components/chat_sidebar/chat_sidebar';
import NavBar from '@/components/nav_bar/nav_bar';
import TopicBrowsePageBody from '@/components/topic_browse_page_body/topic_browse_page_body';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ITranslateFunction, ILocale } from '@/interfaces/locale';
import { useTranslation } from 'next-i18next';

const TopicBrowsePage = () => {
  const { t }: { t: ITranslateFunction } = useTranslation('common');
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon/favicon.ico" />
        {/* TODO: (2024606 - Julian) i18n */}
        <title>{t('DISCOVER.HEADER_TITLE')} - iSunFA</title>
      </Head>

      <div className="relative">
        <NavBar />

        <div className="flex min-h-screen justify-center bg-surface-neutral-main-background font-barlow">
          <ChatSidebar />
          <TopicBrowsePageBody />
        </div>
      </div>
    </>
  );
};

const getStaticPropsFunction = async ({ locale }: ILocale) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['common'])),
  },
});

export const getStaticProps = getStaticPropsFunction;

export default TopicBrowsePage;
