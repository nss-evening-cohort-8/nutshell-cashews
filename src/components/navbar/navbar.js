import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import './navbar.scss';

const navbarEvents = () => {
  $('#nav-links').on('click', (e) => {
    console.log(e.target.id);
    if (e.target.id === 'navbar-button-logout') {
      firebase.auth().signOut().then(() => {
        $('#auth').show();
        $('#add-edit-location').hide();
        $('#component-here').hide();
      }).catch((err) => {
        console.error('Youre still logged in', err);
      });
    } else if (e.target.id === 'navbar-button-messages') {
      $('#auth').hide();
      $('#add-edit-location').hide();
      $('#component-here').show();
    } else if (e.target.id === 'navbar-button-articles') {
      $('#auth').hide();
      $('#add-edit-location').hide();
      $('#component-here').show();
    } else if (e.target.id === 'navbar-button-events') {
      $('#auth').hide();
      $('#add-edit-location').hide();
      $('#component-here').show();
    } else if (e.target.id === 'navbar-button-weather') {
      $('#auth').hide();
      // $('#component-here').show();
      $('#add-edit-location').show();
    } else {
      // click authentication
      $('#auth').show();
      $('#component-here').hide();
      $('#add-edit-location').hide();
    }
  });
};

const navBuilder = () => {
  const logoImg = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Wikimedia_Community_Logo-Toolserver.svg/1024px-Wikimedia_Community_Logo-Toolserver.svg.png';
  const domString = `
    <nav id="nav-container">
      <div id="nav-logo">
        <img class="logo" src="${logoImg}"/>
      </div>
      <div id="nav-links">
        <button class="btn btn-secondary" id="navbar-button-login">Login</button>
        <button class="btn btn-secondary" id="navbar-button-messages">Messages</button>
        <button class="btn btn-secondary" id="navbar-button-articles">Articles</button>
        <button class="btn btn-secondary" id="navbar-button-events">Events</button>
        <button class="btn btn-secondary" id="navbar-button-weather">Weather</button>
        <button class="btn btn-secondary" id="navbar-button-logout">Logout</button>
      </div>
    </nav>
  `;
  $('#navbar-here').html(domString);
  navbarEvents();
};

export default { navBuilder };
