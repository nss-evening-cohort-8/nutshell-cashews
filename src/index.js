import './index.scss';
import firebase from 'firebase/app';

import apiKeys from '../db/apiKeys.json';

import navbar from './components/navbar/navbar';
import authHelpers from './Helpers/authHelpers';
import loginButton from './components/Auth/auth';
import printArticles from './components/ArticlesPage/articlesPage';
import intializeEventsPage from './components/Events/events';

const initialize = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  navbar.navBuilder();
  authHelpers.checkLoginStatus(printArticles.printArticles, intializeEventsPage());
  loginButton.loginButton();
};

initialize();
