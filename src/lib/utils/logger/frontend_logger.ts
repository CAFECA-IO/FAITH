'use server';

import { generateLogger } from '@/lib/utils/logger/backend_logger';
import { type CLILoggingLevel } from 'winston';

const frontEndLogger = generateLogger('frontend_logger.log');

export async function consoleLogServerAction({
  message,
  level,
  metadata,
}: {
  message: string;
  level: CLILoggingLevel;
  metadata?: object;
}) {
  frontEndLogger.log(level, message, metadata);
}
