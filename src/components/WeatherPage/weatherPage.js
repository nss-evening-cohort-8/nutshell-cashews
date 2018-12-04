/* eslint-disable max-len */
import $ from 'jquery';
import weatherData from '../../data/weatherData';
import authHelpers from '../../Helpers/authHelpers';

const printSingleLocation = (location) => {
  const locationString = `
    <div>
      <h1>${location.city_name}</h1>
      <h3>${location.temp}</h3>
      <p>${location.pod}</p>
      <div>
        <button class="btn btn-danger delete-btn" data-delete-id=${location.id}>X</button>
        <button class="btn btn-info edit-btn" data-edit-id=${location.id}>Edit</button>
      </div>    
    </div>
  `;
  $('#component-here').html(locationString);
};

const getSingleLocation = (e) => {
  // firebase id
  const locationId = e.target.dataset.dropdownId;
  // const uid = authHelpers.getCurrentUid();
  console.log(locationId);
  weatherData.getSingleLocation(locationId)
    .then((singleLocation) => {
      printSingleLocation(singleLocation);
    })
    .catch((error) => {
      console.error('error in getting one friend', error);
    });
};

// const buildDropdown = (locationsArray) => {
//   let noLocationMessage = '';
//   let dropdown = `<div class="dropdown">
//   <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//     Pick a Location
//   </button>
//   <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">`;
//   if (locationsArray.length) {
//     locationsArray.forEach((location) => {
//       dropdown += `<div class="dropdown-item get-single" data-dropdown-id="${location.id}">${location.id}</div>`;
//     });
//   } else {
// eslint-disable-next-line max-len
//     noLocationMessage += '<div>You dont have a location selected. Enter a new zip code to pick a new location.</div>';
//   }
//   dropdown += '</div></div>';
//   $('#dropdown-container').html(dropdown);
//   $('#component-here').html(noLocationMessage);
// };

const buildLocationButtons = (locationsArray) => {
  let noLocationMessage = '';
  let dropdown = `
    <div>`;
  if (locationsArray.length) {
    locationsArray.forEach((location) => {
      dropdown += `<div class="btn btn-secondary get-single" data-id="${location.id}">${location.id}</div>`;
    });
  } else {
    noLocationMessage += '<div>You dont have a location selected. Enter a new zip code to pick a new location.</div>';
  }
  dropdown += '</div>';
  $('#dropdown-container').html(dropdown);
  $('#component-here').html(noLocationMessage);
};

const weatherPage = () => {
  const uid = authHelpers.getCurrentUid();
  weatherData.getAllLocations(uid)
    .then((locationsArray) => {
      console.log(locationsArray);
      // buildDropdown(locationsArray);
      buildLocationButtons(locationsArray);
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
      $('#component-here').html('');
    })
    .catch((error) => {
      console.error('error in deleting friend', error);
    });
};

const bindEvents = () => {
  $('body').on('click', '.get-single', getSingleLocation);
  $('body').on('click', '.delete-btn', deleteLocation);
};

const initializeWeatherPage = () => {
  weatherPage();
  bindEvents();
};

export default { initializeWeatherPage };
