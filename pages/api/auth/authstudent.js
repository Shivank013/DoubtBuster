import dotenv from 'dotenv'
import { User } from '@/model/user'
// pages/api/auth.js

import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
  try {
    const userDetails = await User.findOne({ email: req.user.email })

    if (userDetails.accountType !== 'Student') {
      return res.status(401).json({
        success: false,
        message: 'This is a Protected Route for Students',
      })
    }
    return res.status(400).json({
      success: true,
      message: `tu h bhai student`,
    })
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `User Role Can't be Verified` })
  }
}
