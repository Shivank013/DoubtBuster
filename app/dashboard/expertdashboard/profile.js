import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getstudentdata } from '@/frontendservices/operations/studentdash'
import { useDispatch } from 'react-redux'
import { endpoints } from '@/frontendservices/api'

const UserDetails = () => {
  const dispatch = useDispatch()
  const [expertdata, setexpertdata] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get('/api/expertdash/getdata')
        console.log(res.data)
        console.log('datadikhao')
        setexpertdata(res.data.experts) // Assuming `users` is the key containing user data
        setLoading(false)
      } catch (error) {
        console.error('Error fetching user data:', error)
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  return (
    <div>
      <h1>User Details</h1>
      {loading ? (
        <p>Loading...</p>
      ) : expertdata ? (
        <div>
          <p>
            <strong>Name:</strong> {expertdata.firstName}
            <strong></strong> {expertdata.lastName}
          </p>
          <p>
            <strong>Email:</strong> {expertdata.email}
          </p>
          <p>
            <img
              src={expertdata.image}
              alt="User"
              style={{ width: '100px', height: '100px' }}
            />
          </p>
          {/* Add more details here as needed */}
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  )
}

export default UserDetails
