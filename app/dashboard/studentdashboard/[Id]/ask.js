'use client'

import React from 'react'
import { useSelector } from 'react-redux'
import { Doubt } from '@/frontendservices/operations/askdoubt'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const Form = () => {
  const [skill, setSkills] = useState([])
  const route = useRouter()
  // use effect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/tag/alltags'
        )
        if (response.data.success) {
          console.log(response.data)
          setSkills(response.data.tags)
        } else {
          console.error('Error fetching skills:', response.data.message)
        }
      } catch (error) {
        console.error('Error fetching skills:', error)
      }
    }

    fetchData()
  }, [])

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.profile)

  // const email = useSelector(selectEmail);
  const [formData, setFormData] = useState({
    skill: '',
    doubt: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here, e.g., send data to server
    console.log(formData.skill, formData.doubt)
    console.log(user.email)
    dispatch(Doubt(user.email, formData.skill, formData.doubt, route))
    // console.log("output after function call");
  }

  return (
    <div className="w-full h-full font-sans text-gray-700 bg-gradient-to-r from-rose-100 to-teal-100 flex justify-center items-center">
      <div className="w-1/2 p-16 bg-[#8b5cf6] rounded-3xl shadow-lg shadow-black">
        <h2 className="text-2xl text-white font-bold mb-4">Skills Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mt-2 mb-3 ">
            <label
              htmlFor="skill"
              className="block text-white font-semibold mb-2"
            >
              Select Skill:
            </label>
            <select
              id="skill"
              name="skill"
              value={formData.skill}
              onChange={handleInputChange}
              className="w-full p-2  border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500"
            >
              <option value="">Select</option>
              {skill.map((tag, index) => (
                <option key={index} value={tag.tagName}>
                  {tag.tagName}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4 font-semibold">
            <label htmlFor="doubt" className="block text-white mb-2">
              Level of Doubt:
            </label>

            <textarea
              name="doubt"
              rows="5"
              className="w-full p-2 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500"
              value={formData.doubt}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="flex justify-center items-center pt-3">
            <button
              type="submit"
              className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-6 py-3 text-center me-2 "
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Form
