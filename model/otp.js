import mongoose from "mongoose";
import emailTemplate from "../templates/otpsend"
 import mailSender from "../utils/mailsender"
const OTPSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	otp: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 60 * 5,    // The document will be automatically deleted after 5 minutes of its creation time
	},
});






export const OTP = mongoose.models.OTP  || mongoose.model("OTP",OTPSchema );

// OTPSchema.pre('save', async function (next) {
// 	try {
// 	  if (this.isNew) {
// 		await sendVerificationEmail(this.email, this.otp);
// 	  }
// 	  next();
// 	} catch (error) {
// 	  console.error('Error sending verification email:', error);
// 	  next(error); // Pass the error to the next middleware
// 	}
//   });



