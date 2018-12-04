import axios from 'axios';
import apiKeys from '../../../../db/apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const msgGetter = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/messages.json`)
    .then((result) => {
      resolve(result.data);
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

export default { msgGetter, msgPoster };
