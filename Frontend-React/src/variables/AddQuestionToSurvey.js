import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OptionForm from 'variables/OptionForm.js'

const AddQuestionToSurvey = ({ surveyId }) => {
  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState('ONE_CHOICE_TYPE');
  const [questions, setQuestions] = useState([]);

  const [forceUpdate, setForceUpdate] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const questionData = {
      questionText,
      questionType,
      survey: {
        idSurvey: surveyId,
      },
    };

    try {
      await axios.post('http://localhost:8080/api/v1/auth/addquestion', questionData);
      console.log('Question added successfully.');

      // After adding the question, fetch the updated list of questions
      setQuestionText(''); // Reset form fields
      setQuestionType('ONE_CHOICE_TYPE');
      setForceUpdate((prev) => !prev);
    } catch (error) {
      console.error('Error adding question:', error.message);
    }
  };

  // Fetch the updated list of questions whenever surveyId changes
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/auth/getsurvey/${surveyId}`);
        console.log('Updated Questions List:', response.data);
        setQuestions(response.data); // Store the questions in state
      } catch (error) {
        console.error('Error fetching questions:', error.message);
      }
    };

    fetchQuestions();
  },  [surveyId, forceUpdate]);

  return (
    <div>
      <h2>Add Question to Survey</h2>
      <form onSubmit={handleSubmit}>
        {/* Add form elements to collect questionText, questionType, etc. */}
        <div>
          <label htmlFor="questionText">Question Text:</label>
          <input
            type="text"
            id="questionText"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="questionType">Question Type:</label>
          <select
            id="questionType"
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
          >
            <option value="ONE_CHOICE_TYPE">One Choice Type</option>
            <option value="TEXT_ZONE_TYPE">Text Zone Type</option>
          </select>
        </div>
        {/* Add more form elements as needed */}
        <button type="submit">Add Question</button>
      </form>
  
      {/* Display the list of questions for the specific survey */}
      <h2>Questions for Survey {surveyId}</h2>
      {questions.map((question) => (
        <div key={question.idQuestion}>
          <h3>{question.questionText}</h3>
          <OptionForm questionId={question.idQuestion} />
        </div>
      ))}
    </div>
  );
      };
      export default AddQuestionToSurvey; 
