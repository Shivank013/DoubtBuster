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
    <div className="w-full overflow-hidden">
      <h2 className="font-bold text-4xl md:text-5xl lg:text-6xl mt-5 text-center font-gaming">
        Expert Skills
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-4 mt-10">
        {skills.map((skill, index) => (
          <li
            className="rounded-full h-52 w-52 overflow-hidden relative shadow-lg transform transition duration-300 hover:scale-105"
            key={index}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-400 via-red-500 to-pink-500 opacity-50 rounded-full"></div>
            <div className="relative z-10 p-6 mt-11">
              <p className="text-black text-lg font-semibold text-center   text-3xl flex items-center justify-center font-gaming">
                {skill}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SkillComponent
