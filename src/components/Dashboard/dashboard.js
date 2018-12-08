import $ from 'jquery';
// import firebase from 'firebase/app';
import 'firebase/auth';
import messages from '../messages/messages';
import initializeArticlePage from '../ArticlesPage/articlesPage';
import showAddFormArticle from '../ArticlesPage/addEditArticles';

const printDash = () => {
  const dashString = `
  <div id="dashboard">
    <h1>Welcome to our dashboard page</h1>
    <button id="dash-button-messages">Click here to go to our Messages Page</button>
    <button id="dash-button-articles">Click here to go to our Articles Page</button>
    <button id="dash-button-events">Click here to go to our Events Page</button>
    <button id="dash-button-weather">Click here to go to our Weather Page</button>

  </div>
  `;
  $('#component-here').html(dashString);
  $('#dashboard').on('click', (e) => {
    console.log(e.target.id);
    if (e.target.id === 'dash-button-messages') {
      $('#auth').hide();
      $('#component-here').hide();
      $('#messages').show();
      $('#articles').hide();
      $('#events').hide();
      $('#weather').hide();
      messages.initMsgPage();
    } else if (e.target.id === 'dash-button-articles') {
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
    } else if (e.target.id === 'dash-button-events') {
      $('#auth').hide();
      $('#component-here').hide();
      $('#messages').hide();
      $('#articles').hide();
      $('#events').show();
      $('#weather').hide();
    } else if (e.target.id === 'dash-button-weather') {
      $('#auth').hide();
      $('#component-here').hide();
      $('#messages').hide();
      $('#articles').hide();
      $('#events').hide();
      $('#weather').show();
    } else {
      // click authentication
      // $('#auth').hide();
      // $('#component-here').show();
      // $('#messages').hide();
      // $('#articles').hide();
      // $('#events').hide();
      // $('#weather').hide();
    }
  });
};

export default { printDash };
