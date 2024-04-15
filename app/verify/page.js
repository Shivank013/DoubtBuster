'use client'
import { useEffect, useState } from 'react'
import OtpInput from 'react-otp-input'
import Link from 'next/link'
import { BiArrowBack } from 'react-icons/bi'
import { RxCountdownTimer } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import { sendotp, signup, signupi } from '@/frontendservices/operations/autoapi'
import logo from '../../public/images/LOGO.png'
import router from 'next/navigation'
import Image from 'next/image'
// import whitelogo from '@/public/images/whitelogo.png'

// import { useNavigate } from "react-router-dom";
// import { sendotp } from '@/frontendservices/operations/autoapi'
import { useRouter } from 'next/navigation'

function VerifyEmail() {
  const [otp, setOtp] = useState('')
  const { signupData, loading } = useSelector((state) => state.auth)
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(signupData + 'formdata')
    // Only allow access of this route when user has filled the signup form
    if (!signupData) {
      router.push('/signup')
    }
  }, [router,signupData])

  const handleVerifyAndSignup = (e) => {
    e.preventDefault()
    console.log(signupData)
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      Time, // Include Time object from formData
    } = signupData

    if (accountType === 'Instructor') {
      dispatch(
        signupi(
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          otp,
          router,
          accountType,
          Time.start.hour, // Access start hour from Time object
          Time.end.hour // Access end hour from Time object
        )
      )
    } else {
      dispatch(
        signup(
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          otp,
          router,
          accountType
        )
      )
    }
  }

  return (
    // <div className=' bg-gray-950 overflow-hidden'><img src="https://imgtr.ee/images/2024/04/10/dd742a3be79d04a6a6276a88508b9a72.png" alt='doubtbuster' className='w-[800px] p-4 mx-auto '></img>
    <div className="min-h-[calc(106vh-3.5rem)] grid place-items-center bg-gray-950 ">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div>
         <div className=' bg-gray-950 overflow-hidden flex justify-center  mb-24'>
        <Image src="https://imgtr.ee/images/2024/04/10/dd742a3be79d04a6a6276a88508b9a72.png" alt='doubtbuster' className='   w-80  h-30'></Image>
        </div>
          <div className="max-w-[500px] p-4 lg:p-8">
            <h1 className="   text-slate-200 font-semibold text-[1.875rem] leading-[2.375rem]">
              {' '}
              Verify Email{' '}
            </h1>
            <p className="text-[1.125rem] leading-[1.625rem] my-4 text-slate-200 ">
              {' '}
              A verification code has been sent to you. Enter the code below{' '}
            </p>

            <form onSubmit={handleVerifyAndSignup}>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6} // this otp box conatiner is copied from internet
                renderInput={(props) => (
                  <input
                    {...props}
                    placeholder="-"
                    style={{
                      boxShadow: 'inset 0px -1px 0px rgba(255, 255, 255, 0.18)',
                    }}
                    className="w-[48px] lg:w-[60px] border-0    bg-cyan-200 rounded-[0.5rem]     text-gray-900 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                  />
                )}
                containerStyle={{
                  justifyContent: 'space-between',
                  gap: '0 6px',
                }}
              />
              <button
                type="submit"
                className="w-full    bg-cyan-400 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium  text-slate-900"
              >
                {' '}
                Verify Email{' '}
              </button>
            </form>

            <div className="mt-6 flex items-center justify-between">
              <Link href="/signup">
                <p className="  text-slate-200 flex items-center gap-x-2">
                  {' '}
                  <BiArrowBack /> Back To Signup{' '}
                </p>
              </Link>
              <button
                className="flex items-center  text-blue-400 gap-x-2"
                onClick={() => dispatch(sendotp(signupData.email, router))}
              >
                {' '}
                <RxCountdownTimer /> Resend it{' '}
              </button>
            </div>
          </div>
        </div>
       )}
    </div>
    
  )
}

export default VerifyEmail