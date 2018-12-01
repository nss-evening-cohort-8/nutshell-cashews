import firebase from 'firebase/app';
import navbar from './components/navbar/navbar';
import apiKeys from '../db/apiKeys.json';
import './index.scss';
import msgFactory from './helpers/data/messageData/msgFactory';

const initialize = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  navbar.navBuilder();
  msgFactory.test();
};

initialize();
