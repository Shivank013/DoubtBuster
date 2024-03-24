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
    <div>
      <h2>Expert Skills</h2>
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  )
}

export default SkillComponent
