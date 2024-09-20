'use client';

/**
 * Info: (20240920 - Murky)
 * consoleLog to post logger to server
 * How to use:
 * import { useLogger } from '@/contexts/logger_context';
 * const { consoleLog } = useLogger();
 * useEffect(() => {
     consoleLog({ message: 'HomePage rendered', level: 'info' });
   }, [consoleLog]);
 */

import { createContext, useContext, useMemo } from 'react';
import { type CLILoggingLevel } from 'winston';

interface LoggerContextType {
  consoleLog: ({
    message,
    level,
    metadata,
  }: {
    message: string;
    level: CLILoggingLevel;
    metadata?: object;
  }) => Promise<void>;
}

const LoggerContext = createContext<LoggerContextType | undefined>(undefined);

export const LoggerProvider = ({ children }: { children: React.ReactNode }) => {
  // Info: (20240920 - Murky) 這裡的 consoleLog 是 server action
  const consoleLog = async ({
    message,
    level,
    metadata,
  }: {
    message: string;
    level: CLILoggingLevel;
    metadata?: object;
  }) => {
    const { consoleLogServerAction } = await import('@/lib/utils/logger/frontend_logger'); // 從獨立的 server action 文件中導入
    consoleLogServerAction({ message, level, metadata });
  };

  return (
    <LoggerContext.Provider value={useMemo(() => ({ consoleLog }), [])}>
      {children}
    </LoggerContext.Provider>
  );
};

export const useLogger = () => {
  const context = useContext(LoggerContext);
  if (!context) {
    throw new Error('useLogger must be used within a LoggerProvider');
  }
  return context;
};
