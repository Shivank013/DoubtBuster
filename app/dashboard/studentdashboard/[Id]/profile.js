import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'
import bgImage from '../../../../public/images/stdbg.png'
const UserDetails = () => {
  // const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const {user} = useSelector( (state) => state.profile );
  console.log(user);
  console.log(typeof user);
  // let userData=JSON.parse(user);
  // console.log(userData);
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const res = await axios.get(
  //         'http://localhost:3000/api/studentdash/getdata'
  //       )
  //       setUserData(res.data.users) ;
  //       setLoading(false)
  //     } catch (error) {
  //       console.error('Error fetching user data:', error)
  //       setLoading(false)
  //     }

  //   }

  //   fetchUserData()
  // }, [])

  return (
    <div>
      <h1>User Details</h1>
      {user ? (
      
        <div>
          <p>
            <strong>Name:</strong> {user.firstName} {user.lastName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Account Type:</strong> {user.accountType}
          </p>
          <img
            src={user.image}
            alt="User"
            className="w-32 h-32 rounded-full"
          />
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
          ) : (
            <>
                <h1>no user found</h1>
            </>
        )}
     
    </div>
  )
}
export default UserDetails
