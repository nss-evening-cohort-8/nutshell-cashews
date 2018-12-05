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
        $('#show-article-form').hide();
        $('#single-article').hide();
        $('#articleAddButton').hide();
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
      $('#show-article-form').hide();
      $('#single-article').hide();
      $('#articleAddButton').hide();
      messages.initMsgPage();
    } else if (e.target.id === 'navbar-button-articles') {
      $('#auth').hide();
      $('#component-here').hide();
      $('#messages').hide();
      $('#articles').show();
      $('#events').hide();
      $('#weather').hide();
      $('#single-article').show();
      $('#show-article-form').show();
      $('#articleAddButton').show();
      initializeArticlePage.initializeArticlePage();
      $('#show-article-form').on('click', showAddFormArticle.buildAddForm);
    } else if (e.target.id === 'navbar-button-events') {
      $('#auth').hide();
      $('#component-here').hide();
      $('#messages').hide();
      $('#articles').hide();
      $('#events').show();
      $('#weather').hide();
      $('#show-article-form').hide();
      $('#single-article').hide();
      $('#articleAddButton').hide();
    } else if (e.target.id === 'navbar-button-weather') {
      $('#auth').hide();
      $('#component-here').hide();
      $('#messages').hide();
      $('#articles').hide();
      $('#events').hide();
      $('#weather').show();
      $('#show-article-form').hide();
      $('#single-article').hide();
      $('#articleAddButton').hide();
    } else {
      // click authentication
      $('#auth').hide();
      $('#component-here').show();
      $('#messages').hide();
      $('#articles').hide();
      $('#events').hide();
      $('#weather').hide();
      $('#show-article-form').hide();
      $('#single-article').hide();
      $('#articleAddButton').hide();
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
