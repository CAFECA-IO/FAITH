// Info: (20240916 - Murky) i18n please check
// 1. https://i18nexus.com/tutorials/nextjs/react-i18next
// 2. https://nextjs.org/docs/app/building-your-application/routing/internationalization#localization
import HomePage from '@/app/[locale]/home';

export default async function Page() {
    return <HomePage />;
}
