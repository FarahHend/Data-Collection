import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SurveyList = () => {
  const [surveys, setSurveys] = useState([]);
  const userId = localStorage.getItem('userId'); // Assuming userId is retrieved from authentication
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/auth/user/${userId}`);
        console.log('API Response:', response.data);
        setSurveys(response.data);
      } catch (error) {
        console.error('Error fetching surveys:', error.message);
      }
    };

    if (userId) {
      fetchSurveys();
    }
  }, [userId]);

  const handleDetailsClick = (surveyId, surveyTitle) => {
    if (surveyId !== undefined) {
      // Use React Router's navigate function to go to SurveyDetailsPage with the surveyId in the URL
      navigate(`/survey/${surveyId}`);
    } else {
      console.error('Survey ID is undefined.');
    }
  };

  return (
    <div>
      <h2>Surveys for User {userId}</h2>
      {surveys.map((survey) => {
        console.log('Survey ID:', survey.id);
        return (
          <div key={survey.id}>
            <h3>{survey.titleSurvey}</h3>
            <p>{survey.descriptionSurvey}</p>
            <button onClick={() => handleDetailsClick(survey.id, survey.titleSurvey)}>
              Details
            </button>
          </div>
        );
      })}
    </div>
  );
    }

    export default SurveyList;