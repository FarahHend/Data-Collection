import React, { useState } from 'react';
import axios from 'axios';

const AddSurveyForm = () => {
  const [titleSurvey, setTitleSurvey] = useState('');
  const [descriptionSurvey, setDescriptionSurvey] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const userId = localStorage.getItem('userId'); // Retrieve the userId from localStorage
  
    if (!userId) {
      console.error("User ID not found in localStorage.");
      return;
    }
  
    const surveyData = {
      titleSurvey,
      descriptionSurvey,
      user: {
        id_user: userId,
      },
    };
  
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/add', surveyData, {
        params: { userId }, // Pass the userId as a query parameter
      });
      console.log('Survey added successfully:', response.data);
      // Handle success, e.g., show a success message
    } catch (error) {
      console.error('Error adding survey:', error.message);
      // Handle error, e.g., show an error message
    }
    window.alert("Survey add with success!");
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="titleSurvey">Title:</label>
          <input type="text" id="titleSurvey" value={titleSurvey} onChange={(e) => setTitleSurvey(e.target.value)} />
        </div>
        <div>
          <label htmlFor="descriptionSurvey">Description:</label>
          <textarea id="descriptionSurvey" value={descriptionSurvey} onChange={(e) => setDescriptionSurvey(e.target.value)} />
        </div>
        <button type="submit">Add Survey</button>
      </form>
    </div>
  );
};

export default AddSurveyForm;

