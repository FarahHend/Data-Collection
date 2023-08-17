import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import IndexNavbar from 'components/Navbars/IndexNavbar.js';
import Footer from 'components/Footer/Footer.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardText,
  ListGroupItem,
  ListGroup,
  Container,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
} from 'reactstrap';

const SurveyList = () => {
  const [surveys, setSurveys] = useState([]);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [formModal, setFormModal] = useState(false);

  const fetchSurveys = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/auth/user/${userId}`);
      console.log('API Response:', response.data);
      setSurveys(response.data);
      const surveysPerPage = 3;
      setTotalPages(Math.ceil(response.data.length / surveysPerPage));
    } catch (error) {
      console.error('Error fetching surveys:', error.message);
    }
  };

  const handleDeleteSurvey = async (surveyId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/auth/delete/survey/${surveyId}`);
      toast.success("Survey deleted successfully!", { autoClose: 3000 });
      await fetchSurveys();
    } catch (error) {
      console.error('Error deleting survey:', error.message);
      toast.error("Error deleting survey.", { autoClose: 3000 });
    }
  };

  useEffect(() => {
    document.body.classList.toggle('landing-page');
    return function cleanup() {
      document.body.classList.toggle('landing-page');
    };
  }, []);

  useEffect(() => {
    if (userId) {
      fetchSurveys();
    }
  }, [userId]);

  const handleDetailsClick = (surveyId, surveyTitle) => {
    if (surveyId !== undefined) {
      navigate(`/UserChoice/${surveyId}`);
    } else {
      console.error('Survey ID is undefined.');
    }
  };

  const toggleFormModal = () => {
    setFormModal(!formModal);
  };

 

  const handleSurveyAdded = (newSurvey) => {
    setSurveys([...surveys, newSurvey]);
  };

  return (
    <>
      <IndexNavbar />
      <section className="section section-lg section-coins">
        <img
          alt="..."
          className="path"
          src={require('assets/img/path3.png')}
        />
        <Container>
          
            <Container>
            <Row className="justify-content-center">
              <Col lg="12">

                  <Col >
                  <Row >
            {surveys
              .slice((currentPage - 1) * 3, currentPage * 3)
              .map((survey) => (
                <Col  key={survey.id}>
                  <Card className="card-coin" style={{ background: 'transparent', border: 'none', boxShadow: 'none' }}>
                    <CardBody>
                     <div className="info">
                      <div className="icon icon-info">
                        <i className="tim-icons icon-paper" />
                      </div>
                    <h4 className="info-title">{survey.titleSurvey}</h4>
                      <p>{survey.descriptionSurvey}</p>
                      </div>
                    </CardBody>
                    <CardFooter className="text-left">
                      <Button
                        className="btn-simple"
                        color="info"
                        onClick={() => handleDetailsClick(survey.id, survey.titleSurvey)}
                      >
                        Responses
                      </Button>
                      <Button
                    className="btn-simple"
                    color="danger"
                    onClick={() => handleDeleteSurvey(survey.id)}
                  >
                    Delete
                  </Button>
                    </CardFooter>
                  </Card>
                </Col>
              ))}
          </Row>
                  </Col>
                
              </Col>
            </Row>
          </Container>
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
        </Container>
      </section>
      <Footer />
    </>
  ); 
};

export default SurveyList;


