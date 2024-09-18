/**
 * Info: (20240918 - Murky)
 * This Factory is used to chain multiple middlewares together.
 * Chain Middleware Reference please check:
 * https://medium.com/@tanzimhossain2/implementing-multiple-middleware-in-next-js-combining-nextauth-and-internationalization-28d5435d3187
 */

import { NextMiddlewareResult } from 'next/dist/server/web/types';
import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';

export type CustomMiddleware = (
  request: NextRequest,
  event: NextFetchEvent,
  response: NextResponse
) => NextMiddlewareResult | Promise<NextMiddlewareResult>;

export type MiddlewareFactory = (middleware: CustomMiddleware) => CustomMiddleware;

export function chain(functions: MiddlewareFactory[], index = 0): CustomMiddleware {
  const current = functions[index];

  if (current) {
    const next = chain(functions, index + 1);
    return current(next);
  }

  return (request: NextRequest, event: NextFetchEvent, response: NextResponse) => {
    return response;
  };
}
