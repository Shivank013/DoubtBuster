import { User } from '@/model/user'; // Update the path to your user model
import connectDB from '@/utils/db';
export default async function handler(req,res) {
    await connectDB();
    try {
      if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
      
      } 
      const user = await User.find({});
      
      return res.status(200).json({
        success: true,
        user,
        message: 'Logged in successfully',
      });
 }catch (err){

    }
}