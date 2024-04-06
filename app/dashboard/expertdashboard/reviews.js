import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ColorRing } from 'react-loader-spinner'

// Function to render star icons based on the rating value
const StarRating = ({ rating }) => {
  // Generate an array of stars based on the rating value
  const stars = Array.from({ length: rating }, (_, index) => index + 1)

  return (
    <div>
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
    <div className="  flex justify-center">
      <h1>Expert Reviews</h1>
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
        </div> /// Display loading message while fetching data
      ) : (
        <ul>
          {reviews.map((review, index) => (
            <li key={index}>
              <p>Feedback: {review.feedback}</p>
              <p>Feedback: {review.userName}</p>
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
