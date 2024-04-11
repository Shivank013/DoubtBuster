import mongoose from 'mongoose'
const expertSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    // Define the email field with type String, required, and trimmed
    email: {
      type: String,
      required: true,
      trim: true,
    },

    // Define the password field with type String and required
    password: {
      type: String,
      required: true,
    },
    accountType: {
      type: String,
      enum: ['Admin', 'Student', 'Instructor'],
      required: true,
    },

    token: {
      type: String,
    },
    image: {
      type: String,
    },
    Ip: {
      type: String,
    },

    skills: {
      type: [String],
    },
    ratingAndReviews: [
      {
        feedback: String,
        Name: String,
        rating: {
          type: Number,
          min: 1,
          max: 5,
        },
      },
    ],
    Time: {
      start: {
        hour: {
          type: Number,
          required: true,
        },
        minute: {
          type: Number,

          default: 0,
        },
        second: {
          type: Number,

          default: 0,
        },
      },
      end: {
        hour: {
          type: Number,
          required: true,
        },
        minute: {
          type: Number,

          default: 0,
        },
        second: {
          type: Number,

          default: 0,
        },
      },
    },

    count: {
      type: Number,
      default: 0, // Default count value
    },
    satisfyStudent: {
      type: Number,
    },

    on_off: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

// Export the Mongoose model for the user schema, using the name "user"
export const Expert =
  mongoose.models.Expert || mongoose.model('Expert', expertSchema)
// export default mongoose.model("Expert", expertSchema);
