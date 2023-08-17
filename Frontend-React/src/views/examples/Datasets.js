import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../api/AuthContext';

import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Container,
} from 'reactstrap';

const FileList = () => {
  const [files, setFiles] = useState([]);
  const { authToken } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/auth/files');
      console.log('API Response:', response.data);
      setFiles(response.data);
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
    <div className="container mt-5">
      <div className="d-flex justify-content-start mb-3">
        <input
          type="file"
          id="fileInput"
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
        <Button
          color="primary"
          onClick={() => document.getElementById('fileInput').click()}
        >
          Add Datasets
        </Button>
      </div>
  
      <h2 className="text-center">Datasets </h2>
      <Row>
        {files.map((file, index) => (
          <Col md="4" key={index}>
            <Card className="mb-3" style={{ width: '370px', height: '150px' }}>
              <CardBody>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <CardTitle tag="h5">{file.name}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">
                      Type: {file.type}
                    </CardSubtitle>
                    <CardText>Size: {file.size}</CardText>
                  </div>
                  <Dropdown
                    isOpen={dropdownOpen[index]} 
                    toggle={() => toggleDropdown(index)} 
                  >
                    <DropdownToggle
                      color="default"
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
    </div>
  );
};

export default FileList;
