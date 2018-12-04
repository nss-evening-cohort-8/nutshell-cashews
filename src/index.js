import $ from 'jquery';
import './index.scss';
import firebase from 'firebase/app';

import apiKeys from '../db/apiKeys.json';

import navbar from './components/navbar/navbar';
import authHelpers from './Helpers/authHelpers';
import loginButton from './components/Auth/auth';

import printArticles from './components/ArticlesPage/articlesPage';
import showAddForm from './components/AddEditLocations/addEditLocations';
import printDash from './components/Dashboard/dashboard';

const initialize = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  navbar.navBuilder();
  authHelpers.checkLoginStatus(printArticles.printArticles);
  loginButton.loginButton();
  $('#show-location-form').on('click', showAddForm);
  authHelpers.checkLoginStatus(printDash.printDash);
};

initialize();
