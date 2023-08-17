import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Pagination,    
  PaginationItem,
  PaginationLink,
} from 'reactstrap';

const SurveyList = () => {
  const [surveys, setSurveys] = useState([]);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/auth/surveys`);
        console.log('API Response:', response.data);
        setSurveys(response.data);
        const surveysPerPage = 4;
        setTotalPages(Math.ceil(response.data.length / surveysPerPage));
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
      navigate(`/surveys/${surveyId}`);
    } else {
      console.error('Survey ID is undefined.');
    }
  };
  return (
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
           {surveys
              .slice((currentPage - 1) * 4, currentPage * 4)
              .map((survey) => (
              <Col lg="6" key={survey.id} className="mb-4">
                <div className="info border rounded p-2">
                  <div>
                    <div className="icon icon-warning">
                      <i className="tim-icons icon-puzzle-10" />
                    </div>
                    <h3 className="info-title">{survey.titleSurvey}</h3>
                    <hr className="line-warning" />
                    <p>{survey.descriptionSurvey}</p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <i className="tim-icons icon-calendar-60" style={{ marginRight: '5px' }} />
                        <p style={{ marginBottom: '0' }}>{survey.createdAt}</p>
                      </div>
                    </div>
                    <div className="btn-wrapper mb-1">
                      <p className="category text-warning d-inline">
                        Participate
                      </p>
                      <Button
                        className="btn-link"
                        color="warning"
                        href="#pablo"
                        onClick={() => handleDetailsClick(survey.id, survey.titleSurvey)}
                        size="sm"
                      >
                        <i className="tim-icons icon-minimal-right" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
          <Row className="justify-content-center mt-3">
            <Col>
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
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default SurveyList;