import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllEvents = userUid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/events.json?orderBy="userUid"&equalTo="${userUid}"`)
    .then((results) => {
      const eventsObject = results.data;
      const eventsArray = [];
      if (eventsObject !== null) {
        Object.keys(eventsObject).forEach((eventId) => {
          eventsObject[eventId].id = eventId;
          eventsArray.push(eventsObject[eventId]);
        });
      }
      resolve(eventsArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const getSingleEvent = eventId => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/events/${eventId}.json`)
    .then((result) => {
      const singleEvent = result.data;
      singleEvent.id = eventId;
      resolve(singleEvent);
    })
    .catch((err) => {
      reject(err);
    });
});

const addNewEvent = eventObject => axios.post(`${firebaseUrl}/events.json`, JSON.stringify(eventObject));

const updateEvent = (eventObject, eventId) => axios.put(`${firebaseUrl}/events/${eventId}.json`, JSON.stringify(eventObject));

const deleteEvent = eventId => axios.delete(`${firebaseUrl}/events/${eventId}.json`);

export default {
  getAllEvents,
  getSingleEvent,
  addNewEvent,
  updateEvent,
  deleteEvent,
};
