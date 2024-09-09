import Head from 'next/head';
import NavBar from '@/components/nav_bar/nav_bar';
import SubscriptionPageBody from '@/components/subscription_page_body/subscription_page_body';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { ITranslateFunction } from '@/interfaces/locale';

const SubscriptionPage = () => {
  const { t }: { t: ITranslateFunction } = useTranslation('common');
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon/favicon.ico" />
        {/* TODO: (2024606 - Julian) i18n */}
        <title>{t('SUBSCRIPTION.HEADER_TITLE')} - iSunFA</title>
      </Head>

      <div className="relative">
        <NavBar />

        <div className="flex min-h-screen justify-center bg-surface-neutral-main-background font-barlow">
          <SubscriptionPageBody />
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale, params }) => {
  if (!params || !params.planId || typeof params.planId !== 'string') {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      folderId: params.planId,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  };
};

export default SubscriptionPage;
