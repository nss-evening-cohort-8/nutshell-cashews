import $ from 'jquery';
import 'bootstrap';
import authHelpers from '../../Helpers/authHelpers';
import eventsData from './eventsData';
import './events.scss';

const eventsPrinter = (eventsArray) => {
  let eventsCards = '<h1 id="events-Header">EVENTS</h1>';
  eventsCards += '<div class="text-center"><button type="button" id="add-event-button" class="btn btn-success mr-5">Add New Event</button></div>';
  eventsCards += '<div class="container mt-4 d-flex flex-wrap">';
  eventsArray.forEach((event) => {
    eventsCards += `
    <div class="col-auto mb-3">
        <div class="card" style="width: 18rem;">
  <ul class="list-group list-group-flush">
    <li class="list-group-item">${event.event}</li>
    <li class="list-group-item">${event.location}</li>
    <li class="list-group-item">${event.startDate}</li>
    <button type="button" class="btn btn-primary edit-event-btn" data-edit-id=${event.id}>Edit</button>
    <button type="button" class="btn btn-danger delete-event-btn" data-delete-id=${event.id}>Delete</button>
  </ul>
</div>
</div>
  `;
  });
  eventsCards += '</div>';
  $('#events').html(eventsCards);
};

const eventsPage = () => {
  const uid = authHelpers.getCurrentUid();
  eventsData.getAllEvents(uid)
    .then((eventsArray) => {
      eventsPrinter(eventsArray);
    })
    .catch((error) => {
      console.error('error in getting events', error);
    });
};

export default eventsPage;
