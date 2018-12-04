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
  domString += '<button type="button" class="btn btn-primary" id="add-event">Primary</button>';
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


$('body').on('click', '#add-event', addNewEvent);

export default buildNewEventForm;
