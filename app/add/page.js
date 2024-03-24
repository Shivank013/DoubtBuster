"use client"
import React, { useState } from 'react';

function TimeInputForm() {
  const [timeValue, setTimeValue] = useState('');

  const handleTimeChange = (e) => {
    // Ensure the time format is consistently in 24-hour format
    const inputTime = e.target.value;
    const [hours, minutes] = inputTime.split(':');
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    setTimeValue(formattedTime);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Selected time:', timeValue);
    // Process the selected time or perform other actions
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Select a time:
          <input
            type="time"
            value={timeValue}
            onChange={handleTimeChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default TimeInputForm;
