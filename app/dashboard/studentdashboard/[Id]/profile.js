'use client'

import React from 'react'
import { useSelector } from 'react-redux'

const UserDetails = () => {
  const { user } = useSelector((state) => state.profile)

  // Ensure user data is available before rendering
  if (!user) return <div>No user data available</div>

  return (
    <div>
      <h1>User Details</h1>
      <p>
        <strong>Name:</strong> {user.firstName} {user.lastName}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Account Type:</strong> {user.accountType}
      </p>
      <div>
        <strong>Block:</strong>
        <ul>
          {user.Block.map((blockItem, index) => (
            <li key={index}>{blockItem}</li>
          ))}
        </ul>
      </div>
      <div>
        <strong>Favourite:</strong>
        <ul>
          {user.Favourite.map((favItem, index) => (
            <li key={index}>{favItem}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default UserDetails
