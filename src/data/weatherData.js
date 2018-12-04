// const baseUrl = 'https://api.weatherbit.io/v2.0/current';
import axios from 'axios';
import apiKeys from '../../db/apiKeys';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllLocations = userUid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/weather.json?orderBy="userUid"&equalTo="${userUid}"`)
    .then((results) => {
      const locationsObject = results.data;
      console.log(locationsObject);
      const locationsArray = [];
      if (locationsObject !== null) {
        Object.keys(locationsObject).forEach((locationId) => {
          locationsObject[locationId].id = locationId;
          locationsArray.push(locationsObject[locationId]);
        });
      }
      resolve(locationsArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const getSingleLocation = locationId => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/weather/${locationId}.json`)
    .then((result) => {
      const singleLocation = result.data;
      axios.get(`${firebaseUrl}/weather/${locationId}.json`);
      singleLocation.id = locationId;
      resolve(singleLocation);
    })
    .catch((error) => {
      reject(error);
    });
});


const deleteLocation = locationId => axios.delete(`${firebaseUrl}/friends/${locationId}.json`);

const addNewLocation = locationObject => axios.post(`${firebaseUrl}/friends.json`, JSON.stringify(locationObject));

const updateLocation = (locationObject, locationId) => axios.put(`${firebaseUrl}/friends/${locationId}.json`, JSON.stringify(locationObject));

// eslint-disable-next-line max-len
// const updatedIsAvoiding = (friendId, isAvoiding) => axios.patch(`${firebaseUrl}/friends/${friendId}.json`, { isAvoiding });

export default {
  getAllLocations,
  getSingleLocation,
  deleteLocation,
  addNewLocation,
  updateLocation,
  // updatedIsAvoiding,
};
