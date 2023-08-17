import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../api/AuthContext';
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

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footer/Footer.js";
import Datasets from "views/examples/Datasets.js"
import bigChartData from "variables/charts.js";

  const FileList = () => {
    const [files, setFiles] = useState([]);
    const userId = localStorage.getItem('userId');
    const { authToken } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
  
    useEffect(() => {
      document.body.classList.toggle("landing-page");
      return function cleanup() {
        document.body.classList.toggle("landing-page");
      };
    }, []);
  
    useEffect(() => {
      fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/v1/auth/files/user/${userId}`);
          console.log('API Response:', response.data);
          setFiles(response.data);
          const filesPerPage = 2;
          setTotalPages(Math.ceil(response.data.length / filesPerPage));
        } catch (error) {
          console.error('Error fetching files:', error.message);
        }
      };
      

  const handleDownload = async (fileId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/auth/download/${fileId}`, {
        responseType: 'blob',
      });
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', files.find((file) => file.id === fileId).name);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading file:', error.message);
    }
  };

  const handleDelete = async (fileId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/auth/delete_file/${fileId}`);
      setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
    } catch (error) {
      console.error('Error deleting file:', error.message);
    }
  };

  const handleFileUpload = async (e) => {
    console.log("Auth Token in handleFileUpload:", authToken); 
  
    const userId = localStorage.getItem('userId'); 
  
    if (!userId) {
      console.error("User ID not found in localStorage.");
      return;
    }
  
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);
  
    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/auth/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log('File uploaded:', response.data);
      fetchFiles();
    } catch (error) {
      console.error('File upload failed:', error.message);
    }
  };

  const toggleDropdown = (index) => {
    setDropdownOpen((prevState) => {
      const newState = [...prevState];
      newState[index] = !prevState[index];
      return newState;
    });
  };
  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
        <div className="page-header">
          <img
            alt="..."
            className="path"
            src={require("assets/img/blob.png")}
          />
          <img
            alt="..."
            className="path2"
            src={require("assets/img/path2.png")}
          />
          
          <img
            alt="..."
            className="shapes wave"
            src={require("assets/img/waves.png")}
          />
          <img
            alt="..."
            className="shapes squares"
            src={require("assets/img/patrat.png")}
          />
          <img
            alt="..."
            className="shapes circle"
            src={require("assets/img/cercuri.png")}
          />
          <div className="content-center">
            <Row className="row-grid justify-content-between align-items-center text-left">
              
              <Col lg="4" md="6">
              <Row>
              {files
                    .slice((currentPage - 1) * 2, currentPage * 2) 
                    .map((file, index) => (
                      <Col md="12" key={index}>
                      <Card className="mb-3" style={{ width: '500px', height: '150px' }}>
                      <CardBody>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <CardTitle tag="h5">{file.name}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">
                      Type: {file.type}
                    </CardSubtitle>
                    <CardText>Size: {file.size}MB</CardText>
                  </div>
                  <Dropdown
                    isOpen={dropdownOpen[index]} 
                    toggle={() => toggleDropdown(index)} 
                  >
                    <DropdownToggle
                      color="warning"
                      data-toggle="dropdown"
                      nav
                      direction="left"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i aria-hidden={true} className="tim-icons icon-align-center" />
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem onClick={() => handleDownload(file.id)}>Download</DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem onClick={() => handleDelete(file.id)}>Delete</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </CardBody>
                      </Card>
                    </Col>
                  ))}
                </Row>
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
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default FileList;