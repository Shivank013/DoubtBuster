import { User } from '@/model/user'
import { NextResponse } from 'next/server'
import connectDB from '@/utils/db'
import { OTP } from '@/model/otp'
import { hash } from 'bcryptjs'
import { errorHandler } from '@/middlewares/error'
import { cookieSetter } from '@/utils/feature'
import { serialize } from 'cookie'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return errorHandler(res, null, false)
  }

  try {
   
        res.setHeader(
          'Set-Cookie',
          serialize('token', '', {
            path: '/',
            httpOnly: true,
            maxAge: 0,
          })
        )
      
    // cookieSetter(res, null, false)

    res.status(200).json({
      success: true,
      message: 'logout successfully',
    })
  } catch (error) {
    console.error('Error during logout:', error)
    return errorHandler(res, error, false)
  }
}