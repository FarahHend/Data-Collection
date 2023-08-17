import React, { useState } from 'react';
import axios from 'axios';
import { Col, FormGroup, Input, Button } from 'reactstrap';

const AddSurveyForm = () => {
  const [titleSurvey, setTitleSurvey] = useState('');
  const [descriptionSurvey, setDescriptionSurvey] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const userId = localStorage.getItem('userId'); 
  
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
        params: { userId }, 
      });
      console.log('Survey added successfully:', response.data);
      
    } catch (error) {
      console.error('Error adding survey:', error.message);
      
    }
    window.alert("Survey add with success!");
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <Col lg="6" sm="3">
        <FormGroup >
          <label htmlFor="titleSurvey">Title</label>
          <Input type="text" id="titleSurvey" value={titleSurvey} onChange={(e) => setTitleSurvey(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <label htmlFor="descriptionSurvey">Description</label>
          <Input type="textarea" id="descriptionSurvey" value={descriptionSurvey} onChange={(e) => setDescriptionSurvey(e.target.value)} />
        </FormGroup>
        </Col>
        <Col lg="3" sm="6">
          <FormGroup>
            <Button className="btn-simple btn-round"
              color="info"
              type="button ">Create New Survey</Button>
          </FormGroup>
        </Col>
      </form>
    </div>
  );
};

export default AddSurveyForm;