import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from 'components/Navbars/Navbar.js';
import Footer from 'components/Footer/Footer.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OptionForm from 'views/examples/OptionPage.js'; 
import {
  Button,
  Card,
  Label,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardText,
  ListGroupItem,
  ListGroup,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
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

const PollList = () => {
  const [surveys, setSurveys] = useState([]);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState('ONE_CHOICE_TYPE');
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  //const [formModal, setFormModal] = useState(false);
  const [addQuestionFormModal, setAddQuestionFormModal] = useState(false);
  const [addOptionFormModal, setAddOptionFormModal] = useState(false);
  const [options, setOptions] = useState([]);
  const [optionText, setOptionText] = useState('');
  const [questionId, setQuestionId] = useState(null);

  //const { questionId } = useParams();

  const fetchSurveys = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/auth/questionByUser/${userId}`);
      console.log('API Response:', response.data);
  
      const surveysWithLoadedOptions = await Promise.all(
        response.data.map(async (question) => {
          const optionsResponse = await axios.get(`http://localhost:8080/api/v1/auth/question/${question.idQuestion}`);
          return {
            ...question,
            options: optionsResponse.data || [],
          };
        })
      );
  
      setSurveys(surveysWithLoadedOptions);
  
      const surveysPerPage = 2;
      setTotalPages(Math.ceil(surveysWithLoadedOptions.length / surveysPerPage));
    } catch (error) {
      console.error('Error fetching surveys:', error.message);
    }
  };
  

  const handleViewOptionsClick = (questionId) => {
    navigate(`/option/${questionId}`);
  };


  const handleDeleteOption = async (optionId) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/v1/auth/deleteoption/${optionId}`);
      console.log('Option deleted successfully');
      const updatedOptions = options.filter((option) => option.idOption !== optionId);
      setOptions(updatedOptions);
    } catch (error) {
      console.error('Error deleting option:', error.message);
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
      fetchSurveys();
    } catch (error) {
      console.error('Error deleting question:', error.message);
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

  const toggleAddQuestionFormModal = () => {
    setAddQuestionFormModal(!addQuestionFormModal);
  };

  const toggleAddOptionFormModal = (questionId) => {
    setAddOptionFormModal(!addOptionFormModal);
    setQuestionId(questionId);
  };
  
  const handleFormSubmit = async () => {
    try {
      await fetchSurveys();
      toggleAddQuestionFormModal();
      toast.success("Question added successfully!", { autoClose: 3000 });
    } catch (error) {
      console.error('Error fetching surveys:', error.message);
      toast.error("Error adding survey.", { autoClose: 3000 });
    }
  };

  const fetchOptionsForQuestion = async (questionId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/auth/question/${questionId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching options for question:', error.message);
      return [];
    }
  };

  useEffect(() => {
    if (userId) {
      fetchSurveys();
    }
  }, [userId]);

 
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
              <hr className="line-info" />
              <h1>
              Your Voice, Your Choice:{' '}
                <br />
                Shape the Conversation <span className="text-info"> Polls!</span>
              </h1>
            </Col>
            <Col md="6" className="text-center">
              <Button className="btn-simple" color="info" onClick={toggleAddQuestionFormModal}>
                New Question
              </Button>
            </Col>
          </Row>
          <Row className="justify-content-center">
          {surveys
  .slice((currentPage - 1) * 2, currentPage * 2)
  .map((question) => (
    <Col md="6" key={question.idQuestion}>
      <Card className="card-coin card-plain" style={{ height: '250px' }}>
        <CardBody>
          <Row>
            <Col className="text-center" md="12">
            <span>Poll</span>
            </Col>
            <Col md="12">
              <h4 className="text-info">{question.questionText}</h4>
              <div>
                {question.options.map((option) => (
                  <FormGroup key={option.idOption} check className="form-check-radio">
                  <Label check>
                    <Input
                      type="radio"
                      name={`question_${questionId}_options`}
                      value={option.idOption}
                    />
                    <span className="form-check-sign" />
                    {option.optionText}
                  </Label>
                </FormGroup>
                ))}
              </div>
            </Col>
          </Row>
        </CardBody>
        <CardFooter className="text-center">
          <Button
            className="btn-simple"
            color="info"
            onClick={() => toggleAddOptionFormModal(question.idQuestion)}
          >
            Add Option
          </Button>
          <Button
            className="btn-simple"
            color="danger"
            onClick={() => handleDeleteQuestion(question.idQuestion)}
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
      <AddQuestionForm
        isOpen={addQuestionFormModal}
        toggle={toggleAddQuestionFormModal}
        onSubmit={handleFormSubmit}
        questionType={questionType}
      />
      <AddOptionForm
  isOpen={addOptionFormModal}
  questionId={questionId}
  setQuestionId={setQuestionId}
  toggle={toggleAddOptionFormModal}
  onSubmit={handleFormSubmit} 
  questionType={questionType}
/>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default PollList;

const AddQuestionForm = ({ isOpen, toggle, onSubmit }) => {
  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState('ONE_CHOICE_TYPE');
  const [dropdownOpen, setDropdownOpen] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem('userId');

    if (!userId) {
      console.error("User ID not found in localStorage.");
      return;
    }

    const questionData = {
      questionText,
      questionType,
      user: {
        id_user: userId,
      },
    };

    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/addquestion', questionData, {
        params: { userId },
      });
      console.log('Question added successfully:', response.data);
      window.alert("Question added successfully!");
      toggle();
      onSubmit();
    } catch (error) {
      console.error('Error adding question:', error.message);
    }
    toast.success("Question added successfully!", { autoClose: 3000 });
  };

  return (
    <Modal modalClassName="modal-black" isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Question</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Input
              type="text"
              placeholder="Question Text"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
          <Dropdown isOpen={dropdownOpen} toggle={() => setDropdownOpen(!dropdownOpen)}>
                  <DropdownToggle color="warning" nav>
                  One Choice Type <i className="fa fa-caret-down" />
                  </DropdownToggle>
                  <DropdownMenu >
                    <DropdownItem onClick={() => setQuestionType('ONE_CHOICE_TYPE')}>
                      One Choice Type
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
        <Button color="success" type="submit" onClick={handleSubmit}>
          Add
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const AddOptionForm = ({ isOpen, toggle, onSubmit, questionId }) => {
  const [optionText, setOptionText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const optionData = {
      optionText,
      question: {
        idQuestion: questionId,
      },
    };

    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/addoption', optionData);
      console.log('Option Data:', optionData);
      console.log('Option added successfully:', response.data);

      setOptionText('');
      onSubmit();
    } catch (error) {
      console.error('Error adding option:', error.message);
    }
  };

  return (
    <Modal modalClassName="modal-black" isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Option</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Input
              type="text"
              placeholder="Option Text"
              value={optionText}
              onChange={(e) => setOptionText(e.target.value)}
              required
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
        <Button color="success" type="submit" onClick={handleSubmit}>
            Add 
          </Button>
      </ModalFooter>
    </Modal>
  );
};
