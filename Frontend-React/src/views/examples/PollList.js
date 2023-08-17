import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Label,
  FormGroup,
  CustomInput,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  CardFooter,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
} from 'reactstrap';
const PollList = () => {
  const [questions, setQuestions] = useState([]);
  const [optionsMap, setOptionsMap] = useState({});
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [submittedChoices, setSubmittedChoices] = useState({}); 
  const [pollChoices, setPollChoices] = useState([]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/auth/questionsWithNullSurvey');
      setQuestions(response.data);
      const surveysPerPage = 2;
      setTotalPages(Math.ceil(response.data.length / surveysPerPage));
      fetchOptionsForQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error.message);
    }
  };

  const fetchOptionsForQuestions = async (questions) => {
    const optionsMap = {};
    for (const question of questions) {
      const response = await axios.get(`http://localhost:8080/api/v1/auth/question/${question.idQuestion}`);
      optionsMap[question.idQuestion] = response.data;
    }
    setOptionsMap(optionsMap);
  };

  const handleChoiceSubmit = async (questionId) => {
    const userId = localStorage.getItem('userId');
    try {
      if (selectedOptionId !== null) {
        const response = await axios.post('http://localhost:8080/api/v1/auth/adduserchoice/simple', {
          userId: parseInt(userId),
          questionId: questionId,
          optionId: selectedOptionId,
        });

        console.log('PollChoice added successfully:', response.data);
        setSubmittedChoices((prevChoices) => ({
          ...prevChoices,
          userId: parseInt(userId),
          questionId: questionId,
          [questionId]: selectedOptionId,
        }));
        setSelectedOptionId(null);
      } else {
        console.error('Please select an option before submitting.');
      }
    } catch (error) {
      console.error('Error adding PollChoice:', error.message);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const getOptionUserCount = (questionId, optionId) => {
    let count = 0;
  
    questions.forEach((question) => {
      if (submittedChoices[question.idQuestion] === optionId) {
        count++;
      }
    });
  
    return count;
  };  
  
  return (
    <section className="section section-lg section-coins">
      <Container>
      <Row>
              <Col md="4">
                <hr className="line-info" />
                <h1>
                Data Begins with{" "}
                  <span className="text-info">You</span> <br/>
                  Your Responses <span className="text-info">Matter</span> !!
                </h1>
              </Col>
            </Row>
      <Row className="justify-content-center">
        <Col lg="12">
        <Row className="row-grid justify-content-center">
          {questions
          .slice((currentPage - 1) * 2, currentPage * 2).map((question) => (
            <Col md="6" key={question.idQuestion}>
              <Card className="card-coin card-plain" style={{ height: '250px' , width: '560px' }}>
                <CardBody>
                  <Row>
                    <Col md="12">
                      {submittedChoices[question.idQuestion] !== undefined ? (
                        <div>
                          <h3 className="mb-4">{question.questionText}</h3>
                          <div className="progress-container progress-info">
                          {optionsMap[question.idQuestion]?.map((option) => (
                          <div key={option.idOption}>
                          <span className="progress-badge">
                              {option.optionText}
                            </span>
                            <Progress max="100" value={getOptionUserCount(question.idQuestion, option.idOption)}>
                           
            </Progress>
          </div>
                          ))}
                          </div>
                        </div>
                      ) : (
                        <div>
                            <h3 className="mb-4">{question.questionText}</h3>
                          {optionsMap[question.idQuestion]?.map((option) => (
                            <FormGroup key={option.idOption} check className="form-check-radio">
                              <Label check>
                                <Input
                                  type="radio"
                                  name={`question_${question.idQuestion}_options`}
                                  value={option.idOption}
                                  onChange={() => setSelectedOptionId(option.idOption)}
                                  disabled={submittedChoices[question.idQuestion] !== undefined}
                                />
                                <span className="form-check-sign" />
                                {option.optionText}
                              </Label>
                            </FormGroup>
                          ))}
                        </div>
                      )}
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter className="text-center">
                  <Row>
                    <Col md="9"></Col>
                    <Col md="2">
                  <Button
                  size="sm"
                    className="btn-simple"
                    color="info"
                    onClick={() => handleChoiceSubmit(question.idQuestion)}
                    disabled={submittedChoices[question.idQuestion] !== undefined} 
                  >
                    <i className="tim-icons icon-send" />
                  </Button>
                  </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          ))}
          </Row>
        </Col>
      </Row>
      <Pagination className="pagination pagination-info">
                <PaginationItem>
                  <PaginationLink
                    aria-label="Previous"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <span aria-hidden={true}>
                      <i aria-hidden={true} className="tim-icons icon-double-left" />
                    </span>
                  </PaginationLink>
                </PaginationItem>
                {Array.from({ length: totalPages }).map((_, index) => (
                  <PaginationItem key={index} className={currentPage === index + 1 ? 'active' : ''}>
                    <PaginationLink
                      href="#pablo"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(index + 1);
                      }}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationLink
                    aria-label="Next"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <span aria-hidden={true}>
                      <i aria-hidden={true} className="tim-icons icon-double-right" />
                    </span>
                  </PaginationLink>
                </PaginationItem>
              </Pagination>
              </Container>
    </section>
  );
};

export default PollList;
