import React, { useState } from 'react';
import axios from 'axios';

const OptionForm = ({ questionId }) => {
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
      await axios.post('http://localhost:8080/api/v1/auth/addoption', optionData);
      console.log('Option added successfully.');
      setOptionText(''); // Reset form field after adding option
    } catch (error) {
      console.error('Error adding option:', error.message);
    }
  };

  return (
    <div>
      <h4>Add Option for Question {questionId}</h4>
      <form onSubmit={handleSubmit}>
        <label htmlFor="optionText">Option Text:</label>
        <input
          type="text"
          id="optionText"
          value={optionText}
          onChange={(e) => setOptionText(e.target.value)}
        />
        <button type="submit">Add Option</button>
      </form>
    </div>
  );
};

export default OptionForm;
