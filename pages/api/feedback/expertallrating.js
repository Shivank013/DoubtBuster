// Import necessary modules
import { Expert } from '../../../model/expert' // Adjust the path accordingly
import { checkAuth } from '@/utils/feature'

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res
        .status(405)
        .json({ success: false, message: 'Method Not Allowed' })
    }
    // Extract expert ID from request parameters
    const user = await checkAuth(req, res)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Login first',
      })
    }

    const expert = await Expert.findById(user.id)

    // Find the expert by ID

    if (!expert) {
      return res.status(404).json({ error: 'Expert not found' })
    }

    // Extract and return the rating and reviews for the expert
    const ratingsAndReviews = expert.ratingAndReviews

    res.status(200).json(ratingsAndReviews)
  } catch (error) {
    // Handle errors, if any
    console.error('Error fetching ratings and reviews:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
