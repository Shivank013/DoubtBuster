"use client"

import React, { useState } from 'react';

function AskDoubt() {
  const [doubt, setDoubt] = useState('');
  const [skill, setSkill] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // You can now use 'selectedImage' and 'skill' to upload or process the image
    if (selectedImage) {
      console.log('Selected image:', selectedImage);
      // You can perform further actions like uploading the image to a server.
    }

    if (skill) {
      console.log('Skill:', skill);
      // You can use the 'skill' value for further processing.
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-gray-100 rounded-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="doubt" className="block text-sm font-medium text-gray-700">
            Enter text:
          </label>
          <textarea
            name="doubt"
            rows="5"
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            value={doubt}
            onChange={(e) => setDoubt(e.target.value)}
          ></textarea>
        </div>

        <div>
          <label htmlFor="skill" className="block text-sm font-medium text-gray-700">
            Skill:
          </label>
          <input
            type="text"
            name="skill"
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700">
            Select an image:
          </label>
          <input
            type="file"
            name="imageUpload"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
}

export default AskDoubt;
