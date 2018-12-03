import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

const checkLoginStatus = (initializeMainPage) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // $('#component-here').show();
      $('#auth').hide();
      $('#navbar-button-login').hide();
      $('#navbar-button-messages').show();
      $('#navbar-button-articles').show();
      $('#navbar-button-events').show();
      $('#navbar-button-weather').show();
      $('#navbar-button-logout').show();
      console.log('the user', user);
      initializeMainPage();
    } else {
      $('#auth').show();
      $('#navbar-button-login').show();
      $('#navbar-button-messages').hide();
      $('#navbar-button-articles').hide();
      $('#navbar-button-events').hide();
      $('#navbar-button-weather').hide();
      $('#navbar-button-logout').hide();
    }
  });
};

const getCurrentUid = () => firebase.auth().currentUser.uid;

export default { checkLoginStatus, getCurrentUid };