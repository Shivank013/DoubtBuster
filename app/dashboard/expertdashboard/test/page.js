'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'next/navigation'
import {
  fetchQuestionsByTag,
  addskills,
} from '@/frontendservices/operations/tags' // Import your action
import { Router } from 'next/router'
import { useRouter } from 'next/navigation'

const TagDetailsPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tag = searchParams.get('tag')
  const dispatch = useDispatch()

  // Select questions from Redux store state
  const questions = useSelector((state) => state.questions.questions)
  console.log(questions, 'frontend')

  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [score, setScore] = useState(0) // State to store the user's score
  const [submitted, setSubmitted] = useState(false) // State to track whether the user has submitted the answers

  useEffect(() => {
    if (tag) {
      dispatch(fetchQuestionsByTag(tag)) // Dispatch the action to fetch data
    }
  }, [tag, dispatch])

  const handleOptionSelect = (questionId, option, question) => {
    console.log(option, question[option], 'dikhao bhai option')
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: question[option],
    })
  }

  const handleSubmit = () => {
    let userScore = 0
    // Iterate through each question to calculate the score
    questions.forEach((question) => {
      console.log(selectedAnswers)
      // Check if the selected option matches the correct answer
      if (selectedAnswers[question._id] === question.correctAnswer) {
        userScore++ // Increment the score if the answer is correct
      }
    })
    setScore(userScore) // Update the user's score
    setSubmitted(true) // Set submitted to true to indicate that the user has submitted their answers
    if (userScore > 4) {
      console.log('dekho yha se atg ja rha h ')
      console.log(tag)
      // Dispatch an action to fetch the specific route using Redux
      dispatch(addskills(tag))
    }
    router.push('/dashboard/expertdashboard')
  }

  return (
    <div className='bg-gray-50'>
      <div className='flex justify-evenly'>
        <h1 className='mt-5 text-[1.3rem]'>Tag Details</h1>
        <p className='mt-5 text-[1.3rem]'>Tag: {tag}</p>
      </div>
      <hr className='mt-6'></hr>
      {submitted && <p>Score: {score}</p>}{' '}
      {/* Display the user's score if answers are submitted */}
      {!submitted && (
        <div>
          <h2 className='text-[1.3rem] mt-5 text-center'>All Questions</h2>
          <form>
            <ul className='mt-[3rem]'>
              {questions.map((question) => (
                <li key={question._id} className='border ml-10 p-4 rounded-xl shadow mr-10 mb-5 bg-white'>
                  <h1 className='text-black mb-2'>Question</h1>
                  <p className='border p-2 text-gray-600 rounded-lg bg-gray-50 bg-[#d8d0d035]'> {question.question}</p>
                  <ul>
                    <h1 className=' mt-8 '>Choice</h1>
                    {['option1', 'option2', 'option3', 'option4'].map(
                      (optionKey) => (
                        <li className='mb-[2.5rem] mt-[1.2rem] w-full' key={optionKey}>
                          <input
                            type="radio"
                            id={`${question._id}-${optionKey}`}
                            name={question._id}
                            value={optionKey}
                            checked={
                              selectedAnswers[question._id] ===
                              question[optionKey]
                            }
                            onChange={() =>
                              handleOptionSelect(
                                question._id,
                                optionKey,
                                question
                              )
                            }
                          />
                          <label htmlFor={`${question._id}-${optionKey}`} className='ml-6 mt-[-2.1rem] text-gray-600 border p-2 rounded-lg bg-[#d8d0d035] block'>
                            {question[optionKey]}
                          </label>
                        </li>
                      )
                    )}
                  </ul>
                  <p className='hidden'>Correct Answer: {question.correctAnswer}</p>
                </li>
              ))}
            </ul>
            <button type="button" onClick={handleSubmit} className='mb-5 ml-11 mt-5 border p-2 bg-gray-600 text-white rounded w-[5rem]'>
              Submit
            </button>

          </form>
        </div>
      )}
    </div>
  )
}

export default TagDetailsPage
