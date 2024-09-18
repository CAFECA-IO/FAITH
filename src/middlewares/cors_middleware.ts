import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { CustomMiddleware } from "@/middlewares/chain";
import { AICH_URL } from "@/constants/url";

const allowedOrigins = [AICH_URL];

const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export function corsMiddleware(middleware: CustomMiddleware): CustomMiddleware {
    return async (
        request: NextRequest,
        event: NextFetchEvent,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        response: NextResponse
    ) => {
        // Info: (20240918 - Murky)  Check the origin from the request
        const origin = request.headers.get('origin') ?? '';
        const isAllowedOrigin = allowedOrigins.includes(origin);

        // Info: (20240918 - Murky) Handle preflighted requests
        const isPreflight = request.method === 'OPTIONS';

        if (isPreflight) {
            const preflightHeaders = {
            ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
            ...corsOptions,
            };
            return NextResponse.json({}, { headers: preflightHeaders });
        }
        // Info: (20240918 - Murky) Handle simple requests

        const responseNext = NextResponse.next();
        if (isAllowedOrigin) {
            responseNext.headers.set('Access-Control-Allow-Origin', origin);
        }

        Object.entries(corsOptions).forEach(([key, value]) => {
            responseNext.headers.set(key, value);
        });
        return middleware(request, event, responseNext);
    };
}
