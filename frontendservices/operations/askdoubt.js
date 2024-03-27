import { askQuestion } from '../api'
// import { setLoading, setToken } from '@/frontendservices/slices/authSlice'
import { apiConnector } from '../apiconnector'
import { useRouter } from 'next/navigation'

const {ask} =askQuestion;

export function Doubt(email,skill,doubt) {
    return async (dispatch) => {
        try{
            console.log("it is output :"+email,skill,doubt);
        const response = await apiConnector('POST', ask, {email,skill,doubt }) // Pass email as an object
        console.log(' API RESPONSE............', response)
        //  console.log(email)
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
    }
    catch(err){
        console.log(err);
    };
}
}