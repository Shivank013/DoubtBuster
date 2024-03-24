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

      const response = await apiConnector('GET', GETSTUDENTDATA_API, {})
      console.log('SENDOTP API RESPONSE............', response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      dispatch(setUser({ ...response.data.data }))
    } catch (err) {
      console.log(err)
    }
    dispatch(setLoading(false))
  }
}
