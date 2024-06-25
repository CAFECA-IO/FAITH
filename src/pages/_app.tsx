import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { GlobalProvider } from '@/contexts/global_context';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
  );
}
