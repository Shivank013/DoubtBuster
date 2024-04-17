import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import bgImage from '../../../../public/images/stdbg.png'
import { useSelector } from 'react-redux'
const UserDetails = () => {
const {user}=useSelector((state) => state.profile);
const {loading}=useSelector((state) => state.profile);

  const router=useRouter();

  let userData=null;
  userData =user;
  useEffect(()=>{

    if(!userData){
      window.location.href="https://doubt-buster.vercel.app/";
    }

  },[userData])
  return (
    <div className="flex w-full justify-between bg-gradient-to-r from-rose-100 to-teal-100 m-0 p-0">
      <div className="m-10 font-sans font-bold">
        <h1 className="text-5xl text-[#ea580c] mb-4">User Details</h1>
        {loading ? (
          <p>Loading...</p>
        ) : userData ? (
          <div className="mt-10 text-xl text-gray-700 font-medium">
            <p className="mb-3">
              <strong className="text-[#083344]">Name:</strong>{' '}
              {userData.firstName} {userData.lastName}
            </p>
            <p className="mb-3">
              <strong className="text-[#083344]">Email:</strong>{' '}
              {userData.email}
            </p>
            <p className="mb-3">
              <strong className="text-[#083344]">Account Type:</strong>{' '}
              {userData.accountType}
            </p>
          </div>
        ) : (
          <p>No user data available</p>
        )}
      </div>
      <div className="w-1/2 h-1/2 mr-24 mt-6">
        <Image src={bgImage} alt="bg-image" className="rounded" />
      </div>
    </div>
  )
}
export default UserDetails