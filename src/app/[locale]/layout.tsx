/**
 * Info: (20240918 - Murky)
 * Context/Provider please add in this layout, not RootLayout.
 * New context need to  be inside TranslationProvider if i18n is used.
 */

import React from 'react';
import initTranslations from '@/i18n';

import NavBar from '@/components/nav_bar/nav_bar';
import { ChatProvider } from '@/contexts/chat_context';
import { UserProvider } from '@/contexts/user_context';
import { GlobalProvider } from '@/contexts/global_context';

import TranslationProvider from '@/contexts/TranslationProvider';

type Props = {
    children: React.ReactNode;
    // Info: (20240918 - Murky) Use params to access the locale
    params: {
        locale: string;
    };
};

/*
 * Info: (20240918 - Murky) Add more file to i18nNamespaces if file other than common is used
 * ex test is from src/locales/en/test.json
 * shape be like:
 * {
 *     "GREETING": {
 *         "HELLO": "Hello"
 *     }
 * }
 * <h1>{`${t('GREETING.HELLO', { ns: 'test' })}`}</h1>
 * then Add 'test' to i18nNamespaces
 * const i18nNamespaces = ['common', test];
 */
const i18nNamespaces = ['common'];

export default async function Layout({ children, params: { locale } }: Props) {
    const { resources } = await initTranslations(locale, i18nNamespaces);
    return (

        <TranslationProvider locale={locale} namespaces={i18nNamespaces} resources={resources}>
            <UserProvider>
                <ChatProvider>
                    <GlobalProvider>
                        {/*
                            *Info: (20240916 - Murky)
                            * Home page use "h-screen", but other page use relevant, I'm not sure which one is correct.
                        */}
                        <div className="relative">
                            <NavBar />
                            {children}
                        </div>
                    </GlobalProvider>
                </ChatProvider>
            </UserProvider>
        </TranslationProvider>
    );
}
