import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import './navbar.scss';
import initWeatherPage from '../WeatherPage/weatherPage';
import messages from '../messages/messages';
import initializeArticlePage from '../ArticlesPage/articlesPage';
import showAddFormArticle from '../ArticlesPage/addEditArticles';
import intializeEvents from '../Events/intializeEventsPage';


const navbarEvents = () => {
  $('#navbar-button-logout').on('click', () => {
    firebase.auth().signOut().then(() => {
      $('#auth').show();
      $('#component-here').hide();
      $('#messages').hide();
      $('#articles').hide();
      $('#events').hide();
      $('#weather').hide();
      $('#navbar-button-main').hide();
      if (document.getElementById('navbar-button-messages').classList.contains('active')) {
        document.getElementById('navbar-button-messages').classList = 'btn btn-secondary';
      } else if (document.getElementById('navbar-button-events').classList.contains('active')) {
        document.getElementById('navbar-button-events').classList = 'btn btn-secondary';
      } else if (document.getElementById('navbar-button-articles').classList.contains('active')) {
        document.getElementById('navbar-button-articles').classList = 'btn btn-secondary';
      } else if (document.getElementById('navbar-button-weather').classList.contains('active')) {
        document.getElementById('navbar-button-weather').classList = 'btn btn-secondary';
      } else if (document.getElementById('navbar-button-main').classList.contains('active')) {
        document.getElementById('navbar-button-main').classList = 'btn btn-secondary';
      }
    }).catch((err) => {
      console.error('Youre still logged in', err);
    });
  });

  $('#navbar-button-main').on('click', (e) => {
    $('#auth').hide();
    $('#component-here').show();
    $('#messages').hide();
    $('#articles').hide();
    $('#events').hide();
    $('#weather').hide();
    $('#navbar-button-main').show();
    if (document.getElementById('navbar-button-messages').classList.contains('active')) {
      document.getElementById('navbar-button-messages').classList = 'btn btn-secondary';
    } else if (document.getElementById('navbar-button-events').classList.contains('active')) {
      document.getElementById('navbar-button-events').classList = 'btn btn-secondary';
    } else if (document.getElementById('navbar-button-articles').classList.contains('active')) {
      document.getElementById('navbar-button-articles').classList = 'btn btn-secondary';
    } else if (document.getElementById('navbar-button-weather').classList.contains('active')) {
      document.getElementById('navbar-button-weather').classList = 'btn btn-secondary';
    } else if (document.getElementById('navbar-button-main').classList.contains('active')) {
      document.getElementById('navbar-button-main').classList = 'btn btn-secondary';
    }
    e.target.className = 'btn btn-secondary active';
  });

  $('#navbar-button-articles').on('click', (e) => {
    $('#auth').hide();
    $('#component-here').hide();
    $('#messages').hide();
    $('#articles').show();
    $('#events').hide();
    $('#weather').hide();
    $('#navbar-button-main').show();
    initializeArticlePage.styleFunction();
    initializeArticlePage.initializeArticlePage();
    $('#show-article-form').on('click', showAddFormArticle.buildAddForm);
    showAddFormArticle.buildAddForm();
    if (document.getElementById('navbar-button-messages').classList.contains('active')) {
      document.getElementById('navbar-button-messages').classList = 'btn btn-secondary';
    } else if (document.getElementById('navbar-button-events').classList.contains('active')) {
      document.getElementById('navbar-button-events').classList = 'btn btn-secondary';
    } else if (document.getElementById('navbar-button-weather').classList.contains('active')) {
      document.getElementById('navbar-button-weather').classList = 'btn btn-secondary';
    } else if (document.getElementById('navbar-button-main').classList.contains('active')) {
      document.getElementById('navbar-button-main').classList = 'btn btn-secondary';
    }
    e.target.className = 'btn btn-secondary active';
  });

  $('#navbar-button-events').on('click', (e) => {
    $('#auth').hide();
    $('#component-here').hide();
    $('#messages').hide();
    $('#articles').hide();
    $('#events').show();
    $('#weather').hide();
    $('#navbar-button-main').show();
    intializeEvents();
    if (document.getElementById('navbar-button-messages').classList.contains('active')) {
      document.getElementById('navbar-button-messages').classList = 'btn btn-secondary';
    } else if (document.getElementById('navbar-button-articles').classList.contains('active')) {
      document.getElementById('navbar-button-articles').classList = 'btn btn-secondary';
    } else if (document.getElementById('navbar-button-weather').classList.contains('active')) {
      document.getElementById('navbar-button-weather').classList = 'btn btn-secondary';
    } else if (document.getElementById('navbar-button-main').classList.contains('active')) {
      document.getElementById('navbar-button-main').classList = 'btn btn-secondary';
    }
    e.target.className = 'btn btn-secondary active';
  });

  $('#navbar-button-weather').on('click', (e) => {
    $('#auth').hide();
    $('#component-here').hide();
    $('#messages').hide();
    $('#articles').hide();
    $('#events').hide();
    $('#weather').show();
    $('#forecast-container').html('').show();
    initWeatherPage.initWeatherPage();
    $('#navbar-button-main').show();
    if (document.getElementById('navbar-button-messages').classList.contains('active')) {
      document.getElementById('navbar-button-messages').classList = 'btn btn-secondary';
    } else if (document.getElementById('navbar-button-events').classList.contains('active')) {
      document.getElementById('navbar-button-events').classList = 'btn btn-secondary';
    } else if (document.getElementById('navbar-button-articles').classList.contains('active')) {
      document.getElementById('navbar-button-articles').classList = 'btn btn-secondary';
    } else if (document.getElementById('navbar-button-main').classList.contains('active')) {
      document.getElementById('navbar-button-main').classList = 'btn btn-secondary';
    }
    e.target.className = 'btn btn-secondary active';
  });

  $('#navbar-button-messages').on('click', (e) => {
    $('#auth').hide();
    $('#component-here').hide();
    $('#messages').show();
    $('#articles').hide();
    $('#events').hide();
    $('#weather').hide();
    messages.initMsgPage();
    $('#navbar-button-main').show();
    e.target.className = 'btn btn-secondary active';
    if (document.getElementById('navbar-button-articles').classList.contains('active')) {
      document.getElementById('navbar-button-articles').classList = 'btn btn-secondary';
    } else if (document.getElementById('navbar-button-events').classList.contains('active')) {
      document.getElementById('navbar-button-events').classList = 'btn btn-secondary';
    } else if (document.getElementById('navbar-button-weather').classList.contains('active')) {
      document.getElementById('navbar-button-weather').classList = 'btn btn-secondary';
    } else if (document.getElementById('navbar-button-main').classList.contains('active')) {
      document.getElementById('navbar-button-main').classList = 'btn btn-secondary';
    }
  });
};

const navBuilder = () => {
  const logoImg = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Wikimedia_Community_Logo-Toolserver.svg/1024px-Wikimedia_Community_Logo-Toolserver.svg.png';
  const domString = `
    <nav id="nav-container">
      <div id="nav-logo">
        <img class="logo home" src="${logoImg}"/>
      </div>
      <div id="nav-links">
        <button class="btn btn-secondary home" id="navbar-button-main">Home</button>
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
  // $('body').on('click', (e) => { console.log(e.target.className); });
};

export default { navBuilder };
