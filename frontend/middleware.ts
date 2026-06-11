// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const hasRefreshToken = request.cookies.has("refreshToken"); 
    const { pathname } = request.nextUrl;

    const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register");
    const isPrivateRoute = pathname.startsWith("/my-posts") || pathname.startsWith("/dashboard");

    if (hasRefreshToken && isAuthPage) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (!hasRefreshToken && isPrivateRoute) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/login", "/register", "/my-posts/:path*"],
};