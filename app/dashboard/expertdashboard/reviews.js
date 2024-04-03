import React, { useEffect, useState } from 'react'
import axios from 'axios'

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/api/feedback/expertallrating')
        console.log(response, 'response dikhao')
        setReviews(response.data)
      } catch (error) {
        console.error('Error fetching reviews:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>Expert Reviews</h1>
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
    </div>
  )
}

export default Reviews
