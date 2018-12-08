import $ from 'jquery';
import dashboardData from './dashboardData';
import './dashboard.scss';
import dashboardEvents from './dashboardEvents';

const printDash = () => {
  let msg = '';
  let article = '';
  let currentEvent = '';
  dashboardData.firstMessage()
    .then((firstMsg) => {
      msg = firstMsg;
    })
    .then(() => {
      dashboardData.singleArticle()
        .then((articleArray) => {
          [article] = articleArray;
        })
        .then(() => {
          dashboardData.singleEvent()
            .then((oneEvent) => {
              currentEvent = oneEvent;
            })
            .then(() => {
              let convertTime = new Date(msg.timestamp).toLocaleString();
              convertTime = convertTime.replace(/:\d{2}(?!:)/, '');
              const dashString = `
              <div class="main-card-container d-flex flex-wrap justify-content-around">
                <div class="card event-card">
                  <div class="card-body">
                    <h6 class="card-subtitle mb-2 text-muted">Event:</h6>
                    <h5 class="card-title">${currentEvent.location}</h5>
                    <p class="card-text">${currentEvent.event}</p>
                    <p class="card-text">${currentEvent.startDate}</p>
                  </div>
                </div>
                <div class="card article-card">
                  <div class="card-body">
                    <h6 class="card-subtitle mb-2 text-muted">Article:</h6>
                    <h5 class="card-title">${article.title}</h5>
                    <p class="card-text">${article.synopsis}</p>
                    <p class="card-text"><a href="${article.url}">Link</a></p>
                  </div>
                </div>
                <div class="card message-card navbar-button-messages">
                  <div class="card-body">
                    <h6 class="card-subtitle mb-2 text-muted">Most Recent Message:</h6>
                    <h5 class="card-title">${msg.displayName}</h5>
                    <p class="card-text">${msg.message}</p>
                    <p class="card-text">${convertTime}</p>
                  </div>
                </div>
              </div>
              `;
              $('#component-here').html(dashString);
              dashboardEvents.initDashEvents();
            });
        });
    })
    .catch((error) => {
      console.error(error);
    });
};

export default { printDash };
