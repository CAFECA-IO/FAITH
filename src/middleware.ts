// Info: (20240916 - Murky) Middleware for app router
// use "next-i18n-router" for i 18n routing
// App router need to use react-i18next
// please check https://i18nexus.com/tutorials/nextjs/react-i18next

import { i18nRouter } from 'next-i18n-router';
import { NextRequest } from 'next/server';
import { i18nConfig } from '@/i18nConfig';

export function middleware(request: NextRequest) {
  return i18nRouter(request, i18nConfig);
}

// only applies this middleware to files in the app directory
export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)'
};
