// Info: (20240916 - Murky) i18n please check
// 1. https://i18nexus.com/tutorials/nextjs/react-i18next
// 2. https://nextjs.org/docs/app/building-your-application/routing/internationalization#localization
import LoginPageBody from '@/components/login_page_body/login_page_body';
import initTranslations from '@/i18n';
import { Metadata } from 'next';

type Props = {
    params: {
        locale: string;
    };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const { params } = props;
    const { locale } = params;
    const { t } = await initTranslations(locale, ['common']);
    return {
        title: t('NAV_BAR.LOGIN') + ' - iSunFA',
    };
}

export default async function Page() {
    /* eslint-disable no-console */
    console.log('I am app login Page');
    /* eslint-enable no-console */
    return <LoginPageBody />;
}
