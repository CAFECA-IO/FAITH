import { COOKIE_NAME } from "@/constants/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const cookieName = COOKIE_NAME.FIDO2;
    const target = `${cookieName}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;

    request.cookies.set(COOKIE_NAME.FIDO2, target);
    return NextResponse.json(
        { message: 'Successfully signed out' },
        { status: 200 }
    );
}
