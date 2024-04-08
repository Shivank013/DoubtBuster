import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ColorRing } from 'react-loader-spinner'
import { RiDoubleQuotesL } from "react-icons/ri";

// Function to render star icons based on the rating value
const StarRating = ({ rating }) => {
  // Generate an array of stars based on the rating value
  const stars = Array.from({ length: rating }, (_, index) => index + 1)

  return (
    <div className=' text-yellow-400 flex items-center justify-center -mt-1 gap-x-3 text-[1.4rem]'>
      {/* Render star icons */}
      {stars.map((_, index) => (
        <span key={index}>★</span>
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
    <div className=''>
      <h1 className='text-center font-bold text-[1.5rem] mt-5'>Expert Reviews</h1>
      {isLoading ? (
        <div className="">
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
        </div> 
      ) : (
        <ul className=' flex gap-5 flex-wrap w-full justify-evenly mt-[2.5rem] mb-[5rem]'>
          {reviews.map((review, index) => (
            <li className='bg-[#d8d0d035] border p-5 mb-8 w-[30%] flex flex-col gap-5 hover:scale-110 hover:shadow-gray-600 transition rounded-lg shadow-black shadow-xl' key={index}>
              <RiDoubleQuotesL className='text-[#b6cfc6]' size={50}/>
              <p className='text-gray-500 -mt-8 ml-11 font-semibold text-[1.1rem]'>{review.feedback}</p>
              <p className='text-black font-bold opacity-90 uppercase text-center'>Feedback: {review.userName}</p>
              {/* Render the star rating component */}
              <StarRating rating={review.rating} />
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