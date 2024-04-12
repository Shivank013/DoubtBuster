import { NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';

export function middleware(request) {
  console.log('middleware executed');

  const authToken = request.cookies.get('token')?.value;

  if (authToken) {
    const decoded = jwtDecode(authToken);
    console.log(decoded);

    if (decoded.role === 'Instructor') {
      return NextResponse.redirect(
        new URL('/dashboard/expertdashboard', request.url)
      );
    } else {
      return NextResponse.redirect(
        new URL(`/dashboard/studentdashboard/${decoded.id}`, request.url)
      );
    }
  } else {
    // If no token present, allow access to login and signup pages
    if (
      request.nextUrl.pathname !== '/login' &&
      request.nextUrl.pathname !== '/signup'
    ) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/expertdashboard/:path*',
    '/login',
    '/signup',
    '/dashboard/studentdashboard/:path*',
  ],
};
