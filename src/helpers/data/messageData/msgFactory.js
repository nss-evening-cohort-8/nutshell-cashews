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

export default { msgGetter };
