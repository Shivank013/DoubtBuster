import { NextResponse } from 'next/server'
import { jwtDecode } from 'jwt-decode'
// This function can be marked async if using await inside
export function middleware(request) {
  console.log('middleware executed')

  const authToken = request.cookies.get('token')?.value
  console.log(authToken, 'lsdkfm')

  const loggedinuserNotAccessPaths =
    request.nextUrl.pathname === '/login'

  if (loggedinuserNotAccessPaths) {
    if (authToken) {
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
      // Decode the JWT token
      // const decodedToken = jwtdecode(authToken)
      // Extract role from the decoded token
      // const userRole = decodedToken.rolec
      // console.log(decodedToken, 'whats your role')
      //   return NextResponse.redirect(
      //     new URL('/dashboard/expertdashboard', request.url)
      //   )
    }
    
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

    '/login',
    '/signup',
    '/dashboard/studentdashboard/:path*',
  ],
}