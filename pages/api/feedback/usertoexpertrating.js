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
    console.log(req.body);

    // Extract data from the request body
    const { userId} = req.body
    
    console.log("yaha dhek rtah hu");
    console.log(userId);
    

    if (!userId.userId ) {
      return res
        .status(400)
        .json({ success: false, message: 'user id is miising' })
    }
    if(!userId.expertEmail){
      return res
      .status(400)
      .json({ success: false, message: 'expert email is miising' })
    }
    if(!userId.feedback){
      return res
      .status(400)
      .json({ success: false, message: 'feedback is miising' })
    }
    if(!userId.rating){
      return res
      .status(400)
      .json({ success: false, message: 'rating is miising' })
    }

    // Find the user by userId
    const user = await User.findById(userId.userId)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Find the expert by expertEmail
    const expert = await Expert.findOne({ email: userId.expertEmail })
    if (!expert) {
      return res.status(404).json({ error: 'Expert not found' })
    }

    const rating = userId.rating;
    const feedback = userId.feedback;

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