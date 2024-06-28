import Head from 'next/head';
import NavBar from '@/components/nav_bar/nav_bar';
import SubscriptionPageBody from '@/components/subscription_page_body/subscription_page_body';

const SubscriptionPage = () => {
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
          <SubscriptionPageBody />
        </div>
      </div>
    </>
  );
};

export default SubscriptionPage;
