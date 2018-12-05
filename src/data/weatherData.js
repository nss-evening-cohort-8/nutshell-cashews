// const baseUrl = 'https://api.weatherbit.io/v2.0/current';
import axios from 'axios';
import apiKeys from '../../db/apiKeys';
import authHelpers from '../Helpers/authHelpers';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllLocations = userUid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/weather.json?orderBy="userUid"&equalTo="${userUid}"`)
    .then((results) => {
      const locationsObject = results.data;
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


const deleteLocation = locationId => axios.delete(`${firebaseUrl}/weather/${locationId}.json`);

const addNewLocation = locationObject => axios.post(`${firebaseUrl}/weather.json`, JSON.stringify(locationObject));

const updateLocation = (locationObject, locationId) => axios.put(`${firebaseUrl}/weather/${locationId}.json`, JSON.stringify(locationObject));

const updatedIsCurrent = (locationId, isCurrent) => axios.patch(`${firebaseUrl}/weather/${locationId}.json`, { isCurrent });

const makeLocationsFalse = () => new Promise((resolve, reject) => {
  const uid = authHelpers.getCurrentUid();
  getAllLocations(uid)
    .then((locationsArray) => {
      locationsArray.forEach((location) => {
        const current = location.isCurrent;
        console.log(current);
        if (current) {
          updatedIsCurrent(location.id, false)
            .then(() => {
              resolve();
            });
        }
      });
    })
    .catch((err) => {
      reject(err);
    });
});

// eslint-disable-next-line max-len
// const updatedIsAvoiding = (friendId, isAvoiding) => axios.patch(`${firebaseUrl}/friends/${friendId}.json`, { isAvoiding });

export default {
  getAllLocations,
  getSingleLocation,
  deleteLocation,
  addNewLocation,
  updateLocation,
  updatedIsCurrent,
  makeLocationsFalse,
};
