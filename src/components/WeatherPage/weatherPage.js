/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import $ from 'jquery';
import weatherData from '../../data/weatherData';
import authHelpers from '../../Helpers/authHelpers';
import './Style/weatherPage.scss';
import forecastData from './FiveDayForecast/fiveDayForecast';

const printSingleLocation = (location) => {
  // eslint-disable-next-line no-unused-expressions
  (location.pod === 'n' ? $('#background').attr('class', 'night') : $('#background').attr('class', 'day'));
  const locationString = `
  <div class="container mb-5 d-flex justify-content-center">
    <div id="currentLocation" class="mt-5 mr-4 ml-4 p-3 text-center">
      <h1>${location.city_name}</h1>
      <h3>${location.temp}</h3>
      <p>${location.pod === 'd' ? 'Day' : 'Night'}</p>
      <div class="d-flex justify-content-center">
        <img id="weatherIcon" class="" src="https://www.weatherbit.io/static/img/icons/${location.weather.icon}.png">
      </div>
      <p>${location.weather.description}</p>
      <div>
        <button class="btn btn-danger delete-btn" data-delete-id=${location.id}>X</button>
      </div>    
    </div>
  </div>
  `;
  $('#single-container').html(locationString);
  console.log(location);
  // if (current === false) {
  //   console.log('this is not current location');
  //   current = true;
  //   console.log(current);
  // } else {
  //   current = false;
  // }
};

// const getSingleLocation = (e) => {
//   // firebase id
//   const locationId = e.target.dataset.dropdownId;

//   // returns weather.json obeject;
//   weatherData.getSingleLocation(locationId)
//     .then((singleLocation) => {
//       // makes 'isCurrent' property/key for all locations in firebase false;
//       weatherData.makeLocationsFalse()
//         .then(() => {
//           // makes the 'isCurrent' property/key value I clicked true;
//           weatherData.updatedIsCurrent(locationId, true)
//             .then(() => {
//               // gets weatherDataArray from weatherbit api;
//               weatherData.getSingleWeatherData(singleLocation.zipcode)
//                 .then((result) => {
//                   // loops through the array and prints the weatherObjects in it (only one);
//                   result.forEach((weatherObject) => {
//                     printSingleLocation(weatherObject);
//                   });
//                   // gets forecast Data thru weatherbit api and prints the forecast cards;
//                   forecastData.getForecastLocation(singleLocation.zipcode);
//                   // console.log(result);
//                   // printSingleLocation(singleLocation);
//                 });
//             });
//         });
//     })
//     .catch((error) => {
//       console.error('error in getting one friend', error);
//     });
// };

const getSingleLocation = (e) => {
  // firebase id
  const locationId = e.target.dataset.dropdownId;
  console.log(e);
  // returns weather.json obeject;
  weatherData.getSingleLocation(locationId)
    .then((singleLocation) => {
      // makes 'isCurrent' property/key for all locations in firebase false;
      weatherData.makeLocationsFalse()
        .then(() => {
          // makes the 'isCurrent' property/key value I clicked true;
          weatherData.updatedIsCurrent(locationId, true)
            .then(() => {
              // gets weatherDataArray from weatherbit api;
              weatherData.getSingleWeatherData(singleLocation.zipcode)
                .then((result) => {
                  // loops through the array and prints the weatherObjects in it (only one);
                  result.forEach((weatherObject) => {
                    printSingleLocation(weatherObject);
                  });
                  // gets forecast Data thru weatherbit api and prints the forecast cards;
                  forecastData.getForecastLocation(singleLocation.zipcode);
                  // console.log(result);
                  // printSingleLocation(singleLocation);
                });
            });
        });
    })
    .catch((error) => {
      console.error('error in getting one friend', error);
    });
};

const buildDropdown = (locationsArray) => {
  let noLocationMessage = '';
  let dropdown = `<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Pick a Location
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">`;
  if (locationsArray.length) {
    locationsArray.forEach((location) => {
      // console.log(location);
      // const cityZip = location.zipcode;
      // weatherData.getSingleWeatherData(cityZip);
      // .then((results) => {
      //   const zipCode = results[0].city_name;
      //   return zipCode;
      // })
      // .then((zipCodeData) => {
      //   console.log(zipCodeData);
      // });
      // console.log(location);
      dropdown += `<div class="dropdown-item get-single text-center" cursor="pointer" data-dropdown-id="${location.zipode}">${location.zipcode}</div>`;
    });
  } else {
    // eslint-disable-next-line max-len
    noLocationMessage += '<div>You dont have a location selected. Please add a new location.</div>';
    // addEditLocations.printFormToDom();
  }
  dropdown += '</div></div>';
  $('#dropdown-container').html(dropdown);
  $('#single-container').html(noLocationMessage);
};

const weatherPage = () => {
  const uid = authHelpers.getCurrentUid();
  weatherData.getAllLocations(uid)
    .then((locationsArray) => {
      buildDropdown(locationsArray);
      // locationsArray.forEach((locationObject) => {
      //   const objectZip = locationObject.zipcode;
      // console.log(objectZip);
      // weatherData.getSingleWeatherData(objectZip)
      // .then((results) => {
      // console.log(results);
      // console.log(locationsArray);
    })
    .catch((error) => {
      console.error('error in getting friends', error);
    });
};

const deleteLocation = (e) => {
  // firebase id
  const idToDelete = e.target.dataset.deleteId;
  // console.log(e.target.dataset);
  weatherData.deleteLocation(idToDelete)
    .then(() => {
      weatherPage();
      $('#single-container').html('');
    })
    .catch((error) => {
      console.error('error in deleting friend', error);
    });
};

// const updateIsCurrent = (e) => {
//   const locationId = e.target.dataset;
//   console.log(locationId);
//   // const isCurrent = e.target.checked;
//   weatherData.updatedIsCurrent(locationId)
//     .then(() => {

//     })
//     .catch((err) => {
//       console.error('error in updating flag', err);
//     });
// };


const bindEvents = () => {
  $('body').on('click', '.get-single', getSingleLocation);
  $('body').on('click', '.delete-btn', deleteLocation);
  // $('body').on('click', '.get-single', updateIsCurrent);
};

const initializeWeatherPage = () => {
  weatherPage();
  bindEvents();
};

export default { initializeWeatherPage };
