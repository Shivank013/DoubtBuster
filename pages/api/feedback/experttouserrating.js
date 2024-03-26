// Import necessary modules
import { User } from '../../../model/user'
import { Expert } from '../../../model/expert' // Adjust the path accordingly

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res
        .status(405)
        .json({ success: false, message: 'Method Not Allowed' })
    }
    // Extract data from the request body
    const { userId, expertId, feedback, rating } = req.body

    // Validate data (you can add more validation logic as needed)

    // Find the user by userId
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Find the expert by expertId
    const expert = await Expert.findById(expertId)
    if (!expert) {
      return res.status(404).json({ error: 'Expert not found' })
    }

    // Add rating and review to the expert's profile
    user.ratingAndReviews.push({ feedback, rating })

    // Calculate the new average rating for the expert
    let totalRating = 0
    user.ratingAndReviews.forEach((review) => {
      totalRating += review.rating
    })
    user.rating = totalRating / user.ratingAndReviews.length

    // Save the updated expert
    await user.save()

    // Optionally, you can also save the rating and review to the user's profile if needed

    // Send a success response
    res
      .status(201)
      .json({ message: 'Rating and review submitted successfully' })
  } catch (error) {
    // Handle errors, if any
    console.error('Error submitting rating and review:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
