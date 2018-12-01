import './index.scss';
import firebase from 'firebase/app';

import apiKeys from '../db/apiKeys.json';

import navbar from './components/navbar/navbar';
import authHelpers from './components/Helpers/authHelpers';

const initialize = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  navbar.navBuilder();
  authHelpers.checkLoginStatus();
};

initialize();
