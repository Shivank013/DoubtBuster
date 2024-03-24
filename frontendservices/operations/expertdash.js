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
} = endpoints

export function getstudentdata() {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))

      const response = await apiConnector('POST', GETSTUDENTDATA_API, {
        tagName,
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
