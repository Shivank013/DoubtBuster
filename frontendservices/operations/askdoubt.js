"use client"

import { askQuestion } from '../api'
// import { setLoading, setToken } from '@/frontendservices/slices/authSlice'
import { apiConnector } from '../apiconnector'
import { useRouter } from 'next/navigation'
import { setRoom } from '../slices/room';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { useSocket } from "@/context/SocketProvider";
import { SocketContext } from "@/context/SocketProvider";
import { useContext } from "react"
import { setLoading } from '../slices/room';

import otpGenerator from 'otp-generator'
const {ask} =askQuestion;

export function Doubt(emails,skill,doubt,route) {

    console.log(emails);
    // const {user} = useSelector( (state) => state.profile );
    // const {email, setEmail, room, setRoom} = useContext(SocketContext);
    return async (dispatch) => {
        try{
        dispatch(setLoading(true));
        console.log("it is output :"+emails,skill,doubt);
        const response = await apiConnector('POST', ask, {emails,skill,doubt }) // Pass email as an object
        console.log(' API RESPONSE............', response.data.roomid);
        //  console.log(email)
        console.log("room no ",response.data.roomid)
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        dispatch(setRoom(response.data.roomid));
        // setEmail(emails);
        // setRoom(response.data.roomid);
        dispatch(setLoading(false));
        route.push('/call');
    }
    catch(err){
        console.log(err);
    };
}
}