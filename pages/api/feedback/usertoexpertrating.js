// Import necessary modules
import { User } from '../../../model/user'
import { Expert } from '../../../model/expert' // Adjust the path accordingly

// Import necessary modules

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res
        .status(405)
        .json({ success: false, message: 'Method Not Allowed' })
    }

    // Extract data from the request body
    const { userId, expertEmail, feedback, rating } = req.body

    // Validate data (you can add more validation logic as needed)

    if (!userId ) {
      return res
        .status(400)
        .json({ success: false, message: 'user id is miising' })
    }
    if(!expertEmail){
      return res
      .status(400)
      .json({ success: false, message: 'expert email is miising' })
    }
    if(!feedback){
      return res
      .status(400)
      .json({ success: false, message: 'feedback is miising' })
    }
    if(!rating){
      return res
      .status(400)
      .json({ success: false, message: 'rating is miising' })
    }

    // Find the user by userId
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Find the expert by expertEmail
    const expert = await Expert.findOne({ email: expertEmail })
    if (!expert) {
      return res.status(404).json({ error: 'Expert not found' })
    }

    // Add rating, review, and user's name to the expert's profile
    expert.ratingAndReviews.push({ feedback, rating, Name: user.firstName })

    // Calculate the new average rating for the expert
    let totalRating = 0
    expert.ratingAndReviews.forEach((review) => {
      totalRating += review.rating
    })
    expert.rating = totalRating / expert.ratingAndReviews.length

    // Save the updated expert
    await expert.save()

    // Send a success response
    return res
      .status(201)
      .json({ message: 'Rating and review submitted successfully' })
  } catch (error) {
    // Handle errors, if any
    console.error('Error submitting rating and review:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}