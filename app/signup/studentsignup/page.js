'use client'
import React, { useState } from 'react'
import { login, sendotp } from '@/frontendservices/operations/autoapi'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { setSignupData } from '@/frontendservices/slices/authSlice'
import Image from 'next/image'
import image from '../../../public/images/signupformimage.svg' 


const Signup = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: 'Student',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const signupData = {
      ...formData,
    }
    console.log('signup page ')
    console.log(signupData)
    try {
      dispatch(setSignupData(signupData))
      dispatch(sendotp(formData.email, router))
      //   dispatch(login(formData.email,formData.password,router));yy
    } catch (error) {
      console.error('Error sending OTP:', error)
    }

    console.log('Form submitted:', formData)

    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      accountType: 'Student',
    })
  }

  return (
    <div className='flex h-screen w-screen'>
      <div className='mt-[8rem] ml-[6rem]'>
        <Image src={image} height={650} width={650}></Image>
      </div>
      <div className='border p-[2.5rem] mt-[4rem] ml-[9rem] mr-12 rounded-lg shadow-2xl h-[83%]'>
        <h2 className='text-[2rem]'>Signup</h2>
        <form onSubmit={handleSubmit} className='flex flex-col gap-3 mt-2'>
          <div className='flex gap-3'>
            <label>
              <p className="text-[0.875rem] leading-[1.375rem] text-richblack-5 mt-4">
              First Name <sup className="text-red-500">*</sup>
              </p>
              <input
                type="text"
                name="firstName"
                placeholder='Enter first name'
                value={formData.firstName}
                onChange={handleChange}
                className='w-[90%] rounded-[0.5rem] p-[5px] border mt-3'
              />
            </label>
            <label>
              <p className="text-[0.875rem] leading-[1.375rem] text-richblack-5 mt-4">
              Last Name <sup className="text-red-500">*</sup>
              </p>
              <input
                type="text"
                name="lastName"
                placeholder='Enter last name'
                value={formData.lastName}
                onChange={handleChange}
                className='w-[90%] rounded-[0.5rem] p-[5px] border mt-3'
              />
            </label>
          </div>
          <label>
            <p className="text-[0.875rem] leading-[1.375rem] text-richblack-5 mt-4">
            Email <sup className="text-red-500">*</sup>
            </p>
            <input
              type="email"
              name="email"
              placeholder='Enter email'
              value={formData.email}
              onChange={handleChange}
              className='rounded-[0.5rem] p-[5px] border mt-3 w-full'
            />
          </label>
          <label>
            <p className="text-[0.875rem] leading-[1.375rem] text-richblack-5 mt-4">
            Password <sup className="text-red-500">*</sup>
            </p>
            <input
              type="password"
              name="password"
              placeholder='Enter password'
              value={formData.password}
              onChange={handleChange}
              className='rounded-[0.5rem] p-[5px] border mt-3 w-full'
            />
          </label>
          <label>
            <p className="text-[0.875rem] leading-[1.375rem] text-richblack-5 mt-4">
            Confirm Password <sup className="text-red-500">*</sup>
            </p>
            <input
              type="password"
              name="confirmPassword"
              placeholder='Enter confirm password'
              value={formData.confirmPassword}
              onChange={handleChange}
              className='rounded-[0.5rem] p-[5px] border mt-3 w-full'
            />
          </label>
          <button type="submit" className='border bg-green-600 hover:bg-green-900 transition-all text-white p-[8px] rounded-[0.5rem] mt-8'>Sign Up</button>
        </form>
      </div>
    </div>

    
  )
}

export default Signup
