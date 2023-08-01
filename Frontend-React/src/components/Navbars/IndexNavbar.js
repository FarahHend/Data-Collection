/*!

=========================================================
* BLK Design System React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import axios from 'axios';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../api/AuthContext';
import { getUserIdFromToken } from '../../api/AuthUtils'; 
import { toast } from 'react-toastify';

// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

export default function IndexNavbar() {
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [collapseOut, setCollapseOut] = React.useState("");
  const [color, setColor] = React.useState("navbar-transparent");
  React.useEffect(() => {
    window.addEventListener("scroll", changeColor);
    return function cleanup() {
      window.removeEventListener("scroll", changeColor);
    };
  }, []);
  const changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      setColor("bg-info");
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      setColor("navbar-transparent");
    }
  };
  const toggleCollapse = () => {
    document.documentElement.classList.toggle("nav-open");
    setCollapseOpen(!collapseOpen);
  };
  const onCollapseExiting = () => {
    setCollapseOut("collapsing-out");
  };
  const onCollapseExited = () => {
    setCollapseOut("");
  };
  const scrollToDownload = () => {
    document
      .getElementById("download-section")
      .scrollIntoView({ behavior: "smooth" });
  };

  const { authToken, setAuthToken } = useContext(AuthContext); 

  const handleFileUpload = async (e) => {
    console.log("Auth Token in handleFileUpload:", authToken); // Add this line to check the value
  
    const userId = localStorage.getItem('userId'); // Retrieve the userId from localStorage
  
    if (!userId) {
      console.error("User ID not found in localStorage.");
      return;
    }
  
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId); // Append the userId to the formData
  
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
    } catch (error) {
      console.error('File upload failed:', error.message);
    }
  };
  

  const handleLogout = async () => {
    try {
      // Make a POST request to the logout endpoint
      const response = await axios.post('/api/v1/auth/logout');
      console.log(response.data); // This will print the message from the server

      // Show a success message to the user (e.g., using a toast notification)
      toast.success('Logout successful!'); // Assuming you're using the toast library

      // Clear the auth token and remove it from localStorage
      setAuthToken(null);
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Logout failed:', error.message);
      // Handle the logout error (e.g., show an error message)
      // Example: toast.error('Logout failed: ' + error.message);
    }
  };

  return (
    <Navbar className={"fixed-top " + color} color-on-scroll="100" expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand to="/" tag={Link} id="navbar-brand">
            Data
            <span>Hub • </span>
          </NavbarBrand>
          {/* ... (existing code) */}
        </div>
        <Collapse
          className={"justify-content-end " + collapseOut}
          navbar
          isOpen={collapseOpen}
          onExiting={onCollapseExiting}
          onExited={onCollapseExited}
        >
          <div className="navbar-collapse-header">
            {/* ... (existing code) */}
          </div>
          <Nav navbar>
            {/* ... (existing code) */}
            <NavItem>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />
              <Button
                className="nav-link d-none d-lg-block"
                color="default"
                onClick={() => document.getElementById("fileInput").click()}
              >
                <i className="tim-icons icon-cloud-upload-94" /> Upload
              </Button>
            </NavItem>
  <NavItem>
    {/* Add the logout button */}
    <Button
      className="nav-link d-none d-lg-block"
      color="default"
      onClick={handleLogout}
    >
      Logout
    </Button>
  </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}