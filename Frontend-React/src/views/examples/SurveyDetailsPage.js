import React from 'react';
import { useParams } from 'react-router-dom';
import AddQuestionToSurvey from 'variables/AddQuestionToSurvey.js';
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  ListGroupItem,
  ListGroup,
  Container,
  Row,
  Col,
} from "reactstrap";


const SurveyDetailsPage = () => {
  const { surveyId } = useParams();
  console.log('Received surveyId:', surveyId);

  const [surveyDetails, setSurveyDetails] = useState({
    titleSurvey: '',
    descriptionSurvey: '',
  });

  useEffect(() => {
    // Make an API call to fetch survey details
    async function fetchSurveyDetails() {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/auth/get_surveys/${surveyId}`);
        const data = await response.json();

        // Update state with survey details
        setSurveyDetails(data);
      } catch (error) {
        console.error('Error fetching survey details:', error);
      }
    }

    fetchSurveyDetails();
  }, [surveyId]);
  
  return (
    <>
      <Navbar />
      <div className="wrapper">
        <section className="section section-lg section-coins">
          <img
            alt="..."
            className="path"
            src={require("assets/img/path3.png")}
          />
          <Container>
            <Row>
              <Col md="12">
                <Card className="card-coin card-plain big-card">
                  <CardHeader className="text-center">
                    <h3>Survey creation</h3>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col md="12">
                        <Card className="card-coin card-plain small-card">
                          <CardBody>
                          <h3 className="info-title">{surveyDetails.titleSurvey}</h3>
                            <hr className="line-warning" />
                            <p>{surveyDetails.descriptionSurvey}</p>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <Card className="card-coin card-plain small-card">
                          <CardBody>
                            <AddQuestionToSurvey surveyId={surveyId} />
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default SurveyDetailsPage;