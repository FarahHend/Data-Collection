import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OptionForm from 'variables/OptionForm.js'
import {
  Button,
  Card,
  CardBody,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
} from 'reactstrap';

const AddQuestionToSurvey = ({ surveyId }) => {
  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState('ONE_CHOICE_TYPE');
  const [questions, setQuestions] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

      
      setQuestionText('');
      setQuestionType('ONE_CHOICE_TYPE');
      fetchQuestions();
    } catch (error) {
      console.error('Error adding question:', error.message);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/auth/question/${questionId}`);
      const options = response.data;

      for (const option of options) {
        await axios.delete(`http://localhost:8080/api/v1/auth/deleteoption/${option.idOption}`);
      }

      await axios.delete(`http://localhost:8080/api/v1/auth/deletequestion/${questionId}`);
  
      console.log('Question and associated options deleted successfully.');
      fetchQuestions();
    } catch (error) {
      console.error('Error deleting question:', error.message);
    }
  };
  

  useEffect(() => {
    fetchQuestions();
  }, [surveyId]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/auth/getsurvey/${surveyId}`);
      console.log('Updated Questions List:', response.data);
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error.message);
    }
  };
  return (
    <div>
      {questions.map((question) => (
        <Card key={question.idQuestion} className="card-coin card-plain small-card">
          <CardBody>
          <Row><Col md="8">
          <h3>{question.questionText}</h3>
          </Col>
          <Col md="4">
            <Button  size="sm"
              className="btn-simple" 
                color="danger" 
                onClick={() => handleDeleteQuestion(question.idQuestion)}>
               <i className="tim-icons icon-simple-remove" />
              </Button>
              </Col></Row>
            <OptionForm questionId={question.idQuestion} questionType={question.questionType} />
          </CardBody>
        </Card>
      ))}
      <Card className="card-coin card-plain small-card">
        <CardBody>
          <form onSubmit={handleSubmit} className="form">
            <Row>
              <Col md="8">
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="tim-icons icon-pencil" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Set your question here"
                    type="text"
                    id="questionText"
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                  />
                </InputGroup>
              </Col>
              <Col md="4">
                <Dropdown isOpen={dropdownOpen} toggle={() => setDropdownOpen(!dropdownOpen)}>
                  <DropdownToggle color="warning" nav>
                    {questionType === 'ONE_CHOICE_TYPE' ? 'One Choice Type' : 'Text Zone Type'}
                    <i className="tim-icons icon-minimal-down" />
                  </DropdownToggle>
                  <DropdownMenu >
                    <DropdownItem onClick={() => setQuestionType('ONE_CHOICE_TYPE')}>
                      One Choice Type
                    </DropdownItem>
                    <DropdownItem onClick={() => setQuestionType('TEXT_ZONE_TYPE')}>
                      Text Zone Type
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </Col>
            </Row>
          </form>
          <Button className="btn-simple" color="warning" type="submit" onClick={handleSubmit}>
            Add Question
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddQuestionToSurvey;
