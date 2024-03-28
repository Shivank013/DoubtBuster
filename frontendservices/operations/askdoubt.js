import { askQuestion } from '../api'
// import { setLoading, setToken } from '@/frontendservices/slices/authSlice'
import { apiConnector } from '../apiconnector'
import { useRouter } from 'next/navigation'
import { setRoom } from '../slices/room';
const {ask} =askQuestion;

export function Doubt(email,skill,doubt,route) {
    return async (dispatch) => {
        try{
            console.log("it is output :"+email,skill,doubt);
        const response = await apiConnector('POST', ask, {email,skill,doubt }) // Pass email as an object
        console.log(' API RESPONSE............', response.data.roomid);
        //  console.log(email)

        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        dispatch(setRoom(response.data.roomid));
        route.push('/call');
    }
    catch(err){
        console.log(err);
    };
}
}