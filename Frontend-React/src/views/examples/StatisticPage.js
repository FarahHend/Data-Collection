import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import {
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
} from "reactstrap";
import Footer from "components/Footer/Footer.js";
import Navbar from "components/Navbars/Navbar.js";

const SurveyList = () => {
  const { surveyId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState({});
  const [userChoices, setUserChoices] = useState([]);

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
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/auth/getsurvey/${surveyId}`);
        console.log('Updated Questions List:', response.data);
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error.message);
      }
    };

    const fetchUserChoices = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/auth/surveys/${surveyId}/user_choices`
        );
        console.log('API Response for User Choices:', response.data); 
        setUserChoices(response.data);
      } catch (error) {
        console.error('Error fetching user choices:', error.message);
      }
    };

    fetchQuestions();
    fetchUserChoices();
  }, [surveyId]);

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
  
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      width: 150,
      height: 150,
      plugins: {
        legend: {
          position: 'right', 
        },
      },
    };
  
    return { data: chartData, options: chartOptions };
  };
  
  
  return (

                <Col md="12">
                 {questions.map((question) => (
  <Card key={question.idQuestion} >
    <CardBody>
      <CardTitle tag="h3">{question.questionText}</CardTitle>
      {options[question.idQuestion]?.map((option) => (
        <div key={option.idOption}>
        </div>
      ))}
      <Row><Col md="4"></Col>
      <Col md="4">
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
        <Pie
          data={generateChartData(question.idQuestion).data}
          width={300} 
          height={300}
        />
      </div>
      </Col>
      </Row>
    </CardBody>
  </Card>
))}

                 
                </Col>
             
  );
};

export default SurveyList;
