import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ChatProvider } from '@/contexts/chat_context';
import { UserProvider } from '@/contexts/user_context';
import { GlobalProvider } from '@/contexts/global_context';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ChatProvider>
        <GlobalProvider>
          <Component {...pageProps} />
        </GlobalProvider>
      </ChatProvider>
    </UserProvider>
  );
}
