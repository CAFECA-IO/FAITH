export type FileStatusUnion = 'uploading' | 'success' | 'error';

export const FileStatus: { [key in FileStatusUnion]: FileStatusUnion } = {
  uploading: 'uploading',
  success: 'success',
  error: 'error',
};

export const FileStatusIcons = {
  // uploading: '/icons/uploading.svg',
  retry: '/icons/retry.svg',
  success: '/icons/success_hollow.svg',
  error: '/icons/attention.svg',
};

// export const FileStatusInfo: {
//   [key in FileStatusUnion]: { status: FileStatusUnion; icon: string };
// } = {
//   uploading: {
//     status: 'uploading',
//     icon: FileStatusIcons.uploading,
//   },
//   success: {
//     status: FileStatus.success,
//     icon: FileStatusIcons.success,
//   },
//   error: {
//     status: FileStatus.error,
//     icon: FileStatusIcons.error,
//   },
// };

// type FileTypeUnionKey = 'pdf' | 'text' | 'png' | 'jpg' | 'svg' | 'json';

// type FileFormatUnion =
//   | 'application/pdf'
//   | 'text/plain'
//   | 'image/png'
//   | 'image/jpeg'
//   | 'image/svg+xml'
//   | 'application/json';

// const FileFormats: { [key in FileTypeUnionKey]: FileFormatUnion } = {
//   pdf: 'application/pdf',
//   text: 'text/plain',
//   png: 'image/png',
//   jpg: 'image/jpeg',
//   svg: 'image/svg+xml',
//   json: 'application/json',
// };

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

// export const FileTypeInfo: { [key in FileTypeUnionKey]: { icon: string; mimeType: string } } = {
//   pdf: {
//     icon: FileTypeIcons.pdf,
//     mimeType: FileFormats.pdf,
//   },
//   text: {
//     icon: FileTypeIcons.text,
//     mimeType: FileFormats.text,
//   },
//   png: {
//     icon: FileTypeIcons.png,
//     mimeType: FileFormats.png,
//   },
//   jpg: {
//     icon: FileTypeIcons.jpg,
//     mimeType: FileFormats.jpg,
//   },
//   svg: {
//     icon: FileTypeIcons.svg,
//     mimeType: FileFormats.svg,
//   },
//   json: {
//     icon: FileTypeIcons.json,
//     mimeType: FileFormats.json,
//   },
// };

export interface IFile {
  id: string;
  data: File;
  status: FileStatusUnion;
}
