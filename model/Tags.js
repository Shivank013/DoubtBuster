import mongoose from 'mongoose'
import { Question } from './Question'

const tagsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
    },
  ],
})

export const Tags = mongoose.models.Tags || mongoose.model('Tags', tagsSchema)
