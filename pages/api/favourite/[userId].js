import connectDB from '@/utils/db'
import { User } from '../../../model/user'
import { Expert } from '../../../model/expert'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    const { userId } = req.query

    // Connect to MongoDB
    await connectDB()

    // Find user by ID
    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Fetch favorite experts using the expert IDs in the user's favorites
    const favoriteExperts = await Expert.find({ _id: { $in: user.Favourite } })

    res.status(200).json({ favoriteExperts })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
