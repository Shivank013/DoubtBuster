import connectDB from '@/utils/db'
import { User } from '../../../model/user'
import { Expert } from '../../../model/expert'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    const { userId, expertId } = req.body

    await connectDB()

    // Find user and expert by their IDs
    const user = await User.findById(userId)
    const expert = await Expert.findById(expertId)
    console.log(user)
    console.log(expert)

    if (!user || !expert) {
      return res.status(404).json({ message: 'User or Expert not found' })
    }
   // Check if the expert is already in the user's favorites
    if (user.Favourite.includes(expertId)) {
      return res.status(400).json({ message: 'Expert already in favorites' })
    }
    // Add expert to user's favorites
    user.Favourite.push(expertId)
    await user.save()

    res.status(200).json({ message: 'Expert added to favorites successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
