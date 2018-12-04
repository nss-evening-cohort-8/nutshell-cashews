import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
// import initializeArticlesPage from '../ArticlesPage/articlesPage';

import googleImage from './Sign-In-With-Google.png';
import './auth.scss';

const loginButton = () => {
  const domString = `
<button id="google-auth" class="btn btn-secondary">
<img src="${googleImage}"/>
</button>
`;
  $('#auth').html(domString);
  $('#google-auth').on('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider); // .then(() => {
    //   initializeArticlesPage.initializeArticlePage();
    // }).catch((err) => {
    //   console.log(err);
    // });
  });
};

export default { loginButton };
