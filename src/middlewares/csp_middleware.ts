/**
 * Info: (20240919 - Murky)
 * Ref https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy
 */
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { CustomMiddleware } from '@/middlewares/chain';

export function cspMiddleware(middleware: CustomMiddleware): CustomMiddleware {
  return async (request: NextRequest, event: NextFetchEvent, response: NextResponse) => {
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
    const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`;
    // Replace newline characters and spaces
    const contentSecurityPolicyHeaderValue = cspHeader.replace(/\s{2,}/g, ' ').trim();

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-nonce', nonce);

    requestHeaders.set('Content-Security-Policy', contentSecurityPolicyHeaderValue);

    const newResponse = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
    newResponse.headers.set('Content-Security-Policy', contentSecurityPolicyHeaderValue);
    // Info: (20240918 - Murky) Copy headers from i18nResponse to newResponse
    if (response?.headers) {
      Object.entries(response.headers).forEach(([key, value]) => {
        newResponse.headers.set(key, value);
      });
    }
    return middleware(request, event, newResponse);
  };
}
