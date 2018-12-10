import $ from 'jquery';
import 'bootstrap';
import authHelpers from '../../Helpers/authHelpers';
import eventsData from './eventsData';
import editImage from './edit.png';
import deleteImage from './trash.png';
import './events.scss';

const eventsPrinter = (eventsArray) => {
  let eventsCards = '<h1 id="events-Header">EVENTS</h1>';
  eventsCards += '<div class="text-center"><button type="button" id="add-event-button" class="btn btn-success mr-5">Add New Event</button></div>';
  eventsCards += '<div class="container mt-4 d-flex flex-wrap">';
  eventsArray.forEach((event) => {
    eventsCards += `
    <div class="col-auto mb-3">
        <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${event.img}" alt="Card image cap">
  <ul class="list-group list-group-flush">
    <li class="list-group-item the-event">${event.event}</li>
    <li class="list-group-item">${event.location}</li>
    <li class="list-group-item">${event.startDate}</li>
    <span id="event-card-images">
        <input type="image" class="edit-event-btn" data-edit-id=${event.id} src="${editImage}">
        <input type="image" class="delete-event-btn" data-delete-id=${event.id} src="${deleteImage}">
    </span>
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
