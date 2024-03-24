import { Expert } from '@/model/expert'
import connectDB from '@/utils/db'
import { checkAuth } from '@/utils/feature'

export default async function handler(req, res) {
  await connectDB()

  try {
    const { newSkills } = req.body // Destructure newSkills directly from req.body

    const user = await checkAuth(req, res)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Login first',
      })
    }

    const expert = await Expert.findById(user.id)

    if (!expert) {
      return res.status(404).json({
        success: false,
        message: 'Expert not found',
      })
    }

    // Convert newSkills to an array of strings if it's not already in that format
    const skillsToAdd = Array.isArray(newSkills) ? newSkills : [newSkills]

    expert.skills.push(...skillsToAdd) // Push the new skills to the expert's skills array

    await expert.save()

    return res.status(200).json({
      success: true,
      message: 'Skills added to expert array',
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    })
  }
}
