// pages/api/auth.js

import jwt from 'jsonwebtoken'
import { User } from '@/model/user'

export default async function handler(req, res) {
  try {
    // Extracting JWT from request cookies, body, or header
    const token =
      req.cookies.token ||
      req.body.token ||
      (req.headers.authorization &&
        req.headers.authorization.replace('Bearer ', ''))

    // If JWT is missing, return 401 Unauthorized response
    if (!token) {
      return res.status(401).json({ success: false, message: `Token Missing` })
    }

    try {
      // Verifying the JWT using the secret key stored in environment variables
      const decode = jwt.verify(token, process.env.JWT_SECRET)
      console.log('deep')
      console.log(decode)
      // Storing the decoded JWT payload in the request object for further use
      req.user = decode
      return res.status(400).json({
        success: false,
        message: `authetication complete`,
      })
    } catch (error) {
      // If JWT verification fails, return 401 Unauthorized response
      return res
        .status(401)
        .json({ success: false, message: 'Token is invalid' })
    }

    // If JWT is valid, move on to the next middleware or request handler
    // You don't need to call `next()` here since Next.js API routes don't use middleware
  } catch (error) {
    // If there is an error during the authentication process, return 401 Unauthorized response
    return res.status(401).json({
      success: false,
      message: `Something went wrong while validating the token`,
    })
  }
}
