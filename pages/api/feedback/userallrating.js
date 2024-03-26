// Import necessary modules
import { User } from '../../../model/user' // Adjust the path accordingly

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res
        .status(405)
        .json({ success: false, message: 'Method Not Allowed' })
    }
    // Extract user ID from request parameters
    const { userId } = req.body

    // Find the user by ID
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Extract and return the ratings and reviews for the user
    const ratingsAndReviews = user.ratingAndReviews

    res.status(200).json(ratingsAndReviews)
  } catch (error) {
    // Handle errors, if any
    console.error('Error fetching ratings and reviews:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
