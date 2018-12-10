import $ from 'jquery';
import eventsData from './eventsData';
import intializeEventsPage from './events';
import authHelpers from '../../Helpers/authHelpers';
import './events.scss';

const formBuilder = (theEvent) => {
  const form = `
<div id="eventsForm">
  <div class="form-group">
    <label for="form-friend-name" id="form-labels">Image:</label>
    <input type="text" class="form-control" value="${theEvent.img}" id="form-image" placeholder="${theEvent.img}">
  </div>
    <div class="form-group">
    <label for="form-friend-name" id="form-labels">Event:</label>
    <input type="text" class="form-control" value="${theEvent.event}" id="form-event" placeholder="Event">
  </div>
  <div class="form-group">
    <label for="form-friend-address" id="form-labels">Location:</label>
    <input type="text" class="form-control" value="${theEvent.location}" id="form-location" placeholder="Location">
  </div>
  <div class="form-group">
    <label for="form-friend-email" id="form-labels">Start Date:</label>
    <input type="text" class="form-control datecheck" value="${theEvent.startDate}" id="form-startDate" placeholder="Start Date">
  </div>
</div>
    `;
  return form;
};

const gettingEventFromForm = () => {
  const event = {
    img: $('#form-image').val(),
    event: $('#form-event').val(),
    location: $('#form-location').val(),
    startDate: $('#form-startDate').val(),
    userUid: authHelpers.getCurrentUid(),
  };
  return event;
};

const buildNewEventForm = () => {
  const emptyEvent = {
    img: 'https://www.iosicongallery.com/icons/google-calendar-2015-03-11/512.png',
    event: '',
    location: '',
    startDate: '',
  };
  let domString = '<h1>Add New Event</h1>';
  domString += formBuilder(emptyEvent);
  domString += '<div class="text-center"><button type="button" class="btn btn-primary" id="add-event">Save Event</button></div>';
  $('#events').html(domString);
};

const addNewEvent = () => {
  const newEvent = gettingEventFromForm();
  eventsData.addNewEvent(newEvent)
    .then(() => {
      intializeEventsPage();
    })
    .catch((error) => {
      console.log('error', error);
    });
};

// Update an Event
const showUpdateForm = (e) => {
  const idToEdit = e.target.dataset.editId;
  eventsData.getSingleEvent(idToEdit)
    .then((singleEvent) => {
      let theString = '<h1>Update Event</h1>';
      theString += formBuilder(singleEvent);
      theString += `<div class="text-center"><button type="button" class="btn btn-primary" id="update-event" data-single-event-id=${singleEvent.id}>Update Event</button></div>`;
      $('#events').html(theString);
    })
    .catch((error) => {
      console.log('error in getting single event', error);
    });
};

const updateEvent = (e) => {
  const updatedEvent = gettingEventFromForm();
  const eventId = e.target.dataset.singleEventId;
  eventsData.updateEvent(updatedEvent, eventId)
    .then(() => {
      intializeEventsPage();
    });
};

const deleteEvent = (e) => {
  const idToDelete = e.target.dataset.deleteId;
  eventsData.deleteEvent(idToDelete)
    .then(() => {
      intializeEventsPage();
    })
    .catch((error) => {
      console.log('error in deleting the event', error);
    });
};

const bindEvents = () => {
  $('body').on('click', '#add-event', addNewEvent);
  $('body').on('click', '#add-event-button', buildNewEventForm);
  $('body').on('click', '.edit-event-btn', showUpdateForm);
  $('body').on('click', '#update-event', updateEvent);
  $('body').on('click', '.delete-event-btn', deleteEvent);
};

export default bindEvents;
