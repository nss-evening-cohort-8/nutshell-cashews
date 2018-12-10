import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

import googleImage from './Sign-In-With-Google.png';
import './auth.scss';

const loginButton = () => {
  const domString = `
  <div class="d-flex justify-content-center">
    <button id="google-auth" class="btn btn-secondary">
    <img src="${googleImage}"/>
    </button>
  </div>
`;
  $('#auth').html(domString);
  $('#google-auth').on('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  });
};

export default { loginButton };
