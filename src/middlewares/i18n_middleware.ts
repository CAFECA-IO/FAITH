/*
 * Info: (20240916 - Murky) Middleware for app router
 * use "next-i18n-router" for i 18n routing
 * App router need to use react-i18next
 * please check https://i18nexus.com/tutorials/nextjs/react-i18next
 */

import { CustomMiddleware } from "@/middlewares/chain";
import { i18nRouter } from 'next-i18n-router';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { i18nConfig } from '@/i18nConfig';

export function i18nMiddleware(middleware: CustomMiddleware): CustomMiddleware {
    return async (
        request: NextRequest,
        event: NextFetchEvent,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        response: NextResponse
    ) => {
        return middleware(request, event, i18nRouter(request, i18nConfig));
    };
}
