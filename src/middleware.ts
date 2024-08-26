import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    async function middleware(req) {
        const token = req.nextauth.token
        const pathName = req.nextUrl.pathname
        console.log('NextURL Pathname ', pathName)
        const isAuthenticated = !!token;
        console.log("isAuthenticated => ", isAuthenticated)
        if (isAuthenticated) {
            console.log("URL AUTH=> ", req.nextUrl.pathname)
            if (req.nextUrl.pathname.startsWith('/login')) {
                return NextResponse.redirect(new URL('/admin/dashboard', req.url))
            }
            if (req.nextUrl.pathname.startsWith('/register')) {
                return NextResponse.redirect(new URL('/admin/dashboard', req.url))
            }
            if (req.nextUrl.pathname.startsWith('/otp')) {
                return NextResponse.redirect(new URL('/admin/dashboard', req.url))
            }
            // return NextResponse.redirect(new URL('/admin/dashboard?callbackUrl=' + encodeURIComponent(req.url), req.url))
        } else {
            if (req.nextUrl.pathname.startsWith('/admin')) {
                return NextResponse.redirect(new URL('/login', req.url))
            }
            // return NextResponse.redirect(new URL('/login?callbackUrl=' + encodeURIComponent(req.url), req.url))
        }
    },
    {
        callbacks: {
            authorized: () => true,
        },
    }
)

// export const config = { matcher: ["/admin/:path*","/auth/:path*"], }