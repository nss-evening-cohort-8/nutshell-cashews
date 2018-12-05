import $ from 'jquery';
import eventsData from './eventsData';
import intializeEventsPage from './events';

const formBuilder = (theEvent) => {
  const form = `
    <div class="form-group">
    <label for="form-friend-name">Event:</label>
    <input type="text" class="form-control" value="${theEvent.event}" id="form-event" placeholder="Event">
  </div>
  <div class="form-group">
    <label for="form-friend-address">Location:</label>
    <input type="text" class="form-control" value="${theEvent.location}" id="form-location" placeholder="Location">
  </div>
  <div class="form-group">
    <label for="form-friend-email">Start Date:</label>
    <input type="text" class="form-control" value="${theEvent.startDate}" id="form-startDate" placeholder="Start Date">
  </div>
    `;
  return form;
};

const gettingEventFromForm = () => {
  const event = {
    event: $('#form-event').val(),
    location: $('#form-location').val(),
    startDate: $('#form-startDate').val(),
  };
  return event;
};

const buildNewEventForm = () => {
  const emptyEvent = {
    event: '',
    location: '',
    startDate: '',
  };
  let domString = '<h1>Add New Event</h1>';
  domString += formBuilder(emptyEvent);
  domString += '<button type="button" class="btn btn-primary" id="add-event">Save Event</button>';
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
      let theString = '<h1>Update EVent</h1>';
      theString += formBuilder(singleEvent);
      theString += `<button id="update-event" data-single-event-id=${singleEvent.id}>Update Event<button>`;
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

const bindEvents = () => {
  $('body').on('click', '#add-event', addNewEvent);
  $('body').on('click', '#add-event-button', buildNewEventForm); // get clarification
  $('body').on('click', '.edit-btn', showUpdateForm);
  $('body').on('click', '#update-event', updateEvent);
};

export default bindEvents;
