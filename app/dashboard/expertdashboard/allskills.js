"use client"

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ColorRing } from 'react-loader-spinner'
import Image from 'next/image'
import image from '../../../public/images/skill1.jpg'

const SkillComponent = () => {
  const [skills, setSkills] = useState([])
  const [isLoading, setIsLoading] = useState(true) // State to manage loading status

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          '/api/skill/getskill/expertskills'
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
    <div className="w-full flex flex-col items-center mb-10">
      <h2 className="font-bold text-[1.5rem] mt-5 text-center">
        Expert Skills
      </h2>
      <div className='flex w-full mt-[4rem] gap-x-5 '>
        {isLoading ? (
          <div className="flex justify-center items-center w-[50%]">
      
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
          <ul className="flex flex-wrap justify-evenly gap-x-10  items-center gap-y-5 w-[50%]">
            {skills.map((skill, index) => (
              <li
                className="border mt-8 mb-8 uppercase rounded-xl shadow-black shadow-lg text-gray-600 w-[40%] p-4 text-center bg-[#d8d0d035] text-xl font-semibold "
                key={index}
              >
                {skill}
              </li>
            ))}
          </ul>
        )}
        <div className='w-[50%] flex items-center mr-3 justify-center'>
          <Image alt='' src={image} className='' height={700} width={700}></Image>
        </div>
      </div>
      
    </div>
  )
}

export default SkillComponent
