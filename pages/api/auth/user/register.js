// pages/api/user/register.js

import { User } from '@/model/user'
import { NextResponse } from 'next/server'
import connectDB from '@/utils/db'
import { OTP } from '@/model/otp'
import { hash } from 'bcryptjs'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req, res) {
  console.log('error is coming ...')
  // console.log(req.body)
  await connectDB()
  try {
    if (req.method !== 'POST') {
      return res
        .status(405)
        .json({ success: false, message: 'Method Not Allowed' })
    }

    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      otp,
      accountType,
    } = req.body

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp ||
      !accountType
    ) {
      return res
        .status(400)
        .json({ success: false, message: 'All fields are required' })
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Password and ConfirmPassword values do not match',
      })
    }

    const ifExist = await User.findOne({ email })
    if (ifExist) {
      return res
        .status(400)
        .json({ success: false, message: 'User Already Exists' })
    }

    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1)
    if (response.length === 0) {
      return res.status(400).json({ success: false, message: 'OTP not found' })
    } else if (otp !== response[0].otp) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' })
    }

    const hashedPassword = await hash(password, 12)
    const createUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
      accountType,
    })

    console.log('account create succes')
    // console.log(createUser)

    if (createUser) {
      return res
        .status(200)
        .json({ success: true, message: 'Account created successfully' })
    }
  } catch (err) {
    console.log('Error in register (server) => ', err)
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please retry later!',
    })
  }
}
