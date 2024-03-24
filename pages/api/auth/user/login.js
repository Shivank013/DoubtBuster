// pages/api/user/login.js

import { User } from '@/model/user' // Update the path to your user model
import { compare } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie' // Import the 'serialize' function from 'cookie' package
import { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '@/utils/db'
import dotenv from 'dotenv'
import { cookieSetter } from '@/utils/feature'

dotenv.config()

//! Login
export default async function handler(req, res) {
  await connectDB()
  try {
    if (req.method !== 'POST') {
      return res
        .status(405)
        .json({ success: false, message: 'Method Not Allowed' })
    }

    const { email, password } = req.body // Use req.body instead of req.json()

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not registered',
      })
    }

    if (await compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        role: user.accountType,
      }

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '20h',
      })
      req.headers.authorization = `Bearer ${token}`
      // console.log("set headr")
      // cookieSetter(res, token, true)
      // console.log(token)
      cookieSetter(res, token, true)
      user.token = token
      user.password = undefined
      // console.log(req.body)
      // console.log(user.token)

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      }
      // res.cookie('token', token, options).status(200).json({
      //   success: true,
      //   token,
      //   user,
      //   message: `User Login Success`,
      // })

      // Set the cookies

      // res.setHeader('Set-Cookie', serialize('token', token, options))

      return res.status(200).json({
        success: true,
        token,
        user,
        message: 'Logged in successfully',
      })
    } else {
      return res.status(401).json({
        success: false,
        message: 'Wrong password',
      })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please retry later!',
    })
  }
}
