import mongoose from 'mongoose'

// Define the user schema using the Mongoose Schema constructor
const userSchema = new mongoose.Schema(
  {
    // Define the name field with type String, required, and trimmed
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
      // required: true,
    },

    token: {
      type: String,
    },
    Ip: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    Block: {
      type: [String],
      default: [],
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

    Favourite: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expert',
      },
    ],
  },
  { timestamps: true }
)

// Export the Mongoose model for the user schema, using the name "user"
export const User = mongoose.models.User || mongoose.model('User', userSchema)
// export default mongoose.model("User", userSchema);
