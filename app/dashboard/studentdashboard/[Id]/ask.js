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
 
    e.preventDefault();
    // Handle form submission here, e.g., send data to server
    console.log(formData.skill,formData.doubt);
    // console.log(user.email);
    // route.push("/call");
   dispatch( Doubt(user.email,formData.skill,formData.doubt,route));
    // console.log("output after function call");
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4">Skills Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
        <label htmlFor="skill" className="block mb-1">Select Skill:</label>
      <select
        id="skill"
        name="skill"
        value={formData.skill}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      >
        <option value="">Select</option>
        {skill.map((tag, index) => (
          <option key={index} value={tag.tagName}>{tag.tagName}</option>
        ))}
      </select>
    </div>
        <div className="mb-4">
          <label htmlFor="doubt" className="block mb-1">Doubt:</label>
       
          <textarea
            name="doubt"
            rows="5"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={formData.doubt}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Submit</button>
      </form>
    </div>
  );
};

           

export default Form
