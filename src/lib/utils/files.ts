import { STORAGE_FOLDER } from '@/constants/file';
import * as path from 'path';
import { promises as fs } from 'fs';

/**
 * Info: (20240919 - Murky)
 * This function is used to generate a folder path from default storage folder.
 * @param {string} folderName - {string} The name of the folder. It will be appended to the default storage folder.
 * @returns {string} The folder path.
 */
export function generateFolderPathFromStorageFolder(folderName: string): string {
  const filePath = path.join(STORAGE_FOLDER, folderName);
  return filePath;
}

/**
 * Info: (20240919 - Murky)
 * This function is used to generate folder by giving path or folder name(which will be appended to default storage folder).
 * @param {string} pathOrFolderName - {string} The path or folder name.
 * @returns {Promise<void>} No Return
 */
export async function createFolderIfNotExists(pathOrFolderName: string): Promise<void> {
    const folderPath = pathOrFolderName.split('/').length > 1 ? pathOrFolderName : generateFolderPathFromStorageFolder(pathOrFolderName);

    const isFolderPathExist = await fs.stat(folderPath).catch(() => false);
    if (!isFolderPathExist) {
        try {
            fs.mkdir(folderPath, { recursive: true });
        } catch (error) {
            /* eslint-disable no-console */
            console.error(`Error creating folder: ${folderPath}`);
            /* eslint-enable no-console */
        }
    }
}

/**
 * Info: (20240919 - Murky)
 * This function is used to generate folders by giving path or folder names(which will be appended to default storage folder).
 * @param {string[]} pathOrFolderNames - {string[]} The array of path or folder names.
 * @returns {Promise<void>} No Return
 */
export async function createFoldersIfNotExists(pathOrFolderNames: string[]): Promise<void> {
    await Promise.all(pathOrFolderNames.map((pathOrFolderName) => createFolderIfNotExists(pathOrFolderName)));
}
