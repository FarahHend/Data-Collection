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
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss";
import "assets/demo/demo.css";

import Index from "views/Index.js";
import LandingPage from "views/examples/LandingPage.js";
import RegisterPage from "views/examples/RegisterPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import LoginPage from "views/examples/LoginPage.js";
import Polls from "views/examples/Polls.js";
import HomePage from "views/examples/HomePage.js";
import { login, refreshToken, register } from 'api/Authentication.js';
import { AuthProvider } from './api/AuthContext';
import UploadPage from 'components/Navbars/IndexNavbar.js';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
  <AuthProvider>
    <Routes>
    <Route path="/Polls-page" element={<Polls />} />
      <Route path="/register-page" element={<RegisterPage />} />
      <Route path="/login-page" element={<LoginPage />} />
      <Route path="/landing-page" element={<LandingPage />} />
      <Route path="/components" element={<Index />} />
      <Route path="/home-page" element={<HomePage />} />
      <Route path="/profile-page" element={<ProfilePage />} />
      <Route path="/upload" element={<UploadPage />} />
      
      <Route path="*" element={<Navigate to="/register-page" replace />} />
    </Routes>
    </AuthProvider>
  </BrowserRouter>
);
