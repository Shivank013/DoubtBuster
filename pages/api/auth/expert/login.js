import { Expert } from '@/model/expert' // Update the path to your expert model
import { compare } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie' // Import the 'serialize' function from 'cookie' package
import { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '@/utils/db'
import dotenv from 'dotenv'
import { cookieSetter } from '@/utils/feature'
dotenv.config()

//! Login for Expert
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

    const expert = await Expert.findOne({ email })

    if (!expert) {
      return res.status(404).json({
        success: false,
        message: 'Expert not registered',
      })
    }
    // const ipAddress =
    //   req.headers['x-forwarded-for'] || req.connection.remoteAddress
    // expert.Ip = ipAddress
    // console.log(typeof expert.Ip)

    if (await compare(password, expert.password)) {
      const payload = {
        email: expert.email,
        id: expert._id,
        role: expert.accountType,
      }
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '20h',
      })
      req.headers.authorization = `Bearer ${token}`
      console.log(req.headers.authorization)

      cookieSetter(res, token, true)

      expert.token = token
      expert.password = undefined
      // console.log(expert)

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      }

      // Set the cookies
      // res.setHeader('Set-Cookie', serialize('token', token, options))

      return res.status(200).json({
        success: true,
        token,
        expert,
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

      message: error,
    })
  }
}
