import { NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';

export function middleware(request) {
  console.log('middleware executed');

  const authToken = request.cookies.get('token')?.value;
  console.log(authToken);

  const { pathname } = request.nextUrl;

  // Check if the user is trying to access login or signup pages
  const isLoginOrSignup = pathname === '/login'||pathname === '/signup'  ;

  if (!authToken) {
    // if (isLoginOrSignup==='/signup') {
    //   return NextResponse.redirect(new URL('/signup', request.url));
    // }
    // If there's no authToken and user is not trying to access login/signup, redirect to login
    if (!isLoginOrSignup) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    
  } else {
    // If authToken is present
    const decoded = jwtDecode(authToken);
    console.log(decoded);

    // Redirect to respective dashboards based on role
    if (pathname === '/login' || pathname === '/signup') {
      if (decoded.role === 'Instructor') {
        return NextResponse.redirect(new URL('/dashboard/expertdashboard', request.url));
      } else {
        return NextResponse.redirect(new URL(`/dashboard/studentdashboard/${decoded.id}`, request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  // Define the paths to be matched by the middleware
  matcher: [
    '/dashboard/expertdashboard/:path*',
     
    '/login',
    '/signup',
    '/dashboard/studentdashboard/:path*',
  ],
};
