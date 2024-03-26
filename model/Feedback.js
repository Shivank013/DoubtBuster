// feedbackSchema.js
import mongoose from 'mongoose'

const feedbackSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    expertId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Expert',
    },
    feedback: String,
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true }
)

export const Feedback =
  mongoose.models.Feedback || mongoose.model('Feedback', feedbackSchema)
