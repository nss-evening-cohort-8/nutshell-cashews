import $ from 'jquery';
import 'bootstrap';
import './index.scss';
import firebase from 'firebase/app';
import apiKeys from '../db/apiKeys.json';
import navbar from './components/navbar/navbar';
import authHelpers from './Helpers/authHelpers';
import loginButton from './components/Auth/auth';
import printDash from './components/Dashboard/dashboard';

const initialize = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  navbar.navBuilder();
  authHelpers.checkLoginStatus(printDash.printDash);
  loginButton.loginButton();
  $('#articleAddButton').hide();
};

initialize();
