import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

const checkLoginStatus = (initializeMainPage) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('#auth').hide();
      $('#messages').hide();
      $('#articles').hide();
      $('#events').hide();
      $('#weather').hide();
      $('#component-here').show();
      $('#navbar-button-messages').show();
      $('#navbar-button-articles').show();
      $('#navbar-button-events').show();
      $('#navbar-button-weather').show();
      $('#navbar-button-logout').show();
      $('#navbar-button-main').show();
      initializeMainPage();
    } else {
      $('#auth').show();
      $('#messages').hide();
      $('#articles').hide();
      $('#events').hide();
      $('#weather').hide();
      $('#component-here').hide();
      $('#navbar-button-messages').hide();
      $('#navbar-button-articles').hide();
      $('#navbar-button-events').hide();
      $('#navbar-button-weather').hide();
      $('#navbar-button-logout').hide();
      $('#navbar-button-main').hide();
    }
  });
};

const getCurrentUid = () => firebase.auth().currentUser.uid;

export default { checkLoginStatus, getCurrentUid };
