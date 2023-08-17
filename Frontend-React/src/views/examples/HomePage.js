import React from "react";
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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  CardSubtitle,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import PageHeader from "components/PageHeader/PageHeader.js";
import Footer from "components/Footer/Footer.js";
import SurveysList from "views/examples/SurveysList";
import PollList from "views/examples/PollList";
import Navbar from "components/Navbars/Navbar.js";
import Datasets from "views/examples/DatasetsPage.js"

export default function HomePage() {
    React.useEffect(() => {
      document.body.classList.toggle("index-page");
      // Specify how to clean up after this effect:
      return function cleanup() {
        document.body.classList.toggle("index-page");
      };
    }, []);
    return (
      <>
        <Navbar />
        <div className="wrapper">
          <PageHeader />
          <div className="main">
           <SurveysList />
          </div>
          <div className="main">
           <PollList />
          </div>
          <Footer />
        </div>
      </>
    );
  }