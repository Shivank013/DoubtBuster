import connectDB from '@/utils/db'
import { Expert } from '@/model/expert'
import otpGenerator from 'otp-generator'
// import crypto from "crypto";  // it is used to generate crypto
import mailSender from '@/utils/mailsender'
import emailTemplate from '@/templates/questiontemp'
import { compare } from 'bcryptjs'
import jwt from 'jsonwebtoken'

// ***********************for time calculation with respect to indian**************************************
function getCurrentTimeInIndia() {}

export default async function handler(req, res) {
  // console.log("error is coming ...");
  await connectDB()
  let ans;

  try {
    if (req.method !== 'POST') {
      return res
        .status(405)
        .json({ success: false, message: 'Method Not Allowed' })
    }
    // ***********************for time calculation with respect to indian**************************************
    const currentDate = new Date()
    currentDate.setUTCHours(currentDate.getUTCHours() + 5)
    currentDate.setUTCMinutes(currentDate.getUTCMinutes() + 30)

    const hour = currentDate.getUTCHours()
    const minute = currentDate.getUTCMinutes()
    const second = currentDate.getUTCSeconds()

    console.log(hour, minute, second)

    const { email,skill,doubt} = req.body
    console.log(email,skill,doubt);
    // const currentTime = new Date()
    console.log(hour, minute, second)
    const experts = await Expert.find({
      skills: { $in: skill },

      'Time.start.hour': { $lte: hour },

      'Time.end.hour': { $gte: hour },
    })
    var roomid = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    })
    console.log('OTP generated: ', roomid)

    //   let result = await OTP.findOne({ otp: otp });

    //   const otpPayload = { email, roomid};
    for (let expert of experts) {
      // Extract the expert's email
      console.log(expert.email)
      const emails = expert.email
      // tokken generator 

      const payload = {
        email: emails,
        skill: skill,
        doubt: doubt,
        roomid: roomid,
      }
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h',
      })
      const url = `https://doubt-buster.vercel.app/call/${token}`;

      // const url = `http://localhost:3000/call/${token}`;
      ans=url;
      try {
        // Send the email
          // create url
        const mailResponse = await mailSender(
          emails,
          'Verification Email from DoubtSolver',
          emailTemplate(emails,url,doubt)
        )
        console.log('Email sent Successfully: ', mailResponse)
      } catch (error) {
        console.log('Error occurred while sending mails: ', error)
        return res.status(500).json({
          success: false,
          message: 'Email send failed',
          email,
        })
      }
    }

    res.send({
      success: true,
      roomid,
      ans,
      message: 'result sucessfull'
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      err,
    })
  }
}
