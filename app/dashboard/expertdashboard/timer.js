'use client'

import React, { useEffect, useState } from 'react'

const Timer = ({ timeLimit, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp() // Callback function when time is up
    }
  }, [timeLeft, onTimeUp])

  // Format the time for display
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  return (
    <div className="text-center mt-5">
      <h2 className="text-lg font-bold">Time Left: {formatTime(timeLeft)}</h2>
    </div>
  )
}

export default Timer