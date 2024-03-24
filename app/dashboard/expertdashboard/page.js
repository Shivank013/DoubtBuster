// pages/components/Sidebar.js
'use client'
import React, { useState } from 'react'
import { LayoutDashboard, Menu, UserCircle } from 'lucide-react'
import LOGO from '../../../public/images/LOGO.png'
import Image from 'next/image'
import Ask from './allskills'
import Reviews from './reviews'
import Profile from './profile'
import Addskill from './addskills'

function page() {
  const [expanded, setExpanded] = useState(true)
  const [tab, setTab] = useState('profile')

  const handelChange = async (choice) => {
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
                onClick={() => handelChange('profile')}
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
                onClick={() => handelChange('ask')}
                className={`overflow-hidden transition-all ${
                  expanded ? 'w-52 text-start ml-4' : 'w-0'
                }`}
              >
                All skills
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
                onClick={() => handelChange('review')}
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
                onClick={() => handelChange('addskills')}
                className={`overflow-hidden transition-all ${
                  expanded ? 'w-52 text-start ml-4' : 'w-0'
                }`}
              >
                add skills
              </button>
            </div>
          </div>
        }
      </div>

      {tab === 'profile' ? (
        <Profile />
      ) : tab === 'ask' ? (
        <Ask />
      ) : tab === 'addskills' ? (
        <Addskill />
      ) : (
        <Reviews />
      )}
    </div>
  )
}

export default page
