'use client'
import React from 'react'
import Image from 'next/image'
import logo from '../../public/images/LOGO.png'
import img from '../../public/images/about-8.png'
import pic from '../../public/images/about-9.jpg'

const page = () => {
  return (
    <div>
        <nav className="flex z-50 justify-between items-center h-[4rem] fixed w-[98.9%] top-0 shadow-md bg-white">
          <div>
            <Image alt='' src={logo} className="ml-16 w-[14rem]" />
          </div>
          <div className="mr-16 font-sans flex justify-center items-center">
            <a className="cursor-pointer mr-10 text-l font-semibold rounded-full text-white py-2 px-3 bg-purple-500">About</a>
            <a href="/" className="cursor-pointer mr-10 text-l font-semibold">
              Home
            </a>
            <div>
              <a
                href="signup"
                className="cursor-pointer text-center text-l font-semibold py-2 px-3 "
              >
                Signup
              </a>
            </div>
          </div>
        </nav>

        <div className='w-10/12 m-auto'>
            <h1 className='mt-[7rem] text-center font-sans text-[40px] font-bold text-[#333843] pb-[36px] leading-[150%]'>About Us</h1>
            <Image src={img} alt='' className='border rounded-[2rem] w-full h-[33rem] mt-5'></Image>
            <p className='text-center mt-[7rem] font-sans text-[32px] font-semibold leading-[150%] text-[#333843]'><span className='text-purple-500'>Our</span> Mission</p>
            <p className='w-8/12 text-center m-auto text-[16px] mt-[3rem] text-[#333843] pb-[12px] leading-[180%]'>
            Our mission is to revolutionize the world of invoice processing by providing innovative, efficient, and secure solutions that streamline and automate the exchange of invoice data. 
            We are dedicated to simplifying operations for companies of all sizes and industries, reducing manual processes, and eliminating communication overheads.
            </p>
            <div className='mt-[7rem] flex gap-x-8'>
                <Image alt='' src={pic} className='rounded-[1.6rem] border'></Image>
                <div>
                <p className='mt-[5rem] font-sans text-[32px] font-semibold leading-[150%] text-[#333843]'><span className='text-purple-500'>Our</span> Vision</p>
                <p className='w-9/12 text-[16px] mt-[3rem] text-[#333843] pb-[12px] leading-[180%]'>
                We envision a future where the cumbersome and error-prone methods of invoice processing are a thing of the past. 
                Invoys aspires to be the leading force in this transformation, connecting businesses across the world through our Invoice Data Exchange Network.<br/><br/>
                Our vision is to create a comprehensive ecosystem that facilitates real-time invoice, purchase order, and payment status exchanges. 
                We see a world where electronic invoicing and reporting become the norm offering a simple and secure alternative to traditional methods.
                </p>
                </div>
            </div>
        </div>
        <footer className=" w-full bg-gray-800 text-white p-8 mt-[5rem]">
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

export default page