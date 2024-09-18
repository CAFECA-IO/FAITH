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
        // 使用 i18nRouter 處理翻譯邏輯，並生成一個新的 response
        const i18nResponse = i18nRouter(request, i18nConfig);
        const newResponse = NextResponse.next(
            {
                headers: i18nResponse.headers,
                // Info: (20240918 - Murky) Set status from i18nResponse, only pass if not 404
                status: i18nResponse.status,
            }
        );

        // Info: (20240918 - Murky) Copy headers from i18nResponse to newResponse
        if (response?.headers) {
            Object.entries(response.headers).forEach(([key, value]) => {
                newResponse.headers.set(key, value);
            });
        }

        return middleware(request, event, newResponse);
    };
}
