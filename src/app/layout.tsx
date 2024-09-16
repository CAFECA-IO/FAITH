import { Metadata, Viewport } from "next";
import NavBar from '@/components/nav_bar/nav_bar';
import { Barlow, Inter } from 'next/font/google';

import { ChatProvider } from '@/contexts/chat_context';
import { UserProvider } from '@/contexts/user_context';
import { GlobalProvider } from '@/contexts/global_context';
import '@/app/[locale]/globals.css';
import { i18nConfig } from "@/i18nConfig";

// Info: (20240916 - Murky) Google Font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

// Info: (20240916 - Murky) Google Font
const barlow = Barlow({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export const viewport: Viewport = {
  // Info: (20240916 - Murky) Viewport is replaced <meta name="viewport" content="width=device-width, initial-scale=1" />
  // width, initialScale os default, so that can be omitted and viewport is not needed.
  // themeColor: 'black',
  // colorScheme: 'dark light',

  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  // Info: (20240916 - Murky) charSet is not required, it is default to UTF-8.
  // charSet: 'UTF-8',
  // Info: (20240916 - Murky) favicon is not required, it is default to /app/favicon.ico.
  title: 'iSunFA',
  description: 'iSunFA: BOLT AI Forensic Accounting and Auditing is where simplicity meets accuracy in the realm of financial investigations.',
  keywords: '區塊鏈,人工智慧,會計',
  authors: [{ name: 'CAFECA', url: 'https://cafeca.io/' }],
  openGraph: {
    title: 'iSunFA',
    description: 'iSunFA: BOLT AI Forensic Accounting and Auditing is where simplicity meets accuracy in the realm of financial investigations.',
  },

};

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  // Info: (20240916 - Murky)
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: {
    locale: string;
  }
}) {
  return (
    <html lang={locale} className={`${inter.className} ${barlow.className}`}>
      <body>
        <UserProvider>
          <ChatProvider>
            <GlobalProvider>
              {/*
                *Info: (20240916 - Murky)
                * Home page use "h-screen", but other page use relevant, I'm not sure which one is correct.
              */}
              <div className="h-screen">
                <NavBar />
                {children}
              </div>
            </GlobalProvider>
          </ChatProvider>
        </UserProvider>
      </body>
    </html>
  );
}
