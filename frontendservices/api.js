 const BASE_URL = 'https://doubt-buster.vercel.app'

  // const BASE_URL = 'http://localhost:3000'

export const endpoints = {
  SENDOTP_API: BASE_URL + '/api/auth/user/otp',
  SIGNUP_API: BASE_URL + '/api/auth/user/register',
  SIGNUP_APIi: BASE_URL + '/api/auth/expert/register',
  LOGIN_API: BASE_URL + '/api/auth/user/login',
  LOGIN_APIi: BASE_URL + '/api/auth/expert/login',
  RESETPASSTOKEN_API: BASE_URL + '/auth/reset-password-token',
  RESETPASSWORD_API: BASE_URL + '/auth/reset-password',
  GETSTUDENTDATA_API: BASE_URL + '/api/studentdash/getdata',
  GETEXPERTDATA_API: BASE_URL + 'api/expertdash/getdata',
  GIVETEST_API: BASE_URL + '/api/tag/givetest',
  ADDSKILLS_API: BASE_URL + '/api/skill/addskill',
  USERTOEXPERTFEED_API: BASE_URL + '/api/feedback/usertoexpertrating',
  EXPERTTOUSERFEED_API: BASE_URL + '/api/feedback/experttouserrating',
  COUNTNUMBER_API: BASE_URL + '/api/questioncount',
  LOGOUTEXPERT_API:BASE_URL+'/api/auth/expert/logout',
  LOGOUTSTUDENT_API:BASE_URL+'/api/auth/user/logout'
}


export const tagsEndpoints = {
  GET_TAGS_API: BASE_URL + '/api/tag/alltags',
}

export const askQuestion = {
  ask: BASE_URL + '/api/sendroomid/email',
  fir: BASE_URL + '/api/sendroomid/fir',
}
