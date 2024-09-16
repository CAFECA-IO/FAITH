'use client';

// Info: (20240916 - Murky) Please check https://blog.stackademic.com/easy-way-to-add-translation-in-next-js-13-app-router-using-i18next-13b0663979c0
import React, { PropsWithChildren } from 'react';
import { I18nextProvider } from 'react-i18next';
import { createInstance } from 'i18next';
import initTranslations from '@/i18n';

interface TranslationProviderProps {
    locale: string;
    namespaces: string[];
    // Info: (20240916 - Murky) it suppose to be any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resources: any;
}

const TranslationProvider = React.memo<PropsWithChildren<TranslationProviderProps>>(
    // Info: (20240916 - Murky) it suppose to be any
    // eslint-disable-next-line react/prop-types
    ({ children, locale, namespaces, resources }) => {
        const i18n = createInstance();

        initTranslations(locale, namespaces, i18n, resources);

        return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
    },
);

export default TranslationProvider;
