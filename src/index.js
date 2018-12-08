import $ from 'jquery';
import 'bootstrap';
import './index.scss';
import firebase from 'firebase/app';
import apiKeys from '../db/apiKeys.json';
import navbar from './components/navbar/navbar';
import authHelpers from './Helpers/authHelpers';
import loginButton from './components/Auth/auth';

import printArticles from './components/ArticlesPage/articlesPage';
import intializeEvents from './components/Events/intializeEventsPage';

const initialize = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  navbar.navBuilder();
  authHelpers.checkLoginStatus(printArticles.printArticles);
  loginButton.loginButton();
  $('#articleAddButton').hide();
  intializeEvents();
};

initialize();
