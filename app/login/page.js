'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../../public/images/LOGO.png'
import teacher from '../../public/images/teacher2.webp'
import pic from '../../public/images/student1.png'
import { useSelector } from 'react-redux'
import { ColorRing } from 'react-loader-spinner'

const login = () => {
  return (
    <div className="h-screen w-screen overflow-x-hidden">
      <div className="flex justify-center items-center">
        <nav className="flex z-50 justify-between items-center h-[3rem] fixed w-[98.9%] top-0 shadow-md bg-white">
          <div>
            <Image alt='' src={logo} className="ml-16 w-[14rem]" />
          </div>
          <div className="mr-16 font-sans flex justify-center items-center">
            <a href='/about' className="cursor-pointer mr-10 text-l font-semibold">About</a>
            <a href="/" className="cursor-pointer mr-10 text-l font-semibold">
              Home
            </a>
            <div>
              <a
                href="signup"
                className="cursor-pointer text-center text-l font-semibold py-2 px-3 rounded-full text-white bg-purple-500"
              >
                Signup
              </a>
            </div>
          </div>
        </nav>

        <div className="flex flex-col justify-center items-center gap-6 h-screen w-screen bg-[#34b9411e]">
          <Image alt='' src={teacher} height={250} width={250} />
          <p className="text-[2rem] text-black">
            For &nbsp;
            <span className="bg-gradient-to-r from-[#6127ff] to-[#6127ff] font-bold text-transparent bg-clip-text">
              Expert
            </span>
          </p>
          <p className="max-w-[415px] text-[#050c1bc7] text-[18px] leading-6 font-normal [text-align-last:center] text-center ">
            Engage, inspire, and guide learners with enthusiasm. Foster a
            supportive environment. Share knowledge, encourage curiosity, and
            cultivate critical thinking.
          </p>
          <Link href="login/expertlogin">
            <button className="border border-purple-500 min-w-[180px] p-3 mt-3 bg-purple-500 text-white rounded leading-5 text-[14px] font-bold">
              Login
            </button>
          </Link>
          <p className="text-[1rem] mt-[-15px]">Dont have an account?</p>
          <Link href="signup" className="mt-[-1.5rem]">
            <button className="font-medium underline hover:text-purple-500 transition">
              Signup
            </button>
          </Link>
        </div>

        <div className="flex flex-col justify-center items-center gap-6 h-screen w-screen">
          <Image alt='' src={pic} height={250} width={250} />
          <p className="text-[2rem]">
            For &nbsp;
            <span className="bg-gradient-to-r from-[#6127ff] to-[#6127ff] font-bold text-transparent bg-clip-text">
              Student
            </span>
          </p>
          <p className="max-w-[415px] text-[#050c1bc7] text-[18px] leading-6 font-normal [text-align-last:center] text-center">
            Engage, inspire, and guide learners with enthusiasm. Foster a
            supportive environment. Share knowledge, encourage curiosity, and
            cultivate critical thinking.
          </p>
          <Link href="login/studentlogin">
            <button className="border border-gray-800 min-w-[180px] p-3 mt-3 bg-[#fff] text-gray-800 font-bold rounded leading-5 text-[14px]">
              Login
            </button>
          </Link>
          <p className="text-[1rem] mt-[-15px]">Dont have an account?</p>
          <Link href="signup" className="mt-[-1.5rem]">
            <button className="font-medium underline hover:text-purple-500 transition">
              Signup
            </button>
          </Link>
        </div>
      </div>
      <footer className=" w-full bg-gray-800 text-white p-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Footer Section 1 */}
          <div>
            <div className="flex flex-row">
              <span className="ml-1 text-[1.5rem] inline font-sans font-semibold">
                Doubt Buster
              </span>
            </div>
            <div className="p-3">
              Empowering Students, One Doubt at a Time: Your Personalized Path
              to Mastery
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Company</h3>
            <ul>
              <li>Home</li>
              <li>About Us</li>
              <li>Contact Us</li>
            </ul>
          </div>

          {/* Footer Section 2 */}
          <div>
            <h3 className="text-xl font-bold mb-4">Services</h3>
            <ul>
              <li>Student LogIn</li>
              <li>Expert LogIn</li>
              <li>Interactive Platform</li>
            </ul>
          </div>

          {/* Footer Section 3 */}
          <div>
            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
            <ul>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>LinkedIn</li>
            </ul>
          </div>
        </div>
        <div className="w-[screen] h-[1px] bg-white m-6"></div>
        <div className="mt-8 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Doubt Buster. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default login
