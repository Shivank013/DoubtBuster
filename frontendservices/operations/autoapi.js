import { endpoints } from '../api'
import { setLoading, setToken } from '@/frontendservices/slices/authSlice'
import { apiConnector } from '../apiconnector'
import { useRouter } from 'next/navigation'
import { setUser } from '@/frontendservices/slices/profileSlice'

import { toast } from 'react-toastify'

const { SENDOTP_API, SIGNUP_API, SIGNUP_APIi, LOGIN_API, LOGIN_APIi,LOGOUTEXPERT_API,LOGOUTSTUDENT_API } =
  endpoints

export function sendotp(email, route) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))
      console.log(email)
      const response = await apiConnector('POST', SENDOTP_API, { email }) // Pass email as an object
      console.log('SENDOTP API RESPONSE ............ ',response)
      console.log(email);
      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success('OTP Sent Successfully');
      route.push('/verify');
    } catch (err) {
      console.log(err)
    }
    dispatch(setLoading(false))
  }
}

export function signup(
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  router,
  accountType
) {
  // console.log('ritika')
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))

      const response = await apiConnector('POST', SIGNUP_API, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        accountType,
      })
      console.log(response)
      console.log('after sign up')
      // if (!response.data.success) {
      //   throw new Error(response.data.message)
      // }

      toast.success('account create successfull')
      console.log('acocoutn create  ho gya to jaoo na login pe')
      router.push('/login/studentlogin')
    } catch (err) {
      toast.error('Signup Failed')
      console.log(err)
    }
    dispatch(setLoading(false))
  }
}
export function signupi(
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  router,
  accountType,
  startHour, // Change start to startHour
  endHour // Change end to endHour
) {
  
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))
      console.log(
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        accountType,
        startHour,
        endHour
      )
      const response = await apiConnector('POST', SIGNUP_APIi, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        accountType,
        Time: {
          start: { hour: startHour }, // Pass startHour as start
          end: { hour: endHour },
        },
        // Pass endHour as end
      })
      console.log(response)
      console.log('after sign up')
      // if (!response.data.success) {
      //   throw new Error(response.data.message)
      // }
      toast.success('account create successfull')

      console.log('acocoutn create  ho gya to jaoo na login pe')
      router.push('/login/expertlogin')
    } catch (err) {
      toast.error('Signup Failed')
      console.log(err)
    }
    dispatch(setLoading(false))
  }
}

export function login(email, password, router) {
  return async (dispatch) => {
    dispatch(setLoading(true))
    try {
      const response = await apiConnector('POST', LOGIN_API, {
        email,
        password,
      })
      console.log('LOGIN API RESPONSE............', response)
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      dispatch(setToken(response.data.token))

      // const userImage = response.data?.user?.image ? response.data.user.image : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
      // dispatch(setUser({ ...response.data.user }))
      // console.log(response.data + 'ddeep')
      localStorage.setItem('token', JSON.stringify(response.data.token))
      const userDetail = JSON.stringify(response.data.user)
      const detail = JSON.parse(userDetail)
      // console.log(detail);
      // console.log("sorry but response is "+ JSON.stringify(response.data.user));
      dispatch(setUser(detail))
      toast.success('login in succesfully')
      router.push(`/dashboard/studentdashboard/${response.data.user._id}`)
    } catch (error) {
      console.log('LOGIN API ERROR............', error)
      toast.error('Login Failed')
    }
    dispatch(setLoading(false))
  }
}
export function logini(email, password, router) {
  return async (dispatch) => {
    dispatch(setLoading(true))
    try {
      const response = await apiConnector('POST', LOGIN_APIi, {
        email,
        password,
      })
      console.log('LOGIN API RESPONSE............', response)

      toast.success('login successfully')
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      // toast.success("Login Successful")
      dispatch(setToken(response.data.token))
      localStorage.setItem('token', JSON.stringify(response.data.token));
     
      const userDetail=JSON.stringify(response.data.expert);
      console.log("user details : "+ userDetail);
      localStorage.setItem('user', JSON.stringify(userDetail));
      const detail= JSON.parse(userDetail);
      console.log(detail);
 
       dispatch(setUser(detail))    
    //  const detail= JSON.parse(userDetail);
    let ans=null;
    if(typeof window !== 'undefined'){
       ans=localStorage.getItem('redirectPath');
      }
   
      console.log(ans);
      if(ans){
        router.push(ans);
      }
      else {
        router.push('/dashboard/expertdashboard');
      }
      
    } catch (error) {
      console.log('LOGIN API ERROR............', error)
      toast.error('Login Failed')
    }
    dispatch(setLoading(false))
    //   toast.dismiss(toastId)
  }
}


export function logout(email) {
  return  async (dispatch) => {
    try {
      dispatch(setLoading(true))

      const response = await apiConnector('POST', LOGOUTEXPERT_API, {
        email
      })
      console.log('SENDOTP API RESPONSE............', response)

      localStorage.clear();
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success('logout successfully')
    } catch (err) {
      toast.error('logout Failed')
      console.log(err)
    }
    dispatch(setLoading(false))
  }
  //   dispatch(setToken(null))
  //   dispatch(setUser(null))
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user");
  //   localStorage.clear();
  //   toast.success("Logged Out")
   
  // }
}
export function logouts(email) {
  return  async (dispatch) => {
    try {
      dispatch(setLoading(true))

      const response = await apiConnector('POST', LOGOUTSTUDENT_API, {
        email
      })
      console.log('SENDOTP API RESPONSE............', response)
      localStorage.clear();

      toast.success('logout successfully')
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
    } catch (err) {
      toast.error('logout Failed')
      console.log(err)
    }
    dispatch(setLoading(false))
  }
  //   dispatch(setToken(null))
  //   dispatch(setUser(null))
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user");
   
  //   toast.success("Logged Out")
   
  // }
}
