import FolderPageBody from '@/components/folder_page_body/folder_page_body';
import initTranslations from '@/i18n';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
    params: {
        locale: string;
        folderId: string;
    };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const { params } = props;
    const { locale } = params;

    // Info: (20240918 - Murky) Change "common" for different i18n namespaces
    const { t } = await initTranslations(locale, ['common']);
    return {
        title: t('OVERVIEW.PAGE_TITLE') + ' - iSunFA',
    };
}

export default async function FolderPage(props: Props) {
    const { params } = props;
    const { folderId } = params;

    if (!folderId) {
        notFound();
    }

    return (
        <FolderPageBody folderId={folderId} />
    );
}
