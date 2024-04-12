"use client"

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'next/router';
import {
  fetchQuestionsByTag,
  addskills,
} from '@/frontendservices/operations/tags';
import { ColorRing } from 'react-loader-spinner';
import Timer from '../timer';
import { toast } from 'react-toastify';

const TagDetailsPage = () => {
  const { loading } = useSelector((state) => state.questions);
  const searchParams = useSearchParams();
  const tag = searchParams.get('tag');
  const dispatch = useDispatch();

  const questions = useSelector((state) => state.questions.questions);
  console.log(questions, 'frontend');

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [timeUp, setTimeUp] = useState(false); // State to manage time-up popup

  useEffect(() => {
    if (tag) {
      dispatch(fetchQuestionsByTag(tag));
    }
  }, [tag, dispatch]);

  const handleOptionSelect = (questionId, option, question) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: question[option],
    });
  };

  const handleSubmit = () => {
    let userScore = 0;
    questions.forEach((question) => {
      if (selectedAnswers[question._id] === question.correctAnswer) {
        userScore++;
      }
    });
    setScore(userScore);
    setSubmitted(true);
    if (userScore > 4) {
      toast.success('Skills added successfully');
      dispatch(addskills(tag));
    } else {
      toast.error('Skills not added');
    }
    // Assuming `Router` is imported from 'next/router'
    Router.push('/dashboard/expertdashboard');
  };

  const handleTimeUp = () => {
    setTimeUp(true);
    setTimeout(() => {
      setTimeUp(false);
      handleSubmit(); // Automatically submit when time is up after showing the popup
    }, 3000); // Adjust the duration of popup display as needed (3000 milliseconds = 3 seconds)
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-[100vh]">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        </div>
      ) : (
        <div className="bg-gray-50">
          <div className="flex justify-evenly">
            <h1 className="mt-5 text-[1.3rem]">Tag Details</h1>
            <p className="mt-5 text-[1.3rem]">Tag: {tag}</p>
            <Timer
              timeLimit={20}
              onTimeUp={handleTimeUp} // Handle time-up event
            />
          </div>
          <hr className="mt-6"></hr>
          {submitted && <p>Score: {score}</p>}
          {!submitted && (
            <div>
              <h2 className="text-[1.3rem] mt-5 text-center">All Questions</h2>
              <form>
                <ul className="mt-[3rem]">
                  {questions.map((question) => (
                    <li
                      key={question._id}
                      className="border ml-10 p-4 rounded-xl shadow mr-10 mb-5 bg-white"
                    >
                      <h1 className="text-black mb-2">Question</h1>
                      <p className="border p-2 text-gray-600 rounded-lg bg-gray-50 bg-[#d8d0d035]">
                        {question.question}
                      </p>
                      <ul>
                        <h1 className="mt-8">Choice</h1>
                        {['option1', 'option2', 'option3', 'option4'].map(
                          (optionKey) => (
                            <li
                              className="mb-[2.5rem] mt-[1.2rem] w-full"
                              key={optionKey}
                            >
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
                              <label
                                htmlFor={`${question._id}-${optionKey}`}
                                className="ml-6 mt-[-2.1rem] text-gray-600 border p-2 rounded-lg bg-[#d8d0d035] block"
                              >
                                {question[optionKey]}
                              </label>
                            </li>
                          )
                        )}
                      </ul>
                      <p className="hidden">
                        Correct Answer: {question.correctAnswer}
                      </p>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="mb-5 ml-11 mt-5 border p-2 bg-gray-600 text-white rounded w-[5rem]"
                >
                  Submit
                </button>
              </form>
            </div>
          )}
        </div>
      )}
      {timeUp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-md shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Time is up!</h2>
            <p>Your test has been submitted automatically.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TagDetailsPage;
