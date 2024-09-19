export const BASE_STORAGE_FOLDER = process.env.BASE_STORAGE_PATH || '.';

export const VERCEL_STORAGE_FOLDER = '/tmp';

export const STORAGE_FOLDER =
  process.env.VERCEL === '1' ? VERCEL_STORAGE_FOLDER : BASE_STORAGE_FOLDER;

export enum LocalStorageFolder {
    LOGGER = 'logger',
}
