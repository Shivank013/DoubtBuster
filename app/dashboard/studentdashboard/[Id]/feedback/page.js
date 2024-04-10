// components/RatingForm.js
'use client'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
// Adjust the path accordingly
import { submitRating } from '@/frontendservices/operations/submitrating'
// import { useRouter } from 'next/navigation'
let expertId = '660124d78b7941a941ae8fb9'
let userId = '66027051a54e727f5371ed40'

const RatingForm = () => {
  // const route=useRouter();
  const dispatch = useDispatch()
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value))
  }

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    console.log('bhai ky ho rha h')

    dispatch(submitRating({ userId, expertId, feedback, rating }))
    // Optionally, you can reset the form fields here
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Rating:
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={handleRatingChange}
          />
        </label>
      </div>
      <div>
        <label>
          Feedback:
          <textarea value={feedback} onChange={handleFeedbackChange}></textarea>
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default RatingForm
