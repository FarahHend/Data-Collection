import React from 'react';
import { useParams } from 'react-router-dom';
import AddQuestionToSurvey from 'variables/AddQuestionToSurvey.js';

const SurveyDetailsPage = () => {
  const { surveyId } = useParams(); // Get the surveyId from the URL params
  console.log('Received surveyId:', surveyId);

  return (
    <div>
      <h2>Survey Details</h2>
      <p>Survey ID: {surveyId}</p>
      {/* Render other survey details here */}
      <AddQuestionToSurvey surveyId={surveyId} />
    </div>
  );
};

export default SurveyDetailsPage;
