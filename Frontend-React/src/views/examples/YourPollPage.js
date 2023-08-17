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
import { Question } from 'survey-react';
const YourPollPage = () => {
    const [userPolls, setUserPolls] = useState([]);
    const userId = localStorage.getItem('userId');
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
  
    const fetchUserPolls = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/auth/questionByUser/${userId}`);
        setUserPolls(response.data);
      } catch (error) {
        console.error('Error fetching user polls:', error.message);
      }
    };
  
    useEffect(() => {
      fetchUserPolls();
    }, []);

    const handleDetailsClick = (questionId) => {
        if (questionId !== undefined) {
          navigate(`/PollChoice/${questionId}`);
        } else {
          console.error('Survey ID is undefined.');
        }
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
            {userPolls
              .slice((currentPage - 1) * 3, currentPage * 3)
              .map((poll) => (
                <Col key={poll.idQuestion}>
                  <Card className="card-coin" style={{ background: 'transparent', border: 'none', boxShadow: 'none' }}>
                    <CardBody>
                     <div className="info">
                      <div className="icon icon-info">
                        <i className="tim-icons icon-paper" />
                      </div>
                    <h4 className="info-title">{poll.questionText}</h4>
                      
                      </div>
                    </CardBody>
                    <CardFooter className="text-left">
                      <Button
                        className="btn-simple"
                        color="info"
                        onClick={() => handleDetailsClick(poll.idQuestion)}
                      >
                        Responses
                      </Button>
                      <Button
                    className="btn-simple"
                    color="danger"
                   
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

export default YourPollPage;


