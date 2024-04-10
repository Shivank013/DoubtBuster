// components/RatingForm.js
'use client'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaStar } from 'react-icons/fa6'
import { RxCross2 } from 'react-icons/rx'

// Adjust the path accordingly
import { submitRating } from '@/frontendservices/operations/submitrating'

import { jwtDecode } from 'jwt-decode'
let expertId = '660124d78b7941a941ae8fb9'
// let userId = '66027051a54e727f5371ed40'
let rating = 3

// let userId = '6608f706df8ab8cc1225fa19'

const RatingForm = () => {
  const { token } = useSelector((state) => state.auth)
  // const { expert } = useSelector((state) => state.expert)

  const dispatch = useDispatch()
  const [feedback, setFeedback] = useState('')
  const [rvalue, setRvalue] = useState(0)
  const [tval, settval] = useState('')

  // console.log(expert, 'dikhao bhai expert')
  useEffect(() => {
    if (!token) {
      // Handle case where token is missing
      console.error('Token is missing')
      // Optionally, redirect the user to the login page
    } else {
      var decoded = jwtDecode(token)
      console.log(decoded.id, 'bhai token yha h')
      settval(decoded.id)
    }
  }, [token])

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value)
  }

  const setvalueone = () => {
    setRvalue(1)
  }

  const setvaluetwo = () => {
    setRvalue(2)
  }

  const setvaluethree = () => {
    setRvalue(3)
  }

  const setvaluefour = () => {
    setRvalue(4)
  }

  const setvaluefive = () => {
    setRvalue(5)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    console.log(typeof tval, 'studentid')
    console.log(typeof expertId, 'expertId')
    console.log(typeof feedback, 'feedbackId')
    console.log(rvalue, 'rvalue')
    console.log('bhai ky ho rha h')
    console.log(rvalue)
    let rating = rvalue
    let userId = tval
    let parsedData;
    if (localStorage.getItem('expert')) {
      
      var data = localStorage.getItem('expert');
      
     
       parsedData = JSON.parse(data);
      
      // Use the extracted data
      console.log(parsedData);
  } else {
      console.log('No data found in local storage.');
  }
   let expertId = parsedData.id;
   console.log(expertId );
    dispatch(submitRating({ userId, expertId, feedback, rating }))
    // Optionally, you can reset the form fields here
  }

  return (
    <div className=" bg-slate-800  w-[100vw] flex justify-center items-center h-[100vh]">
      <div className=" px-10 shadow-2xl flex flex-col justify-center  bg-black border-2 border-red-800 rounded-2xl">
        <div className="w-full h-10 flex py-4 flex-row-reverse">
          <button className=" text-3xl text-white">
            <RxCross2 />
          </button>
        </div>
        <p className=" font-semibold text-xl mx-5 mt-2 mb-7 text-red-500">
          Expert Rating:
        </p>
        <div className=" text-5xl w-full flex justify-center">
          <button
            onClick={setvalueone}
            className={` ${
              rvalue >= 1 ? ' text-yellow-500' : ' text-white'
            } ml-16 mx-5`}
          >
            <FaStar />
          </button>
          <button
            onClick={setvaluetwo}
            className={` ${
              rvalue >= 2 ? ' text-yellow-500' : ' text-white'
            } mx-5`}
          >
            <FaStar />
          </button>
          <button
            onClick={setvaluethree}
            className={` ${
              rvalue >= 3 ? ' text-yellow-500' : ' text-white'
            } mx-5`}
          >
            <FaStar />
          </button>
          <button
            onClick={setvaluefour}
            className={` ${
              rvalue >= 4 ? ' text-yellow-500' : ' text-white'
            } mx-5`}
          >
            <FaStar />
          </button>
          <button
            onClick={setvaluefive}
            className={` ${
              rvalue >= 5 ? ' text-yellow-500' : ' text-white'
            } mr-16 mx-5`}
          >
            <FaStar />
          </button>
        </div>
        <p className=" font-semibold text-xl mx-5 my-7 text-red-500">
          Feedback:
        </p>

        <div className=" flex justify-center items-center w-full">
          <textarea
            onChange={handleFeedbackChange}
            className=" bg-slate-300 w-[500px] p-2 h-24 font-medium mb-10 rounded-xl"
          ></textarea>
        </div>

        <div className=" text-white flex justify-center items-center w-full mb-10">
          <button
            onClick={handleSubmit}
            className=" bg-red-500 hover:bg-red-700 text-xl font-semibold px-4 py-2 rounded-xl"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default RatingForm