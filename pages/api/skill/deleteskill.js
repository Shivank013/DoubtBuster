import { Expert } from '@/model/expert'
import connectDB from '@/utils/db'

export default async function handler(req, res) {
  await connectDB()

  try {
    const { expertId, skillsToDelete } = await req.body

    const expert = await Expert.findById(expertId)
    console.log(expertId)

    if (!expert) {
      return res.status(404).json({
        success: false,
        message: 'Expert not found',
      })
    }

    expert.skills = expert.skills.filter(
      (skills) => !skillsToDelete.includes(skills)
    )

    await expert.save()

    return res.status(200).json({
      success: true,
      message: 'Skills deletion successful',
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    })
  }
}
