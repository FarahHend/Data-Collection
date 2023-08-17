import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const OptionPage = () => {
  const { questionId } = useParams();
  const [optionText, setOptionText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const optionData = {
      optionText,
      question: {
        idQuestion: questionId,
      },
    };

    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/addoption', optionData);
      console.log('Option added successfully:', response.data);

      setOptionText('');
      localStorage.setItem(`survey_confirm_${questionId}`, true);
    } catch (error) {
      console.error('Error adding option:', error.message);
    }
  };

  return (
    <div>
      <h2>Add Option for Question ID: {questionId}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Option Text"
          value={optionText}
          onChange={(e) => setOptionText(e.target.value)}
          required
        />
        <button type="submit">Add Option</button>
      </form>
    </div>
  );
};

export default OptionPage;
