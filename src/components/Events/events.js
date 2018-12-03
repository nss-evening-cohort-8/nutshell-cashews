import $ from 'jquery';
import 'bootstrap';
import eventsData from './eventsData';

const eventsPrinter = (eventsArray) => {
  let eventsCards = '<button type="button" class="btn btn-success">Add New Event</button>';
  eventsArray.forEach((event) => {
    eventsCards += `
        <div class="card" style="width: 18rem;">
  <ul class="list-group list-group-flush">
    <li class="list-group-item">${event.event}</li>
    <li class="list-group-item">${event.startDate}</li>
    <li class="list-group-item">${event.location}</li>
  </ul>
</div>
        `;
  });
  $('#event-div').html(eventsCards);
};

const eventsPage = () => {
  eventsData.getAllEvents()
    .then((eventsArray) => {
      eventsPrinter(eventsArray);
    })
    .catch((error) => {
      console.log('error in getting events', error);
    });
};

const intializeEventsPage = () => {
  eventsPage();
};

export default intializeEventsPage;
