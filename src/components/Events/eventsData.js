import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllEvents = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/events.json`)
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
      console.log(eventsArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const addNewEvent = eventObject => axios.post(`${firebaseUrl}/events.json`, JSON.stringify(eventObject));

export default {
  getAllEvents,
  addNewEvent,
};
