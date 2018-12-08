import $ from 'jquery';
import 'bootstrap';
import authHelpers from '../../Helpers/authHelpers';
import eventsData from './eventsData';

const eventsPrinter = (eventsArray) => {
  let eventsCards = '<button type="button" id="add-event-button" class="btn btn-success">Add New Event</button>';
  eventsArray.forEach((event) => {
    eventsCards += `
        <div class="card d-inline-block m-4" style="width: 18rem;">
  <ul class="list-group list-group-flush">
    <li class="list-group-item">${event.event}</li>
    <li class="list-group-item">${event.location}</li>
    <li class="list-group-item">${event.startDate}</li>
    <button type="button" class="btn btn-primary edit-event-btn" data-edit-id=${event.id}>Edit</button>
    <button type="button" class="btn btn-danger delete-event-btn" data-delete-id=${event.id}>Delete</button>
  </ul>
</div>
        `;
  });
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
