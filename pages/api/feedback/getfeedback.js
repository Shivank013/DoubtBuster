// import { Feedback } from '@/model/Feedback'
// export default async function handler(req, res) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ message: 'Method Not Allowed' })
//   }
//   try {
//     // Fetch all experts
//     const feedbacks = await Feedback.find()

//     res.status(200).json(feedbacks)
//   } catch (error) {
//     console.error('Error fetching experts:', error)
//     return res.status(500).json({ message: 'Internal Server Error' })
//   }
// }
