import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import './navbar.scss';
import messages from '../messages/messages';
import initializeArticlePage from '../ArticlesPage/articlesPage';
import showAddFormArticle from '../ArticlesPage/addEditArticles';

const navbarEvents = () => {
  $('#nav-links').on('click', (e) => {
    console.log(e.target.id);
    if (e.target.id === 'navbar-button-logout') {
      firebase.auth().signOut().then(() => {
        $('#auth').show();
        $('#component-here').hide();
        $('#messages').hide();
        $('#articles').hide();
        $('#events').hide();
        $('#weather').hide();
      }).catch((err) => {
        console.error('Youre still logged in', err);
      });
    } else if (e.target.id === 'navbar-button-messages') {
      $('#auth').hide();
      $('#component-here').hide();
      $('#messages').show();
      $('#articles').hide();
      $('#events').hide();
      $('#weather').hide();
      messages.initMsgPage();
    } else if (e.target.id === 'navbar-button-articles') {
      $('#auth').hide();
      $('#component-here').hide();
      $('#messages').hide();
      $('#articles').show();
      $('#events').hide();
      $('#weather').hide();
      initializeArticlePage.styleFunction();
      initializeArticlePage.initializeArticlePage();
      $('#show-article-form').on('click', showAddFormArticle.buildAddForm);
      showAddFormArticle.buildAddForm();
    } else if (e.target.id === 'navbar-button-events') {
      $('#auth').hide();
      $('#component-here').hide();
      $('#messages').hide();
      $('#articles').hide();
      $('#events').show();
      $('#weather').hide();
    } else if (e.target.id === 'navbar-button-weather') {
      $('#auth').hide();
      $('#component-here').hide();
      $('#messages').hide();
      $('#articles').hide();
      $('#events').hide();
      $('#weather').show();
    } else {
      // click authentication
      $('#auth').hide();
      $('#component-here').show();
      $('#messages').hide();
      $('#articles').hide();
      $('#events').hide();
      $('#weather').hide();
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
