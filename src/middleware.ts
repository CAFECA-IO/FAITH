/**
 * Info: (20240918 - Murky)
 * Chain Middleware please check:
 * https://medium.com/@tanzimhossain2/implementing-multiple-middleware-in-next-js-combining-nextauth-and-internationalization-28d5435d3187
 */

import { chain } from "@/middlewares/chain";
import { i18nMiddleware } from "@/middlewares/i18n_middleware";
import { corsMiddleware } from "@/middlewares/cors_middleware";
import { cspMiddleware } from "./middlewares/csp_middleware";

/**
 * Info: (20240918 - Murky)
 * corsMiddleware must be first one
 * i18nMiddleware must be last one
 */

export default chain([corsMiddleware, cspMiddleware, i18nMiddleware]);
// only applies this middleware to files in the app directory
export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)'
};
