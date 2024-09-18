import { cookies } from 'next/headers';
import { ICredential } from '@/interfaces/webauthn';
import { getDomains } from '@/lib/utils/common';
import { NextResponse, type NextRequest } from 'next/server';

import { server } from '@passwordless-id/webauthn';
import { COOKIE_NAME } from '@/constants/config';

const CREDENTIALS_ARRAY: ICredential[] = [];

/**
 * Info: (20240918 - Murky)
 * NextRequest can set cookie directly
 * If cookie related function not needed, we can use Request instead
 */
export async function POST(request: NextRequest) {
    try {
    // Info: (20240918 - Murky) req.body now is request.body
    const body = await request.json();
    const { authentication, registeredCredential, challenge } = body;

    const origins = getDomains();

    const expected = {
      challenge,
      origin: (target: string) => origins.includes(target),
      userVerified: true,
    };

    const authenticationParsed = await server.verifyAuthentication(
      authentication,
      registeredCredential,
      expected
    );

    // eslint-disable-next-line no-console
    console.log('authenticationParsed in SignIn API', authenticationParsed);

    CREDENTIALS_ARRAY.push(registeredCredential);

    const expiration = new Date();

    expiration.setMonth(expiration.getMonth() + 1);

    const cookieValue = JSON.stringify(CREDENTIALS_ARRAY);

    // Info: (20240918 - Murky) NextRequest can set cookie directly
    // But it can't set option, ex:
    // request.cookies.set(COOKIE_NAME.FIDO2, cookieValue);

    // Info: (20240918 - Murky) Use cookies() from next/header to set cookie with options
    cookies().set(COOKIE_NAME.FIDO2, cookieValue, {
        expires: expiration,
        path: '/',
    });

    /**
     * Info: (20240918 - Murky)
     * How to use Response, please check:
     * https://nextjs.org/docs/app/api-reference/functions/next-response
     */
    return NextResponse.json(
        { payload: 'Success!' },
        {
           status: 200,
        }
    );
    } catch (_error) {
        const error = _error as Error;
        // Info: (20240918 - Murky) Don't use NextResponse.error()
        // it is for stopping middleware chain and return 500
        // return NextResponse.error();

        // Info: (20240918 - Murky) use json instead
        return NextResponse.json(
            { payload: error.message },
            {
                status: 400,
            }
        );
    }
}
