// "use client"

// import React, { useState } from 'react';

// function AskDoubt() {
//   const [doubt, setDoubt] = useState('');
//   const [skill, setSkill] = useState('');
//   const [selectedImage, setSelectedImage] = useState(null);

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     setSelectedImage(file);
    
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // You can now use 'selectedImage' and 'skill' to upload or process the image
//     if (selectedImage) {
//       console.log('Selected image:', selectedImage);
//       // You can perform further actions like uploading the image to a server.
//     }

//     if (skill) {
//       console.log('Skill:', skill);
//       // You can use the 'skill' value for further processing.
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto mt-8 p-4 bg-gray-100 rounded-md">
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="doubt" className="block text-sm font-medium text-gray-700">
//             Enter text:
//           </label>
//           <textarea
//             name="doubt"
//             rows="5"
//             className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
//             value={doubt}
//             onChange={(e) => setDoubt(e.target.value)}
//           ></textarea>
//         </div>

//         <div>
//           <label htmlFor="skill" className="block text-sm font-medium text-gray-700">
//             Skill:
//           </label>
//           <input
//             type="text"
//             name="skill"
//             className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
//             value={skill}
//             onChange={(e) => setSkill(e.target.value)}
//           />
//         </div>

//         <div>
//           <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700">
//             Select an image:
//           </label>
//           <input
//             type="file"
//             name="imageUpload"
//             accept="image/*"
//             onChange={handleImageChange}
//             className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
//           />
//         </div>

//         <div>
//           <button
//             type="submit"
//             className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
//           >
//             Upload
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default AskDoubt;
import React from 'react';
import { useSelector } from 'react-redux';
import { Doubt } from '@/frontendservices/operations/askdoubt';
import { useDispatch } from 'react-redux'
import { useEffect,useState } from 'react';
import axios from 'axios';

const Form = () => {
const [skill,setSkills] = useState([]);
// use effect 
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/api/tag/alltags'
      )
      if (response.data.success) {
        console.log(response.data);
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



  const dispatch = useDispatch();
  const {user} = useSelector( (state) => state.profile );

  // const email = useSelector(selectEmail);
  const [formData, setFormData] = useState({
    skill: '',
    doubt:'',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send data to server
    console.log(formData.skill,formData.doubt);
    console.log(user.email);
   dispatch( Doubt(user.email,formData.skill,formData.doubt));
    // console.log("output after function call");

  };

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
          <label htmlFor="doubt" className="block mb-1">Level of Doubt:</label>
       
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

export default Form;

