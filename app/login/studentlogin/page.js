'use client'
import { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useDispatch } from 'react-redux'

import { useRouter } from 'next/navigation'
import { login, sendotp } from '@/frontendservices/operations/autoapi'
// import { login } from '../../frontendservices/operations/autoapi'
import Link from 'next/link'
import Image from 'next/image'
import image1 from '../../../public/images/loginpageimage.svg'

function LoginForm() {
  const dispatch = useDispatch()
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [showPassword, setShowPassword] = useState(false)

  const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, router))
  }

  return (
    <div className='flex h-screen w-screen'>
      <div className='mt-[5rem] ml-[5rem]'>
        <Image src={image1} height={650} width={650}></Image>
      </div>

      <form
      onSubmit={handleOnSubmit}
      className="border p-[3rem] mt-[10rem] ml-[8rem] mb-[7rem] rounded-lg shadow-2xl flex flex-col gap-5 w-[35%]"
      >
      <label className="flex flex-col gap-3">
        <h1 className='text-[2rem]'>Welcome Back</h1>
        <p className="text-[0.875rem] leading-[1.375rem] text-richblack-5 mt-4">
          Email Address <sup className="text-red-500">*</sup>
        </p>
        <input
          required
          type="text"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          className="form-style rounded-[0.5rem] p-[4px] border"
        />
      </label>
      <label className="relative">
        <p className="text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Password <sup className="text-red-500">*</sup>
        </p>
        <input
          required
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder="Enter Password"
          className="form-style rounded-[0.5rem] p-[4px] mt-3 border w-full"
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[2.4rem] z-[10] cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          )}
        </span>
        <Link href="/forgot-password">
          <p className="mt-2 ml-auto max-w-max text-xs text-richblack-5">
            Forgot Password
          </p>
        </Link>
      </label>
      <button
        type="submit"
        className="border bg-purple-500 hover:bg-purple-900 transition text-white p-[8px] rounded-[0.5rem] mt-8"
      >
        Sign In
      </button>
      </form>
    </div>
    
  )
}

export default LoginForm
