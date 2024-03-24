import * as jose from "jose";
import { NextRequest, NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const bearerToken = request.headers.get("authorization") as string;
    const key = await process.env.JWT_SECRET
    const srcky = await new TextEncoder().encode(key)

    const pathName = request.nextUrl.pathname;
    const is_admin = pathName.substring(0, 7) === '/admin/';
    if (is_admin) {
        const key = await request.cookies.get('authToken');
        if (key == undefined) {
            return NextResponse.redirect(new URL('/login', request.nextUrl))
        } else {
            try {
                let info = await jose.jwtVerify(key.value, srcky);
                let userType = info ? info.payload.user_type : "";
                if (userType != 'admin') {
                    //return NextResponse.redirect(new URL('/login', request.nextUrl))
                }
            }catch (error){
                return NextResponse.redirect(new URL('/login', request.nextUrl)).clone
            }
        }
    } else {
        if (!bearerToken) {
            return new NextResponse(JSON.stringify({error: "Bearer Token Not Defined"}))
        }

        const token = bearerToken.split(' ')[1];
        try {
            await jose.jwtVerify(token, srcky)
        } catch (error) {
            return new NextResponse(JSON.stringify({error: "Bearer Token Not incorrect"}))
        }
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/about/:path*',
        '/api/loginuser',
        '/api/products/',
        '/api/chat',
        '/api/chatRoom',
        '/api/chatUnseenCount',
        '/api/notification',
        '/api/notification-clear',
        '/api/product-review',
        '/admin/:path*',
        // '/api/mission/:path*',
        '/api/staff/:path*',
        '/api/driver/:path*',
        '/api/vehicle/:path*',
        '/api/agency/:path*',
        '/api/mission-cluster/:path*',
    ]
}