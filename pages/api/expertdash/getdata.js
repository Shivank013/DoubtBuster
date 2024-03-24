// pages/api/experts/[id].js

import { Expert } from '../../../model/expert' // Import your Mongoose Expert model
import { checkAuth } from '@/utils/feature'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    // Fetch all experts
    const expert = await checkAuth(req, res)

    if (!expert) {
      return res.status(404).json({
        success: false,
        message: 'login first',
      })
    }

    const experts = await Expert.findById(expert.id)

    return res.status(200).json({ experts })
  } catch (error) {
    console.error('Error fetching experts:', error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
