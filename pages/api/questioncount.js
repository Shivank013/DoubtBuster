// pages/api/incrementCount.js

import { Expert } from '../../model/expert'
import connectDB from '@/utils/db'

export default async function handler(req, res) {
  await connectDB()
  if (req.method === 'POST') {
    const { email } = req.body

    try {
      // Find the expert by email and update the count field
      const updatedExpert = await Expert.findOneAndUpdate(
        { email: email },
        { $inc: { count: 1 } }, // Increment the count by one
        { new: true } // Return the updated document
      )

      // If expert is not found, return 404
      if (!updatedExpert) {
        return res.status(404).json({ error: 'Expert not found' })
      }

      // Respond with the updated expert object
      res.status(200).json(updatedExpert)
    } catch (error) {
      console.error('Error incrementing count:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}