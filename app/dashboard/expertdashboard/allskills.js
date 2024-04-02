import React, { useState, useEffect } from 'react'
import axios from 'axios'

const SkillComponent = () => {
  const [skills, setSkills] = useState([])

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
      }
    }

    fetchData()
  }, [])

  return (
    <div className='w-full overflow-hidden'>
      <h2 className='font-semibold text-[1.5rem] mt-5 text-center'>Expert Skills</h2>
      <ul className='flex flex-wrap mt-[4rem] gap-x-[5rem] gap-y-10 w-full justify-evenly'>
        {skills.map((skill, index) => (
          <li className='border rounded-xl shadow text-gray-600 w-[25%] p-4 text-center bg-[#d8d0d035] text-[1.1rem] ' key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  )
}

export default SkillComponent
