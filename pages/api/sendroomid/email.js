import connectDB from '@/utils/db'
import { Expert } from '@/model/expert'
import otpGenerator from 'otp-generator'

import mailSender from '@/utils/mailsender'
import emailTemplate from '@/templates/otpsend'

// ***********************for time calculation with respect to indian**************************************
function getCurrentTimeInIndia() {}

export default async function handler(req, res) {
  // console.log("error is coming ...");
  await connectDB()
  // hour: {
  //   type: Number,
  //   required: true,
  // },
  // minute: {
  //   type: Number,
  //   required: true,
  // },
  // second: {
  //   type: Number,
  //   required: true,
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

    const { skills } = req.body
    console.log(skills)
    // const currentTime = new Date()
    console.log(hour, minute, second)
    const experts = await Expert.find({
      skills: { $in: skills },

      'Time.start.hour': { $lte: hour },
      'Time.start.minute': { $lte: minute },
      'Time.end.hour': { $gte: hour },
      'Time.end.minute': { $gte: minute },
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
      const email = expert.email

      try {
        // Send the email
        const mailResponse = await mailSender(
          email,
          'Verification Email from DoubtSolver',
          emailTemplate(roomid)
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
      experts,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      err,
    })
  }
}
