import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ColorRing } from 'react-loader-spinner'
import { RiDoubleQuotesL } from "react-icons/ri";
import { FaStar } from "react-icons/fa6";

// Function to render star icons based on the rating value
const StarRating = ({ rating }) => {
  // Generate an array of stars based on the rating value
  const stars = Array.from({ length: rating }, (_, index) => index + 1)

  return (
    <div className=' text-yellow-400 flex items-center justify-center gap-x-3 text-3xl'>
      {/* Render star icons */}
      {stars.map((_, index) => (
        <span key={index}><FaStar/></span>
      ))}
    </div>
  )
}

const Reviews = () => {
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(true) // State to manage loading status

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/api/feedback/expertallrating')
        console.log(response, 'response dikhao')
        setReviews(response.data)
      } catch (error) {
        console.error('Error fetching reviews:', error)
      } finally {
        setIsLoading(false) // Set loading to false when fetching is done (whether successful or not)
      }
    }

    fetchData()
  }, [])

  return (
    <div className=' w-full h-[100vh] flex items-center flex-col'>
      <h1 className='text-center font-bold text-[1.5rem] mt-5'>Expert Reviews</h1>
      {isLoading ? (
        <div className=" mt-[40vh]">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        </div> 
      ) : (
        <ul className=' flex gap-2 flex-wrap w-full justify-evenly mt-[2.5rem] mb-[6rem]'>
          {reviews.map((review, index) => (
            <li className=' bg-gradient-to-r from-orange-600 to-orange-500 rounded-lg p-5 mb-8 w-[30%] flex flex-col gap-5 hover:scale-110  transition shadow-xl' key={index}>
              <RiDoubleQuotesL className=' absolute' size={50}/>
              <p className=' text-white font-bold pt-11 text-center text-2xl opacity-90 uppercase '>{review.Name}</p>
              {/* <p className='text-black font-semibold opacity-90 text-center uppercase '>{review.userName}</p> */}
              <StarRating rating={review.rating} />
              <p className=' text-slate-800 font-semibold text-center text-xl'>{review.feedback}</p>
              {/* Render the star rating component */}
              {/* If you also need to display the ID, uncomment the line below */}
              {/* <p>ID: {review._id}</p> */}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Reviews