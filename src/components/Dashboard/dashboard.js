import $ from 'jquery';
import dashboardData from './dashboardData';
import './dashboard.scss';

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
              console.log('event Is', currentEvent);
              console.log('article is', article);
              console.log('msg is', msg);
              let convertTime = new Date(msg.timestamp).toLocaleString();
              convertTime = convertTime.replace(/:\d{2}(?!:)/, '');
              const dashString = `
              <div class="card" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">${currentEvent.location}</h5>
                  <p class="card-text">${currentEvent.event}</p>
                  <p class="card-text">${currentEvent.startDate}</p>
                </div>
              </div>
              <div class="card" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">${article.title}</h5>
                  <p class="card-text">${article.synopsis}</p>
                  <p class="card-text"><a href="${article.url}">Link</a></p>
                </div>
              </div>
              <div class="card" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">${msg.displayName}</h5>
                  <p class="card-text">${msg.message}</p>
                  <p class="card-text">${convertTime}</p>
                </div>
              </div>
              `;
              $('#component-here').html(dashString);
            });
        });
    })
    .catch((error) => {
      console.error(error);
    });
};

export default { printDash };
