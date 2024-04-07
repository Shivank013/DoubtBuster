"use client"

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ColorRing } from 'react-loader-spinner'

const SkillComponent = () => {
  const [skills, setSkills] = useState([])
  const [isLoading, setIsLoading] = useState(true) // State to manage loading status

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/skill/getskill/expertskills'
        )
        if (response.data.success) {
          setSkills(response.data.tag)
        } else {
          console.error('Error fetching skills:', response.data.message)
        }
      } catch (error) {
        console.error('Error fetching skills:', error)
      } finally {
        setIsLoading(false) // Set loading to false when fetching is done (whether successful or not)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="w-full overflow-hidden">
      <h2 className="font-bold text-[1.5rem] mt-5 text-center">
        Expert Skills
      </h2>
      {isLoading ? (
        <div className="flex justify-center  items-center h-[100vh]">
          {' '}
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        </div> // Display loading message while fetching data
      ) : (
        <ul className="flex flex-wrap mt-[4rem] gap-x-[5rem] gap-y-10 w-full justify-evenly">
          {skills.map((skill, index) => (
            <li
              className="border rounded-xl shadow text-gray-600 w-[25%] p-4 text-center bg-[#d8d0d035] text-[1.1rem] "
              key={index}
            >
              {skill}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SkillComponent
