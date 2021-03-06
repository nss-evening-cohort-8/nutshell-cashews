import axios from 'axios';
import apiKeys from '../../../../db/apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const msgGetter = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/messages.json`)
    .then((result) => {
      const messageObject = result.data;
      const messageArray = [];
      if (messageObject !== null) {
        Object.keys(messageObject).forEach((messageId) => {
          messageObject[messageId].id = messageId;
          messageArray.push(messageObject[messageId]);
        });
      }
      resolve(messageArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const msgPoster = newMessage => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/messages.json`, JSON.stringify(newMessage))
    .then((result) => {
      resolve(result);
    })
    .catch((error) => {
      reject(error);
    });
});

const msgDeleter = keyToDelete => new Promise((resolve, reject) => {
  axios.delete(`${baseUrl}/messages/${keyToDelete}.json`)
    .then((result) => {
      resolve(result);
    })
    .catch((error) => {
      reject(error);
    });
});

const msgEditer = (msgKey, isEdited) => new Promise((resolve, reject) => {
  axios.patch(`${baseUrl}/messages/${msgKey}.json`, { isEdited })
    .then((result) => {
      resolve(result);
    })
    .catch((error) => {
      reject(error);
    });
});

const msgEditedMessage = (msgKey, message) => new Promise((resolve, reject) => {
  axios.patch(`${baseUrl}/messages/${msgKey}.json`, { message })
    .then((result) => {
      resolve(result);
    })
    .catch((error) => {
      reject(error);
    });
});


export default {
  msgGetter,
  msgPoster,
  msgDeleter,
  msgEditer,
  msgEditedMessage,
};
