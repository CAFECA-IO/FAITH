export type FileStatusUnion = 'uploading' | 'success' | 'error';

export const FileStatus: { [key in FileStatusUnion]: FileStatusUnion } = {
  uploading: 'uploading',
  success: 'success',
  error: 'error',
};

export const FileStatusIcons = {
  retry: '/icons/retry.svg',
  success: '/icons/success_hollow.svg',
  error: '/icons/attention.svg',
};

export const FileTypeIcons = {
  pdf: '/icons/pdf.svg',
  text: '/icons/txt.svg',
  png: '/icons/jpg.svg',
  jpg: '/icons/jpg.svg',
  svg: '/icons/jpg.svg',
  json: '/icons/txt.svg',
};

export const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'text/plain',
  'image/png',
  'image/jpeg',
  'image/svg+xml',
  'application/json',
];

export interface IFile {
  id: string;
  data: File;
  status: FileStatusUnion;
}
