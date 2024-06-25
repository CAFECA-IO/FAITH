import { ChatProvider } from '@/contexts/chat_context';
import { UserProvider } from '@/contexts/user_context';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ChatProvider>
        <Component {...pageProps} />
      </ChatProvider>
    </UserProvider>
  );
}
