import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'
import bgImage from '../../../../public/images/stdbg.png'
const UserDetails = () => {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          'http://localhost:3000/api/studentdash/getdata'
        )
        setUserData(res.data.users) // Assuming users is the key containing user data
        setLoading(false)
      } catch (error) {
        console.error('Error fetching user data:', error)
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])
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