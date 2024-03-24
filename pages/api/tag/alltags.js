// pages/api/getTags.js

import { Tags } from '@/model/Tags' // Update the path accordingly
import connectDB from '@/utils/db'

export default async function handler(req, res) {
  await connectDB()

  try {
    const tags = await Tags.find({}, '_id name') // Fetch only _id and name fields

    // Customizing the tags data format
    const formattedTags = tags.map((tag) => ({
      id: tag._id,
      tagName: tag.name,
      // Add more fields here if needed
    }))

    return res.status(200).json({
      success: true,
      tags: formattedTags,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    })
  }
}
