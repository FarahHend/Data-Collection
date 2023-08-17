
import React, { useState } from "react";
import classnames from "classnames";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

export default function RegisterPage() {
  const [squares1to6, setSquares1to6] = useState("");
  const [squares7and8, setSquares7and8] = useState("");
  const [fullNameFocus, setFullNameFocus] = useState(false);
  const [fullNameFocus1, setFullNameFocus1] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [roleFocus, setRoleFocus] = useState(false); 
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const registerData = {
      firstname: form["firstname"].value,
      lastname: form["lastname"].value,
      email: form["email"].value,
      password: form["password"].value,
      role: "USER",
    };

    try {
      const response = await register(registerData);
      //console.log("Registration successful:", response);
      //setRegistrationSuccess(true);
      toast.success("Account created successfully!", { autoClose: 3000 });
     // window.alert("Account created successfully!");
    } catch (error) {
      console.error("Registration failed:", error.message);

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
            
              <Row>
                <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
                  <div
                    
                  />
                  <div
                
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
                       style={{ textAlign: "right", marginRight: "4.3cm", color: "#38226E" }}
                       tag="h6"
                             >
                             Sign Up
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <form className="form" onSubmit={handleRegister}>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": fullNameFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-single-02" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="First Name"
                            type="text"
                            onFocus={(e) => setFullNameFocus(true)}
                            onBlur={(e) => setFullNameFocus(false)}
                            name="firstname"
                          />
                        </InputGroup>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": fullNameFocus1,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-single-02" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Last Name"
                            type="text"
                            onFocus={(e) => setFullNameFocus1(true)}
                            onBlur={(e) => setFullNameFocus1(false)}
                            name="lastname"
                          />
                        </InputGroup>
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
                        <Col lg="12" >
                          <Button className="btn-round" color="warning" size="lg" type="submit">
                            Register
                          </Button>
                          </Col>
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
      <ToastContainer />
    </>
  );
}