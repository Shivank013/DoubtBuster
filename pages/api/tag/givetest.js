// pages/api/fetchQuestionsByTag.js

import { Tags } from '@/model/Tags'
import { Question } from '@/model/Question'
import connectDB from '@/utils/db'

export default async function handler(req, res) {
  await connectDB()
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { tagName } = req.body

  try {
    const tag = await Tags.findOne({ name: tagName }).lean() // Use lean() to convert Mongoose document to plain JavaScript object
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' })
    }
    const populatedTag = await Promise.all(
      tag.questions.map(async (questionId) => {
        const question = await Question.findById(questionId)
        return question
      })
    )

    res.status(200).json({ questions: populatedTag })
    // const tag = await Tags.findOne({ name: tagName })
    // console.log(tag)
    // res.status(404).json({ message: 'dfbjsdbj' })
    // if (!tag) {
    //   return res.status(404).json({ message: 'Tag not found' })
    // }

    // res.status(200).json({ questions: tag.questions })
  } catch (error) {
    console.error('Error fetching questions:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
