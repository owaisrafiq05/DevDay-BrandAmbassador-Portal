// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  if (pathname !== '/signup') {
    return NextResponse.redirect(new URL('/signup', request.url));
  }
}

export const config = {
  matcher: '/:path*'
};