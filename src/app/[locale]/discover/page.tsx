import ChatSidebar from '@/components/chat_sidebar/chat_sidebar';
import TopicBrowsePageBody from '@/components/topic_browse_page_body/topic_browse_page_body';
import initTranslations from '@/i18n';
import { Metadata } from 'next';

type Props = {
    params: {
        locale: string;
    };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const { params } = props;
    const { locale } = params;

    // Info: (20240918 - Murky) Change "common" for different i18n namespaces
    const { t } = await initTranslations(locale, ['common']);
    return {
        title: t('DISCOVER.HEADER_TITLE') + ' - iSunFA',
    };
}

export default function discoverPage() {
    return (
        <div className="flex min-h-screen justify-center bg-surface-neutral-main-background font-barlow">
            <ChatSidebar />
            <TopicBrowsePageBody />
        </div>
    );
}
