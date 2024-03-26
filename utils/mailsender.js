// otp send with email address
import dotenv from 'dotenv'
dotenv.config()
import nodemailer from 'nodemailer'

const mailSender = async (email, title, body) => {
  // with the help of this function we send mail of otp;
  try {
    let transporter = nodemailer.createTransport({
      // we send mail with the help of transporter and here MAIL_USER , MAIL_PASS contain app password of that email which send email
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        //    jiski email id se send karna chahte hai
        pass: process.env.MAIL_PASS,
      },
    })

    let info = await transporter.sendMail({
      from: 'StudyNotion - by Abhikant Singh',
      // email came from above
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    })
    console.log(info)
    return info
  } catch (error) {
    console.log(error.message)
  }
}

export default mailSender

// import nodemailer from "nodemailer";

// const email = process.env.EMAIL;
// const pass = process.env.EMAIL_PASS;

// export const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: email,
//     pass,
//   },
// });

// export const mailOptions = {
//   from: email,
//   to: email,
// };
