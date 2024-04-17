'use client'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { sendotp } from '@/frontendservices/operations/autoapi'
import { setSignupData } from '@/frontendservices/slices/authSlice'
import Image from 'next/image'
import image from '../../../public/images/signupformimage.svg'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { ColorRing } from 'react-loader-spinner'
import Link from 'next/link'

const Signup = () => {
  
  const dispatch = useDispatch()
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: 'Instructor',
    Time: {
      start: { hour: '' },
      end: { hour: '' },
    },
  })
  const { firstName, lastName, email, password, confirmPassword } = formData

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.startsWith('Time.')) {
      const [parent, child] = name.split('.')
      setFormData((prevState) => ({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: { hour: value },
        },
      }))
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Passwords Do Not Match')
      return
    }

    const signupData = {
      ...formData,
    }

    try {
      dispatch(setSignupData(signupData))
      dispatch(sendotp(formData.email, router))
    } catch (error) {
      console.error('Error sending OTP:', error)
    }

    // Reset form fields
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      accountType: 'Instructor',
      Time: {
        start: { hour: '' },
        end: { hour: '' },
      },
    })
  }

  return (
    <div>
      {/* {loading ? (
        <div className=" flex justify-center  items-center h-[100vh]">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        </div>
      ) : ( */}
        <div className="flex h-screen w-screen">
          <div className="mt-[8rem] ml-[6rem]">
            <Image alt='' src={image} height={650} width={650}></Image>
          </div>
          <div className="border p-[2.5rem] mt-[1rem] ml-[9rem] mr-12 rounded-lg shadow-2xl h-[95%]">
            <h2 className="text-[2rem]">Signup</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-2">
              <div className="flex gap-3">
                <label>
                  <p className="text-[0.875rem] leading-[1.375rem] text-richblack-5 mt-4">
                    First Name <sup className="text-red-500">*</sup>
                  </p>
                  <input
                    required
                    type="text"
                    name="firstName"
                    placeholder="Enter first name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-[90%] rounded-[0.5rem] p-[5px] border mt-3"
                  />
                </label>
                <label>
                  <p className="text-[0.875rem] leading-[1.375rem] text-richblack-5 mt-4">
                    Last Name <sup className="text-red-500">*</sup>
                  </p>
                  <input
                    required
                    type="text"
                    name="lastName"
                    placeholder="Enter last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-[90%] rounded-[0.5rem] p-[5px] border mt-3"
                  />
                </label>
              </div>
              <label>
                <p className="text-[0.875rem] leading-[1.375rem] text-richblack-5 mt-4">
                  Email <sup className="text-red-500">*</sup>
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  className="rounded-[0.5rem] p-[5px] border mt-3 w-full"
                />
              </label>
              <label>
                <p className="text-[0.875rem] leading-[1.375rem] text-richblack-5 mt-4">
                  Password <sup className="text-red-500">*</sup>
                </p>
                <input
                  required
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  className="rounded-[0.5rem] p-[5px] border mt-3 w-full"
                />
              </label>
              <label>
                <p className="text-[0.875rem] leading-[1.375rem] text-richblack-5 mt-4">
                  Confirm Password <sup className="text-red-500">*</sup>
                </p>
                <input
                  required
                  type="password"
                  name="confirmPassword"
                  placeholder="Enter confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="rounded-[0.5rem] p-[5px] border mt-3 w-full"
                />
              </label>
              <div className="flex gap-3">
                <label>
                  <p className="text-[0.875rem] leading-[1.375rem] text-richblack-5 mt-4">
                    24-Hour Format (Start Hour) <sup className="text-red-500">*</sup>
                  </p>
                  <input
                    required
                    type="number"
                    name="Time.start.hour"
                    placeholder="Enter start hour"
                    value={formData.Time.start.hour}
                    onChange={handleChange}
                    className="w-[90%] rounded-[0.5rem] p-[5px] border mt-3"
                  />
                </label>
                <label>
                  <p className="text-[0.875rem] leading-[1.375rem] text-richblack-5 mt-4">
                    (End Hour) <sup className="text-red-500">*</sup>
                  </p>
                  <input
                    required
                    type="number"
                    name="Time.end.hour"
                    placeholder="Enter end hour"
                    value={formData.Time.end.hour}
                    onChange={handleChange}
                    className="w-[90%] rounded-[0.5rem] p-[5px] border mt-3"
                  />
                </label>
              </div>
              <button
                type="submit"
                className="border bg-green-600 hover:bg-green-900 transition-all text-white p-[8px] rounded-[0.5rem] mt-8"
              >
                Sign Up
              </button>
              <Link href="/signup" className="">
                <button className="font-medium underline w-full text-center mt-1 hover:text-purple-500 transition">
                Go back
                </button>
              </Link>
            </form>
          </div>
        </div>
      {/* )} */}
    </div>
  )
}

export default Signup
