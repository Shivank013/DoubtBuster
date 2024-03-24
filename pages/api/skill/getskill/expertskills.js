import { Tags } from '@/model/Tags' // Update the path accordingly
import connectDB from '@/utils/db'
import { Expert } from '@/model/expert'
import { checkAuth } from '@/utils/feature'

export default async function handler(req, res) {
  await connectDB()

  try {
    const user = await checkAuth(req, res)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Login first',
      })
    }

    // If expertId is provided, fetch tags for the specific expert
    if (user) {
      const expert = await Expert.findById(user.id)

      if (!expert) {
        return res.status(404).json({
          success: false,
          message: 'Expert not found',
        })
      }

      return res.status(200).json({
        success: true,
        tag: expert.skills,
      })
    }

    // If no expertId is provided, fetch all tags
    const tags = await Tags.find({}, '_id name')

    return res.status(200).json({
      success: true,
      tags,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    })
  }
}
