import connectDB from '@/utils/db'
import { Tags } from '@/model/Tags'

export default async function handler(req, res) {
  await connectDB()

  try {
    if (req.method !== 'GET') {
      return res
        .status(405)
        .json({ success: false, message: 'Method Not Allowed' })
    }

    const tags = await Tags.find({}, 'name')

    return res
      .status(200)
      .json({ success: true, tags: tags.map((tag) => tag.name) })
  } catch (error) {
    console.error('Error fetching tags:', error)
    return res.status(500).json({ success: false, message: 'Server Error' })
  }
}
