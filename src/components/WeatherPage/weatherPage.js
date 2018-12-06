/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import $ from 'jquery';
import weatherData from '../../data/weatherData';
import authHelpers from '../../Helpers/authHelpers';
// import addEditLocations from '../WeatherPage/AddEditLocations/addEditLocations';

const printSingleLocation = (location) => {
  const locationString = `
    <div class="card mt-5 mr-4 ml-4 p-3 text-center">
      <h1>${location.city_name}</h1>
      <h3>${location.temp}</h3>
      <p>${location.pod === 'd' ? 'Day' : 'Night'}</p>
      <img src="https://www.weatherbit.io/static/img/icons/${location.weather.icon}.png">
      <p>${location.weather.description}</p>
      <div>
        <button class="btn btn-danger delete-btn" data-delete-id=${location.id}>X</button>
        <button class="btn btn-info edit-btn" data-edit-id=${location.id}>Edit</button>
      </div>    
    </div>
  `;
  $('#single-container').html(locationString);
  // if (current === false) {
  //   console.log('this is not current location');
  //   current = true;
  //   console.log(current);
  // } else {
  //   current = false;
  // }
};

const getSingleLocation = (e) => {
  // firebase id
  const locationId = e.target.dataset.dropdownId;
  // const uid = authHelpers.getCurrentUid();
  weatherData.getSingleLocation(locationId)
    .then((singleLocation) => {
      console.log(singleLocation);
      weatherData.makeLocationsFalse()
        .then(() => {
          weatherData.updatedIsCurrent(locationId, true)
            .then(() => {
              weatherData.getSingleWeatherData(singleLocation.zipcode)
                .then((result) => {
                  result.forEach((weatherObject) => {
                    printSingleLocation(weatherObject);
                  });
                  console.log(result);
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
      console.log(location);
      dropdown += `<div class="dropdown-item get-single" cursor="pointer" data-dropdown-id="${location.id}">${location.id}</div>`;
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
  console.log(e.target.dataset);
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
