import { NextResponse } from 'next/server'
import { jwtDecode } from 'jwt-decode'
// This function can be marked async if using await inside
export function middleware(request) {
  console.log('middleware executed')

  const authToken = request.cookies.get('token')?.value
  console.log(authToken, 'lsdkfm')

  const loggedinuserNotAccessPaths =
    request.nextUrl.pathname === '/login'||
    request.nextUrl.pathname === '/signup'

  if (loggedinuserNotAccessPaths && authToken) {
   
      const decoded = jwtDecode(authToken)
      console.log(decoded)
      if (decoded.role === 'Instructor') {
        return NextResponse.redirect(
          new URL('/dashboard/expertdashboard', request.url)
        )
      } else {
        return NextResponse.redirect(
          new URL(`/dashboard/studentdashboard/${decoded.id}`, request.url)
        )
      }
      // }
      // else{
        
      //   if (!authToken && request.nextUrl.pathname === '/login'){
      //     return NextResponse.redirect(
      //       new URL('/login', request.url)
      //     )
      //   } else {
      //     return NextResponse.redirect(
      //       new URL('/signup', request.url)
      //     )
      //   }
      // }
    
  } else {
    if (!authToken) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
  return NextResponse.next()
  //   return NextResponse.redirect(new URL('/home', request.url))
}

export const config = {
  matcher: [
    '/dashboard/expertdashboard/:path*',
    // '/',
    '/login',
    '/signup',
    '/dashboard/studentdashboard/:path*',
  ],
}