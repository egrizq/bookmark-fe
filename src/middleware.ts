import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    let checkCookies = request.cookies.has('session')
    if (checkCookies) {
        return NextResponse.redirect(new URL("/", request.url))
    }
}

export const config = {
    matcher: ['/login', '/register']
}
