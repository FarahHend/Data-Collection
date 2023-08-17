import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Table,
  Container,
  Row,
  Col,
} from 'reactstrap';
import Navbar from 'components/Navbars/IndexNavbar.js';
import Footer from 'components/Footer/Footer.js';
import { Pie } from 'react-chartjs-2';

const ChoiceList = () => {
  const [iconTabs, setIconsTabs] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState({});
  const { questionId } = useParams();
  const userId = localStorage.getItem('userId');

  const fetchPollChoices = async (questionId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/auth/pollchoices/by-question/${questionId}`);
      const pollChoices = response.data;
      setOptions((prevOptions) => ({
        ...prevOptions,
        [questionId]: pollChoices,
      }));
      console.log('Fetched poll choices:', pollChoices);
    } catch (error) {
      console.error('Error fetching poll choices:', error.message);
    }
  };

  useEffect(() => {
    fetchPollChoices(questionId);
  }, [questionId]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/auth/questionByUser/${userId}`);
        setQuestions(response.data);
        console.log('Fetched questions:', response.data);

        // Fetch poll choices for each question
        response.data.forEach((question) => {
          fetchPollChoices(question.idQuestion);
        });
      } catch (error) {
        console.error('Error fetching questions:', error.message);
      }
    };

    fetchQuestions();
  }, []);

  const handleDownloadCSV = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/auth/pollchoices/csv/by-question/${questionId}`, {
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `poll_choices_${questionId}.csv`;
      a.click();
    } catch (error) {
      console.error('Error downloading CSV:', error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="wrapper">
        <div className="page-header">
          {/* ... */}
          <section className="section section-lg section-coins">
            {/* ... */}
            <Container>
              <Row>
                <Col md="12">
                  <Col className="ml-auto mr-auto" md="10" xl="12">
                    {/* ... */}
                  </Col>
                  <Card className="big-card" style={{ height: '500px', overflowY: 'auto' }}>
                    <CardHeader>
                      <Nav className="nav-tabs-info" role="tablist" tabs>
                    
                      </Nav>
                    </CardHeader>
                    <CardBody>
                      <Row>
                        <Col md="12">
                          <CardBody>
                            <TabContent className="tab-space" activeTab={"link" + iconTabs}>
                              <TabPane tabId="link1">
                                <Table>
                                  <thead>
                                    <tr>
                                      <th>Name</th>
                                     
                                      <th>Response</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {options[questionId]?.map((option, optionIndex) => (
                                      <tr key={optionIndex}>
                                        <td>
                                          <i className="tim-icons icon-single-02" /> {option.userName}
                                        </td>
                                        <td>{option.optionText}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </Table>
                                <Row>
                                  <Col md="8"></Col>
                                  <Col md="4">
                                    <Button className="btn-simple" color="neutral" onClick={handleDownloadCSV}>
                                      Download CSV <i className="tim-icons icon-cloud-download-93" />
                                    </Button>
                                  </Col>
                                </Row>
                              </TabPane>
                              {/* ... */}
                            </TabContent>
                          </CardBody>
                          <CardFooter></CardFooter>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
        </div>
      </div>
      <Footer />
      {/* ... */}
    </>
  );
};

export default ChoiceList;
