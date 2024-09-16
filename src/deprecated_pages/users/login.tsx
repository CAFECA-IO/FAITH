import Head from 'next/head';
import LoginPageBody from '@/components/login_page_body/login_page_body';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ILocale, ITranslateFunction } from '@/interfaces/locale';
import { useTranslation } from 'next-i18next';

export default function Login() {
  const { t }: { t: ITranslateFunction } = useTranslation('common');
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon/favicon.ico" />
        <title>{t('NAV_BAR.LOGIN')} - iSunFA</title>
      </Head>
      <LoginPageBody />
    </>
  );
}

const getStaticPropsFunction = async ({ locale }: ILocale) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['common'])),
  },
});

export const getStaticProps = getStaticPropsFunction;
