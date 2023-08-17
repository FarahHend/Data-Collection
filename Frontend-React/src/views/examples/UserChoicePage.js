import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  CardText,
  CardTitle,
  Row,
  Col,
  Table,
  TabContent,
  TabPane,
  UncontrolledTooltip,
  UncontrolledCarousel,
  CardFooter,
  NavItem,
  NavLink,
  Nav,
} from "reactstrap";
import classnames from "classnames";
import Footer from "components/Footer/Footer.js";
import Navbar from "components/Navbars/Navbar.js";
import StatisticPage from "views/examples/StatisticPage.js";
import { Pie } from 'react-chartjs-2';

const SurveyList = () => {
  const { surveyId } = useParams();
  const [surveys, setSurveys] = useState([]);
  const [iconTabs, setIconsTabs] = React.useState(1);
  const [textTabs, setTextTabs] = React.useState(4);
  const [participantCount, setParticipantCount] = useState(0);
  const [userChoices, setUserChoices] = useState([]);
  const [optionCounts, setOptionCounts] = useState({});
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState({});
  

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
    const fetchSurveys = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/auth/surveys/${surveyId}/user_choices`);
        console.log('API Response 1:', response.data);
        setSurveys(response.data);
      } catch (error) {
        console.error('Error fetching surveys:', error.message);
      }
    };

    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/auth/getsurvey/${surveyId}`);
        console.log('Updated Questions List:', response.data);
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error.message);
      }
    };

    const fetchParticipantCount = async () => {
      try {
        console.log('Fetching participant count...');
        const response = await axios.get(`http://localhost:8080/api/v1/auth/surveys/${surveyId}/participants`);
        console.log('Participant count response:', response.data);
        const count = response.data;
        setParticipantCount(count);
        console.log('Participant count set:', count);
      } catch (error) {
        console.error('Error fetching participant count:', error.message);
      }
    };
    

    fetchQuestions();
    fetchSurveys();
    fetchParticipantCount();
  }, [surveyId]);

  const handleDownloadCSV = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/auth/surveys/${surveyId}/user_choices/export_csv`, {
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'user_choices.csv';
      link.click();

      window.URL.revokeObjectURL(url);
      link.remove();
    } catch (error) {
      console.error('Error downloading CSV:', error.message);
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

  const getOptionUserCount = (questionId, optionId) => {
    const usersCount = new Set();

    userChoices.forEach(choice => {
      if (choice.questionId === questionId && choice.optionId === optionId) {
        console.log(`Found user choice: questionId=${questionId}, optionId=${optionId}, userId=${choice.userId}`);
        usersCount.add(choice.userId);
      }
    });
  
    console.log(`User count for questionId=${questionId}, optionId=${optionId}:`, usersCount.size);
  
    return usersCount.size;
  };
  
  const generateChartData = (questionId) => {
    const optionsData = options[questionId] || [];
    const chartData = {
      labels: optionsData.map((option) => option.optionText),
      datasets: [
        {
          data: optionsData.map((option) => getOptionUserCount(questionId, option.idOption)),
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
          ],
        },
      ],
    };
  
   
  
    return { data: chartData};
  };

  return (
    <>
    <Navbar />
    <div className="wrapper">
        <div className="page-header">
          <img
            alt="..."
            className="dots"
            src={require("assets/img/dots.png")}
          />
          <img
            alt="..."
            className="path"
            src={require("assets/img/path4.png")}
          />
           <section className="section section-lg section-coins">
          <Container>
            <Row>
              <Col md="12">
              <Col className="ml-auto mr-auto" md="10" xl="12">
            <div className="mb-3">
            <small className="text-uppercase font-weight-bold">
            <span className="text-danger">  {participantCount} people</span> participated in this survey
              </small>
            </div>
          </Col>
                <Card className="big-card" style={{ height: '500px', overflowY: 'auto' }} >
                <CardHeader>
                <Nav className="nav-tabs-info" role="tablist" tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: iconTabs === 1,
                      })}
                      onClick={(e) => setIconsTabs(1)}
                      href="#Summary"
                    >
                      <i className="tim-icons icon-spaceship" />
                      Summary
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: iconTabs === 2,
                      })}
                      onClick={(e) => setIconsTabs(2)}
                      href="#Statistics"
                    >
                      <i className="tim-icons icon-chart-pie-36" />
                      Statistics
                    </NavLink>
                  </NavItem>
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
                      <th>Question</th>
                      <th>Response</th>
                    </tr>
                  </thead>
                  <tbody>
                    {surveys.map((survey, index) => (
                      <tr key={index}>
                         <td><i className="tim-icons icon-single-02" />          {survey.userName}</td>
                        <td>{survey.questionText}</td>
                        <td>{survey.optionText}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Row>
                  <Col md="8">
                    </Col>
                    <Col md="4">
                <Button className="btn-simple" color="neutral" onClick={handleDownloadCSV}> Download CSV  <i className="tim-icons icon-cloud-download-93" /></Button>
                </Col>
                </Row>
                </TabPane>
                </TabContent>
                <TabContent className="tab-space" activeTab={"link" + iconTabs}>
                <TabPane tabId="link2">
                   <StatisticPage />
                   
                  </TabPane>
                </TabContent>
                </CardBody>
                <CardFooter>
                </CardFooter>
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
      {questions.map((question) => (
                  <div key={question.idQuestion}>
                    <h3>{question.questionText}</h3>
                    {options[question.idQuestion]?.map((option) => (
                      <div key={option.idOption}>
                        <p>Option: {option.optionText}</p>
                      </div>
                    ))}
                    <div>
                    <Pie data={generateChartData(question.idQuestion).data} options={generateChartData(question.idQuestion).options} />

                    </div>
                  </div>
                ))}
    </>
  );
};

export default SurveyList;

