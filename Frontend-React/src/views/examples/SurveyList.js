import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from 'components/Navbars/Navbar.js';
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
      navigate(`/survey/${surveyId}`);
    } else {
      console.error('Survey ID is undefined.');
    }
  };

  const toggleFormModal = () => {
    setFormModal(!formModal);
  };

  const handleFormSubmit = async () => {
    try {
      await fetchSurveys();
      toggleFormModal();
      toast.success("Survey added successfully!", { autoClose: 3000 });
    } catch (error) {
      console.error('Error fetching surveys:', error.message);
      toast.error("Error adding survey.", { autoClose: 3000 });
    }
  };

  const handleSurveyAdded = (newSurvey) => {
    setSurveys([...surveys, newSurvey]);
  };

  return (
    <>
      <Navbar />
      <section className="section section-lg section-coins">
        <img
          alt="..."
          className="path"
          src={require('assets/img/path3.png')}
        />
        <Container>
          <Row>
            <Col md="6">
              <hr className="line-success" />
              <h1>
                Shape the Future{' '}
                <br />
                Take the<span className="text-success"> Survey</span>Path!
              </h1>
            </Col>
            <Col md="6" className="text-center">
              <Button className="btn-simple" color="success" onClick={toggleFormModal}>
                New Survey
              </Button>
            </Col>
          </Row>
          <Row className="justify-content-center">
            {surveys
              .slice((currentPage - 1) * 3, currentPage * 3)
              .map((survey) => (
                <Col md="4" key={survey.id}>
                  <Card className="card-coin card-plain">
                    <CardBody>
                      <Row>
                        <Col className="text-center" md="12">
                          <h4 className="text-success">{survey.titleSurvey}</h4>
                          <span>Survey</span>
                          <hr className="line-success" />
                        </Col>
                      </Row>
                      <Row>
                        <ListGroup>
                          <ListGroupItem>{survey.descriptionSurvey}</ListGroupItem>
                        </ListGroup>
                      </Row>
                    </CardBody>
                    <CardFooter className="text-center">
                      <Button
                        className="btn-simple"
                        color="success"
                        onClick={() => handleDetailsClick(survey.id, survey.titleSurvey)}
                      >
                        Create
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
        <AddSurveyForm isOpen={formModal} toggle={toggleFormModal} onSubmit={handleFormSubmit} onSurveyAdded={handleSurveyAdded}/>
        <ToastContainer />
      <Footer />
    </>
  ); 
};

export default SurveyList;

// AddSurveyForm component definition
const AddSurveyForm = ({ isOpen, toggle, onSubmit, onSurveyAdded }) => {
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
      window.alert("Survey added successfully!");
      onSurveyAdded(response.data); 
      toggle();
      onSubmit();
    } catch (error) {
      console.error('Error adding survey:', error.message);
    }
    toast.success("Survey added successfully!", { autoClose: 3000 });
  };

  return (
    <Modal  modalClassName="modal-black" isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>New Survey</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Input
              type="text"
              placeholder="Survey Title"
              value={titleSurvey}
              onChange={(e) => setTitleSurvey(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
          
        <Input
          type="textarea"
          placeholder="Survey Description"
          value={descriptionSurvey}
          onChange={(e) => setDescriptionSurvey(e.target.value)}
        />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
        <Button color="success" onClick={handleSubmit}>
          Add
        </Button>
      </ModalFooter>
    </Modal>
  );
};

