import winston from 'winston';
import { LocalStorageFolder } from '@/constants/file';
import { generateFolderPathFromStorageFolder } from '@/lib/utils/files';
import { LOGGER_LEVEL } from '@/constants/logger';

export function generateLogger(
  loggerFileName?: string
) {
  const localStoragePath = generateFolderPathFromStorageFolder(LocalStorageFolder.LOGGER);

  const fileName = loggerFileName || 'logger.log';
  const filePath = `${localStoragePath}/${fileName}`;

  const newLogger = new winston.Logger({
    transports: [
    new winston.transports.Console({
      colorize: true,
      timestamp: true,
      level: LOGGER_LEVEL,
      prettyPrint: true,
    }),
      new winston.transports.File({
        filename: filePath,
        level: LOGGER_LEVEL,
        timestamp: true,
      })
  ]
});
  return newLogger;
}

export const backEndLogger = generateLogger();
