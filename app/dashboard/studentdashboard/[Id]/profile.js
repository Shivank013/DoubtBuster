import React, { useState, useEffect } from 'react'
import axios from 'axios'

const UserDetails = () => {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          'http://localhost:3000/api/studentdash/getdata'
        )
        setUserData(res.data.users) // Assuming `users` is the key containing user data
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
      ) : userData ? (
        <div>
          <p>
            <strong>Name:</strong> {userData.firstName} {userData.lastName}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Account Type:</strong> {userData.accountType}
          </p>
          <img
            src={userData.image}
            alt="User"
            style={{ width: '100px', height: '100px' }}
          />
          <div>
            <strong>Block:</strong>
            <ul>
              {userData.Block.map((blockItem, index) => (
                <li key={index}>{blockItem}</li>
              ))}
            </ul>
          </div>
          <div>
            <strong>Favourite:</strong>
            <ul>
              {userData.Favourite.map((favItem, index) => (
                <li key={index}>{favItem}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  )
}

export default UserDetails
