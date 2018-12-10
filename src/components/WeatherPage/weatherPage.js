/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import $ from 'jquery';
import weatherData from '../../data/weatherData';
import authHelpers from '../../Helpers/authHelpers';
import './Style/weatherPage.scss';
import forecastData from './Forecast/forecast';

const printSingleLocation = (location) => {
  // eslint-disable-next-line no-unused-expressions
  (location.pod === 'n' ? $('#background').attr('class', 'night') : $('#background').attr('class', 'day'));
  const locationString = `
  <div class="curent-weather mb-1 d-flex justify-content-center">
    <div id="currentLocation" class="text-center">
      <h3>${location.city_name}</h3>
      <h1>${location.temp}</h1>
      <p>${location.pod === 'd' ? 'Day' : 'Night'}</p>
      <div class="d-flex justify-content-center">
        <img id="weatherIcon" class="" src="https://www.weatherbit.io/static/img/icons/${location.weather.icon}.png">
      </div>
      <p>${location.weather.description}</p>  
    </div>
  </div>
  `;
  $('#single-container').html(locationString);
  console.log(location);
};

const getSingleLocation = (e) => {
  // firebase id
  const locationId = e.target.dataset.dropdownId;

  // returns weather.json obeject;
  weatherData.getSingleLocation(locationId)
    .then((singleLocation) => {
      // makes 'isCurrent' property/key for all locations in firebase false;
      weatherData.makeSingleocationFalse()
        .then(() => {
          // makes the 'isCurrent' property/key value I clicked true;
          weatherData.updatedIsCurrent(locationId, true)
            .then(() => {
              // gets weatherDataArray from weatherbit api;
              weatherData.getSingleWeatherData(singleLocation.zipcode)
                .then((result) => {
                  // loops through the array and prints the weatherObjects in it (only one);
                  result.forEach((weatherObject) => {
                    weatherObject.id = locationId;
                    printSingleLocation(weatherObject);
                  });
                  // gets forecast Data thru weatherbit api and prints the forecast cards;
                  forecastData.getForecastLocation(singleLocation.zipcode);
                });
            });
        });
    })
    .catch((error) => {
      console.error('error in getting one friend', error);
    });
};

const printFormToDom = () => {
  const emptyLocation = {
    zipcode: '',
  };

  let domString = '';
  domString += formBuilder(emptyLocation);
  domString += '<div class="d-flex justify-content-center">';
  domString += '<button class="btn btn-primary d-flex mt-2" id="add-location">Save Location</button>';
  domString += '</div>';
  $('#add-edit-location').html(domString).toggle();
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
      dropdown += `<div class="dropdown-item get-single text-center d-flex justify-content-between align-items-center" data-dropdown-id="${location.id}">${location.zipcode}`;
      dropdown += `<img class="trash location-delete" src="https://cdn4.iconfinder.com/data/icons/social-messaging-ui-coloricon-1/21/52-512.png" alt="delete" data-delete-id=${location.id}></div>`;
    });
  } else {
    // eslint-disable-next-line max-len
    noLocationMessage += '<div>You dont have a location selected. Please add a new location.</div>';
    printFormToDom();
  }
  dropdown += '</div></div>';
  $('#dropdown-container').html(dropdown);
  $('#single-container').html(noLocationMessage);
};

const formBuilder = (location) => {
  const form = `
  <div class="text-center">
    <h2><label for="form-zip-code">Zip Code</label></h2>
    <input type="text" class="form-control text-center" value="${location.zipcode}" id="form-zip-code" placeholder="Type zip code here...">
  </div>
  `;
  return form;
};

const weatherPage = () => {
  const uid = authHelpers.getCurrentUid();
  weatherData.getAllLocations(uid)
    .then((locationsArray) => {
      buildDropdown(locationsArray);
      $('#background').attr('class', 'weatherHome');
    })
    .catch((error) => {
      console.error('error in getting friends', error);
    });
};

const deleteLocation = (e) => {
  // firebase id
  const idToDelete = e.target.dataset.deleteId;
  weatherData.deleteLocation(idToDelete)
    .then(() => {
      weatherPage();
      $('#single-container').html('');
      $('#forecast-container').html('');
    })
    .catch((error) => {
      console.error('error in deleting friend', error);
    });
};

const bindEvents = () => {
  $('body').on('click', '.get-single', getSingleLocation);
  $('body').on('click', '.trash', deleteLocation);
  $('body').on('click', '#show-location-form', printFormToDom);
  $('body').on('click', '#add-location', addNewLocation);
};

const initWeatherPage = () => {
  weatherPage();
  bindEvents();
};

const addNewLocation = () => {
  const newLocation = {
    isCurrent: false,
    userUid: authHelpers.getCurrentUid(),
    zipcode: $('#form-zip-code').val(),
  };
  weatherData.addNewLocation(newLocation)
    .then(() => {
      $('#add-edit-location').html('').show();
      $('#forecast-container').html('').show();
      // $('#weather').hide();
      initWeatherPage();
    })
    .catch((error) => {
      console.error('error', error);
    });
};


export default { initWeatherPage };
