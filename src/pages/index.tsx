import ChatSidebar from '@/components/chat_sidebar/chat_sidebar';
import NavBar from '@/components/nav_bar/nav_bar';
import VisitorChatPageBody from '@/components/visitor_chat_page_body/visitor_chat_page_body';
import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const toggleSidebar = () => setIsSidebarExpanded(!isSidebarExpanded);

  return (
    <>
      {/* TODO: 更改網站名稱跟 meta (20240625 - Shirley) */}
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon/favicon.ico" />
        <title>iSunFA</title>
        <meta
          name="description"
          content="iSunFA: BOLT AI Forensic Accounting and Auditing is where simplicity meets accuracy in the realm of financial investigations."
        />
        <meta name="author" content="CAFECA" />
        <meta name="keywords" content="區塊鏈,人工智慧,會計" />

        <meta property="og:title" content="iSunFA" />
        <meta
          property="og:description"
          content="iSunFA: BOLT AI Forensic Accounting and Auditing is where simplicity meets accuracy in the realm of financial investigations."
        />
      </Head>

      <div className="h-screen">
        <NavBar />

        <div className="bg-white">
          <ChatSidebar isExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} />

          <div
            className={`flex h-screen flex-col justify-end transition-all duration-300 ease-in-out ${isSidebarExpanded ? 'ml-240px' : ''}`}
          >
            {' '}
            <VisitorChatPageBody />
          </div>
        </div>
      </div>
    </>
  );
}
