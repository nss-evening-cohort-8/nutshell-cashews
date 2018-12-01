import firebase from 'firebase/app';
import navbar from './components/navbar/navbar';
import apiKeys from '../db/apiKeys.json';
import './index.scss';

const initialize = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  navbar.navBuilder();
};

initialize();
