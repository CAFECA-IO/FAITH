import { createInstance, i18n } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { i18nConfig } from '@/i18nConfig';

export default async function initTranslations(
  locale: string,
  namespaces : string[],
  i18nInstance?: i18n,
  // Info: (20240916 - Murky) it suppose to be any
  // Pleas check https://blog.stackademic.com/easy-way-to-add-translation-in-next-js-13-app-router-using-i18next-13b0663979c0
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resources?: any
) {
  // Info: (20240916 - Murky) it suppose to be no param
  // Please check https://i18nexus.com/tutorials/nextjs/react-i18next
  // eslint-disable-next-line no-param-reassign
  const i18nInstanceReal = i18nInstance || createInstance();

  await i18nInstanceReal.use(initReactI18next);

  if (!resources) {
    i18nInstanceReal.use(
      resourcesToBackend(
        (language: string, namespace:string) =>
          import(`@/locales/${language}/${namespace}.json`)
      )
    );
  }

  await i18nInstanceReal.init({
    lng: locale,
    resources,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: namespaces[0],
    fallbackNS: namespaces.slice(1, namespaces.length),
    ns: namespaces,
    preload: resources ? [] : i18nConfig.locales
  });

  return {
    i18n: i18nInstance,
    resources: i18nInstanceReal.services.resourceStore.data,
    t: i18nInstanceReal.t
  };
}
