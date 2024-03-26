// import connectDB from '@/utils/db'
// import { Feedback } from '@/model/Feedback'
// import { User } from '@/model/user'
// export default async function handler(req, res) {
//   await connectDB()
//   try {
//     if (req.method !== 'POST') {
//       return res
//         .status(405)
//         .json({ success: false, message: 'Method Not Allowed' })
//     }
//     // console.log(req);
//     // const userId=req.body.userID;

//     // console.log(userId);
//     const { userId, feedback, rating } = req.body

//     const alreadyReviewed = await Feedback.findOne({ user: userId })
//     // console.log(alreadyReviewed);
//     // const ans=await User.findOne({ user:userId});
//     // console.log(ans);
//     const ans = await User.findOne({ _id: userId })
//     console.log(ans)

//     const ratingReview = await Feedback.create({
//       feedback,
//       rating, // Include rating here
//       user: userId,
//       // ans
//     })

//     return res.status(200).json({
//       success: true,
//       data: ratingReview,
//       ans,
//     })
//   } catch (err) {
//     console.log(err)
//     return res.status(500).json({
//       success: false,
//       message: err.message,
//     })
//   }
// }
