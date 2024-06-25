import ChatSidebar from '@/components/chat_sidebar/chat_sidebar';
import NavBar from '@/components/nav_bar/nav_bar';
import VisitorChatPageBody from '@/components/visitor_chat_page_body/visitor_chat_page_body';
import Head from 'next/head';

export default function Home() {
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

      <div className="">
        <NavBar />

        <div className="bg-white">
          <ChatSidebar />
          <VisitorChatPageBody />
        </div>
      </div>
    </>
  );
}
