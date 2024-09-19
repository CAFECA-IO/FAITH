/**
 * Info: (20240919 - Murky)
 * This file will start before the app is loaded.
 */

import { LocalStorageFolder } from '@/constants/file';

export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        const { createFoldersIfNotExists } = await import('@/lib/utils/files');

        const pathOrFolderNames = [...Object.values(LocalStorageFolder)];
        await createFoldersIfNotExists(pathOrFolderNames);
        /* eslint-disable no-console */
        Object.values(LocalStorageFolder).forEach((folderName) => {
            console.log(`Folder ${folderName} created.`);
        });
        /* eslint-enable no-console */
    }
}
