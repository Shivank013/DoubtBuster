import whitelogo from "@/public/images/whitelogo.png";
const questiontemp = (email,url) => {
  return `<!DOCTYPE html>
  <html>
  
  <head>
	  <meta charset="UTF-8">
	  <title>OTP Verification Email</title>
	  <style>
		  body {
			  background-color: #121111;
			  font-family: Arial, sans-serif;
			  font-size: 16px;
			  line-height: 1.4;
			  color: #f9f6f6;
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
		  .my-button{
			  background-color: #333;
		  color: #fff;
		  border: none;
		  padding: 10px 20px;
		  font-size: 16px;
		  cursor: pointer;
		  transition: background-color 0.3s ease;
		  }
		  .my-button:hover {
		  background-color: #555;
	  }
	  </style>
  
  </head>
  
  <body>
	  <div class="container">
		  <a href="https://doubt-buster.vercel.app"><img class="logo"
				  src=${whitelogo} alt="StudyNotion Logo"></a>
		  
		  <div class="body">
			  <p>Dear Expert,</p>
			  <p>${email}</p>
			  <p class="highlight">Plese connect with the user using the below url : </p>
			  <a href=${url}><button class="my-button">Click here</button></a>
			  <!-- <p>click on the link to connect with user</p> -->
		  </div>
		  <div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
				  href="mailto:adarsh220884@gmail.com">info@DoubtBuster.com</a>. We are here to help!</div>
	  </div>
  </body>
  
  </html>`
}
// module.exports = otpTemplate;
export default questiontemp