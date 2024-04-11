import { endpoints } from '../api'
import { setLoading, setToken } from '@/frontendservices/slices/authSlice'
import { apiConnector } from '../apiconnector'
import { useRouter } from 'next/navigation'

const {
  SENDOTP_API,
  SIGNUP_API,
  SIGNUP_APIi,
  LOGIN_API,
  LOGIN_APIi,
  CREATEQUESTION,
  GETSTUDENTDATA_API,
  USERTOEXPERTFEED_API,
  EXPERTTOUSERFEED_API,
  COUNTNUMBER_API
} = endpoints

export function submitRating(userId, expertEmail, feedback, rating) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))
      
      console.log("it is in the function ",userId, expertEmail, feedback, rating);
      const response = await apiConnector('POST', USERTOEXPERTFEED_API, {
        userId,
        expertEmail,
        feedback,
        rating,
      })
      console.log('SENDOTP API RESPONSE............', response)

      // if (!response.data.success) {
      //   throw new Error(response.data.message)
      // }
      // route.push("/");
      window.location.href = "https://doubt-buster.vercel.app/";
    } catch (err) {
      console.log(err)
    }
    dispatch(setLoading(false))
  }
}
export function submitRatingtoUser(userId, expertId, feedback, rating) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))

      const response = await apiConnector('POST', EXPERTTOUSERFEED_API, {
        userId,
        expertId,
        feedback,
        rating,
      })
      console.log('SENDOTP API RESPONSE............', response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
     
    } catch (err) {
      console.log(err)
    }
    dispatch(setLoading(false))
  }
}
export function incount(email) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))

      const response = await apiConnector('POST', COUNTNUMBER_API, {
        email,
      })
      console.log('SENDOTP API RESPONSE............', response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
    } catch (err) {
      console.log(err)
    }
    dispatch(setLoading(false))
  }
}
