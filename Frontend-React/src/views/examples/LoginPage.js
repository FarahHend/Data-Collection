import React, { useState , useContext } from 'react';
import classnames from "classnames";
import { AuthContext } from '../../api/AuthContext';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  UncontrolledAlert,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.js";
import { login, refreshToken, register } from 'api/Authentication.js';
import { useNavigate } from 'react-router-dom';
export default function LoginPage() {
  const [squares1to6, setSquares1to6] = useState("");
  const [squares7and8, setSquares7and8] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();
  
  const { handlelogin } = useContext(AuthContext);
  const { setAuthToken } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const loginData = {

      email: form["email"].value,
      password: form["password"].value,
     
    };

    try {
      const response = await login(loginData);
      //console.log("Login successful:", response);

      const userId = response.user_id;
      //console.log("User ID:", userId);
      localStorage.setItem('userId', userId);

      handlelogin(response.access_token); 
  
      //console.log("Login successful:", response);
      setRegistrationSuccess(true);
      //window.alert("Login with success!");
      navigate(`/home-page`);
    } catch (error) {
      console.error("Login failed:", error.message);
      
    }
  };

  React.useEffect(() => {
    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", followCursor);

    return function cleanup() {
      document.body.classList.toggle("register-page");
      document.documentElement.removeEventListener(
        "mousemove",
        followCursor
      );
    };
  }, []);

  const followCursor = (event) => {
    let posX = event.clientX - window.innerWidth / 2;
    let posY = event.clientY - window.innerWidth / 6;
    setSquares1to6(
      "perspective(500px) rotateY(" +
        posX * 0.05 +
        "deg) rotateX(" +
        posY * -0.05 +
        "deg)"
    );
    setSquares7and8(
      "perspective(500px) rotateY(" +
        posX * 0.02 +
        "deg) rotateX(" +
        posY * -0.02 +
        "deg)"
    );
  };

  return (
      <>
      <ExamplesNavbar />
      <div className="wrapper">
        <div className="page-header">
          <div className="page-header-image" />
          <div className="content">
            <Container>
            {registrationSuccess && (
                        <UncontrolledAlert className="alert-with-icon" color="success"
                        style={{ width: '400px', height: '80px',marginLeft: '900px'}}>
                          <span data-notify="icon" className="tim-icons icon-bell-55" />
                          <span>
                            <b>Well done! -</b>
                            Login with success!
                          </span>
                        </UncontrolledAlert>
                      )}
              <Row>
                <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
                  <div
                    className="square square-7"
                    id="square7"
                    style={{ transform: squares7and8 }}
                  />
                  <div
                    className="square square-8"
                    id="square8"
                    style={{ transform: squares7and8 }}
                  />
                  <Card className="card-register">
                    <CardHeader>
                      <CardImg
                        alt="..."
                        src={require("assets/img/pastel-toile-de-fond-abstraite-pour-technologie-banniere-vectoriel.jpg")}
                        height="330"
                        width="300"
                      />
                      <CardTitle
                        style={{ textAlign: "right", marginRight: "5cm", color: "#38226E" }}
                        tag="h4"
                      >
                        Sign In
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <form className="form" onSubmit={handleLogin}>
                       
                        <InputGroup
                          className={classnames({
                            "input-group-focus": emailFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-email-85" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Email"
                            type="text"
                            onFocus={(e) => setEmailFocus(true)}
                            onBlur={(e) => setEmailFocus(false)}
                            name="email"
                          />
                        </InputGroup>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": passwordFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-lock-circle" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Password"
                            type="password"
                            onFocus={(e) => setPasswordFocus(true)}
                            onBlur={(e) => setPasswordFocus(false)}
                            name="password"
                          />
                        </InputGroup>
                        
                        
                        
                         
                        <div className="text-center">
                          <Button className="btn-round" color="warning" size="lg" type="submit">
                            Get Started
                          </Button>
                        </div>
                      </form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <div className="register-bg" />
              <div
                className="square square-1"
                id="square1"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-2"
                id="square2"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-3"
                id="square3"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-4"
                id="square4"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-5"
                id="square5"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-6"
                id="square6"
                style={{ transform: squares1to6 }}
              />
            </Container>
          </div>
        </div>
      </div>
    </>
  );
}