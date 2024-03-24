// pages/api/test/createQuestions.js

import { Question } from '@/model/Question'
import { Tags } from '@/model/Tags'
import connectDB from '@/utils/db'
import { NextResponse } from 'next/server'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req, res) {
  await connectDB()
  try {
    if (req.method !== 'POST') {
      return res
        .status(405)
        .json({ success: false, message: 'Method Not Allowed' })
    }

    const { subject, questions } = req.body

    console.log(questions)

    // Find or create the tag for the subject
    let tag = await Tags.findOne({ name: subject })
    if (!tag) {
      tag = await Tags.create({ name: subject })
    }

    // Create and associate questions with the tag
    const questionIds = []
    for (const qData of questions) {
      const newQuestion = await Question.create({
        ...qData,
        tag: tag._id, // Associate the question with the tag
      })

      tag.questions.push(newQuestion._id)
      questionIds.push(newQuestion._id)
    }

    await tag.save()

    return res.status(200).json({
      success: true,
      message: `Questions created successfully for ${subject}`,
      questions,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please retry later!',
    })
  }
}
