// pages/api/user/sendOTP.js

import { User } from "@/model/user";
import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import otpGenerator from "otp-generator";
import { OTP } from "@/model/otp";
import mailSender from "@/utils/mailsender";
import emailTemplate from "@/templates/otpsend";
import { NextApiRequest, NextApiResponse } from "next";

//! Send OTP
export default async function handler(req, res) {

console.log("yes you are write");
  try {
    await connectDB();
    if (req.method !== "POST") {
      return res.status(405).json({ success: false, message: "Method Not Allowed" });
    }

    const { email } = req.body;
    console.log(email);

    const checkUserPresent = await User.findOne({ email });

    if (checkUserPresent) {
      return res.status(400).json({
        success: false,
        message: "User already registered",
      });
    }

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("OTP generated: ", otp);

    let result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
      result = await OTP.findOne({ otp: otp });
    }

    const otpPayload = { email, otp };

    try {
      const mailResponse = await mailSender(email, "Verification Email from DoubtSolver", emailTemplate(otp));
      console.log("Email sent Successfully: ", mailResponse);
    } catch (error) {
      console.log("Error occurred while sending mails: ", error);
      return res.status(500).json({
        success: false,
        message: "OTP Sent failed",
        otp,
      });
    }

    const otpBody = await OTP.create(otpPayload);
    console.log("OTP Body", otpBody);

    return res.status(200).json({
      success: true,
      message: "OTP Sent Successfully",
      otp,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please retry later!",
      error
    });
  }
}
