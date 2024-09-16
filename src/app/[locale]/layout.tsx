import React from 'react';
import initTranslations from '@/i18n';
import TranslationProvider from '@/app/[locale]/TranslationProvider';

const i18nNamespaces = ['common'];

type Props = {
    children: React.ReactNode;
    params: {
        locale: string;
    };
};

export default async function Layout({ children, params: { locale } }: Props) {
    const { resources } = await initTranslations(locale, i18nNamespaces);
    /* eslint-disable no-console */
    console.log('Layout', { locale, i18nNamespaces, resources });
    /* eslint-enable no-console */

    return (
        <TranslationProvider locale={locale} namespaces={i18nNamespaces} resources={resources}>
            {children}
        </TranslationProvider>
    );
}
