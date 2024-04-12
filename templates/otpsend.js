const otpTemplate = (otp) => {
	return  `<!DOCTYPE html
	<html>
	
	<head>
		<meta charset="UTF-8">
		<title>OTP Verification Email</title>
		<style>
			body {
				background-color: #000000;
				font-family: Arial, sans-serif;
				font-size: 16px;
				line-height: 1.4;
				color: #ffffff;
				margin: 0;
				padding: 0;
			}
	
			.container {
				max-width: 600px;
				margin: 0 auto;
				padding: 20px;
				text-align: center;
			}
	
			.logo {
				max-width: 200px;
				margin-bottom: 20px;
			}
	
			.message {
				font-size: 18px;
				font-weight: bold;
				margin-bottom: 20px;
			}
	
			.body {
				font-size: 16px;
				margin-bottom: 20px;
			}
	
			.cta {
				display: inline-block;
				padding: 10px 20px;
				background-color: #FFD60A;
				color: #000000;
				text-decoration: none;
				border-radius: 5px;
				font-size: 16px;
				font-weight: bold;
				margin-top: 20px;
			}
	
			.support {
				font-size: 14px;
				color: #999999;
				margin-top: 20px;
			}
	
			.highlight {
				font-weight: bold;
			}
		</style>
	
	</head>
	
	<body>
	<div style="background: black; color: white;">
		<div class="container body" >
			<a href="https://doubt-buster.vercel.app"><img class="logo"
					src="https://imgtr.ee/images/2024/04/10/dd742a3be79d04a6a6276a88508b9a72.png" alt="DoubtBuster"></a>
			<div class="message">OTP Verification Email</div>
			<div class="body">
				<p>Dear User,</p>
				<p>Thank you for registering with DoubtBuster. To complete your registration, please use the following OTP
					(One-Time Password) to verify your account:</p>
				<h2 class="highlight">${otp}</h2>
				<p>This OTP is valid for 5 minutes. If you did not request this verification, please disregard this email.
				Once your account is verified, you will have access to our platform and its features.</p>
			</div>
			<div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
					href="mailto:adarsh220884@gmail.com">info@DoubtBuster.com</a>. We are here to help!</div>
		</div>
		</div>
	</body>
	
	</html>`
};
// module.exports = otpTemplate;
export default otpTemplate;