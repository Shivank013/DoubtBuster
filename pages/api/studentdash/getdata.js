// pages/api/experts/[id].js

import { User } from '../../../model/user' // Import your Mongoose Expert model
import { checkAuth } from '@/utils/feature'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    // Fetch all experts
    const user = await checkAuth(req, res)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'login first',
      })
    }

    const users = await User.findById(user.id)
    console.log(users, 'deep')

    return res.status(200).json({ users })
  } catch (error) {
    console.error('Error fetching experts:', error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
