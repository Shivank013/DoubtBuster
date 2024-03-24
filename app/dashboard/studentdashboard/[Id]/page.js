// pages/components/Sidebar.js
'use client'
import React, { useState } from 'react'
import { LayoutDashboard, Menu, UserCircle } from 'lucide-react'
import LOGO from '../../../../public/images/LOGO.png'
import Image from 'next/image'
import Ask from './ask'
import Reviews from './reviews'
import Profile from './profile'
import { useDispatch } from 'react-redux'
import axios from 'axios' // Import axios for making HTTP requests

import { useRouter } from 'next/navigation'

function Sidebar({ params }) {
  const [expanded, setExpanded] = useState(true)
  const [tab, setTab] = useState('profile')
  const dispatch = useDispatch()

  const router = useRouter()

  console.log('User Id: ', params.Id)

  const handleLogout = async () => {
    try {
      // Make a request to the logout route
      const response = await axios.get('/api/auth/user/logout')
      console.log(response)
      if (response.data.success) {
        router.push('/')
        // If logout was successful, reset the state or perform any necessary actions
        // For example, redirect to the login page or clear user data
        console.log('Logout successful')
        // Perform additional actions like redirecting the user or clearing the session
      }
    } catch (error) {
      console.error('Logout failed', error)
      // Handle logout failure, maybe show an error message to the user
    }
  }

  const handleChange = (choice) => {
    setTab(choice)
  }

  return (
    <div className="flex h-screen">
      <div
        className={`bg-[#2563eb] border-r text-white h-full  ${
          expanded ? 'w-1/6' : 'w-20'
        }`}
      >
        <div className="flex items-center pt-6 pl-2">
          <Image
            src={LOGO}
            className={`overflow-hidden transition-all ${
              expanded ? 'w-36 pl-2 mr-4' : 'w-0 mr-0'
            }`}
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 mb-1.5 "
          >
            {expanded ? <Menu /> : <Menu />}
          </button>
        </div>
        {
          <div>
            <div
              className="flex items-center text-white pt-1.5 pb-1.5 pl-4 pr-4 transition-all hover:bg-[#1d4ed8] hover:transition-all"
              activeClassName="bg-[#1d4ed8] text-white"
            >
              <div className="">
                <LayoutDashboard size={20} />
              </div>
              <button
                onClick={() => handleChange('profile')}
                className={`overflow-hidden transition-all ${
                  expanded ? 'w-52 text-start ml-4' : 'w-0'
                }`}
              >
                Profile
              </button>
            </div>

            <div
              className="flex items-center text-white pt-1.5 pb-1.5 pl-4 pr-4 transition-all hover:bg-[#1d4ed8] hover:transition-all"
              activeClassName="bg-[#1d4ed8] text-white"
            >
              <div className="">
                <LayoutDashboard size={20} />
              </div>
              <button
                onClick={() => handleChange('ask')}
                className={`overflow-hidden transition-all ${
                  expanded ? 'w-52 text-start ml-4' : 'w-0'
                }`}
              >
                Ask Doubts
              </button>
            </div>

            <div
              className="flex items-center text-white pt-1.5 pb-1.5 pl-4 pr-4 transition-all hover:bg-[#1d4ed8] hover:transition-all"
              activeClassName="bg-[#1d4ed8] text-white"
            >
              <div className="">
                <LayoutDashboard size={20} />
              </div>
              <button
                onClick={() => handleChange('review')}
                className={`overflow-hidden transition-all ${
                  expanded ? 'w-52 text-start ml-4' : 'w-0'
                }`}
              >
                Reviews
              </button>
            </div>
            <div
              className="flex items-center text-white pt-1.5 pb-1.5 pl-4 pr-4 transition-all hover:bg-[#1d4ed8] hover:transition-all"
              activeClassName="bg-[#1d4ed8] text-white"
            >
              <div className="">
                <LayoutDashboard size={20} />
              </div>
              <button
                onClick={handleLogout} // Call handleLogout function on button click
                className={`overflow-hidden ${
                  expanded ? 'w-52 text-start ml-4' : 'w-0'
                }`}
              >
                Logout
              </button>
            </div>
          </div>
        }
      </div>

      {tab === 'profile' ? <Profile /> : tab === 'ask' ? <Ask /> : <Reviews />}
    </div>
  )
}

export default Sidebar
