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
import SurveyPage from 'views/examples/Survey.js';
import SurveyList from 'views/examples/SurveyList.js';
import SurveyDetailsPage from 'views/examples/SurveyDetailsPage.js'
import SurveysList from 'views/examples/SurveysList.js';
import SurveyDetails from 'views/examples/SurveyDetails.js'
import UserChoicePage from 'views/examples/UserChoicePage.js'
import DatasetsPage from 'views/examples/DatasetsPage.js'
import YourSurveysPage from 'views/examples/YourSurveysPage.js'
import YourDatasetsPage from 'views/examples/YourDatasetsPage.js'
import StatisticPage from 'views/examples/StatisticPage.js'
import OptionForm  from 'views/examples/OptionPage.js';
import YourPollPage from 'views/examples/YourPollPage.js'
import PollChoice from 'views/examples/PollChoice.js'

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
      <Route path="/Survey" element={<SurveyPage />} />
      <Route path="/SurveyList" element={<SurveyList />} />
      <Route path="/survey/:surveyId" element={<SurveyDetailsPage />} />
      <Route path="/surveys" element={<SurveysList />} />
      <Route path="/surveys/:surveyId" element={<SurveyDetails />} />
      <Route path="/UserChoice/:surveyId" element={<UserChoicePage />} />
      <Route path="/Datasets" element={<DatasetsPage />} />
      <Route path="/survey-page" element={<YourSurveysPage />} />
      <Route path="/dataset-page" element={<YourDatasetsPage />} />
      <Route path="/Statistic-page/:surveyId" element={<StatisticPage />} />
      <Route path="/Option/:questionId" element={<OptionForm />} />
      <Route path="/Poll-page" element={<YourPollPage />} />
      <Route path="/PollChoice/:questionId" element={<PollChoice />} />
    
      <Route path="*" element={<Navigate to="/register-page" replace />} />
    </Routes>
    </AuthProvider>
  </BrowserRouter>
);
