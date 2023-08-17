import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
  CardText,
  Label,
  FormGroup,
  Input,
  Modal,
} from 'reactstrap';

import Navbar from 'components/Navbars/Navbar.js';
import Footer from 'components/Footer/Footer.js';

const SurveyDetails = () => {
  const { surveyId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState({});
  const [userChoices, setUserChoices] = useState([]);
  const [showNotification, setShowNotification] = useState(false);


  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/auth/getsurvey/${surveyId}`);
        console.log('Updated Questions List:', response.data);
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error.message);
      }
    };

    fetchQuestions();
  }, [surveyId]);

  const fetchOptionsForQuestion = async (questionId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/auth/question/${questionId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching options:', error.message);
      return [];
    }
  };

  useEffect(() => {
    const fetchOptions = async () => {
      const optionsData = {};
      for (const question of questions) {
        const questionId = question.idQuestion;
        const options = await fetchOptionsForQuestion(questionId);
        optionsData[questionId] = options;
      }
      setOptions(optionsData);
    };

    fetchOptions();
  }, [questions]);

  const handleTextAreaBlur = (questionId, optionText) => {
    handleSubmitUserChoice(questionId, -1, optionText);
  };
  
  const handleRadioChange = (questionId, optionId) => {
    handleSubmitUserChoice(questionId, optionId);
  };
  

  const handleSubmitUserChoice = async (questionId, selectedOptionId, optionText) => {
    const userId = localStorage.getItem('userId');
    try {
      if (selectedOptionId === -1) {
        await axios.post('http://localhost:8080/api/v1/auth/adduserchoice/userchoice', {
          userId: parseInt(userId),
          surveyId: parseInt(surveyId),
          questionId: questionId,
          optionId: null, 
          optionText: optionText, 
        });
      } else {
        await axios.post('http://localhost:8080/api/v1/auth/adduserchoice/userchoice', {
          userId: parseInt(userId),
          surveyId: parseInt(surveyId),
          questionId: questionId,
          optionId: selectedOptionId,
        });
      }
  
      console.log('User choice added successfully.');

      setUserChoices((prevUserChoices) => ([
        ...prevUserChoices,
        { questionId, optionId: selectedOptionId },
      ]));
    } catch (error) {
      console.error('Error adding user choice:', error.message);
    }
  };
  

  const handleConfirmSubmit = async () => {
    try {
      const submitPromises = userChoices.map(({ questionId, optionId }) => {
        return handleSubmitUserChoice(questionId, optionId);
      });

      await Promise.all(submitPromises);
      console.log('All choices submitted successfully.');

      setUserChoices([]);
      setShowNotification(true);
    } catch (error) {
      console.error('Error submitting choices:', error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="wrapper">
        <section className="section section-lg section-coins">
          <Container>
          <h2>Read carefully!! Take your time</h2>
            <Row>
              <Col md="12">
                <Card className="card-coin card-plain big-card">
                  <CardBody>
                    <Row>
                      <Col md="12">
                        
                          <CardBody>
                            <div>
                              {questions.length === 0 ? (
                                <div>No questions found for this survey.</div>
                              ) : (
                                questions.map((question) => (
                                  <Card key={question.idQuestion} className="mb-3">
                                    <CardBody>
                                      <CardTitle tag="h3">{question.questionText}</CardTitle>
                                      <CardText>
                                      {question.questionType === 'TEXT_ZONE_TYPE' ? (
  <div>
   <FormGroup>
  <Input
    type="textarea"
    placeholder="Write something ..."
    id={`textarea_${question.idQuestion}`}
    rows="4"
    style={{ width: '100%' }}
    defaultValue={options[question.idQuestion]?.[0]?.optionText}
    onBlur={(e) => {
      const optionText = e.target.value;
      handleTextAreaBlur(question.idQuestion, optionText);
    }}
  />
</FormGroup>
  </div>
) : (
  <div>
  {options[question.idQuestion]?.map((option) => (
    <FormGroup check className="form-check-radio" key={option.idOption}>
      <Label check>
        <Input
          type="radio"
          id={`option_${option.idOption}`}
          name={`question_${question.idQuestion}`}
          value={option.idOption}
          onChange={() => handleRadioChange(question.idQuestion, option.idOption)}
        />
        <span className="form-check-sign" />
        {option.optionText}
      </Label>
    </FormGroup>
  ))}
</div>
                                        )}
                                      </CardText>
                                    </CardBody>
                                  </Card>
                                ))
                              )}
                            </div>
                          </CardBody>
                      </Col>
                     
                    </Row>
                    <Col md="12" className="text-center">
        <Button
          color="success"
          onClick={handleConfirmSubmit}
          disabled={userChoices.length === 0}
        >
          Confirm All Choices
        </Button>
      </Col>
      <Modal isOpen={showNotification} toggle={() => setShowNotification(false)}>
  <div className="modal-header justify-content-center">
    <button className="close" onClick={() => setShowNotification(false)}>
      <i className="tim-icons icon-simple-remove" />
    </button>
    <h4 className="title title-up">Thank You!</h4>
  </div>
  <div className="modal-body">
    <p>Thank you for participating in the survey.</p>
  </div>
  <div className="modal-footer">
    <Button color="default" type="button" onClick={() => setShowNotification(false)}>
      Close
    </Button>
  </div>
</Modal>

                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default SurveyDetails;
