import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import { ChatProvider } from '@/contexts/chat_context';
import { UserProvider } from '@/contexts/user_context';
import { GlobalProvider } from '@/contexts/global_context';
import { appWithTranslation } from 'next-i18next';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <UserProvider>
      <ChatProvider>
        <GlobalProvider>
          <Component {...pageProps} />
        </GlobalProvider>
      </ChatProvider>
    </UserProvider>
  );
};

export default appWithTranslation(App);
