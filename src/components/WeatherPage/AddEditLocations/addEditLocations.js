import $ from 'jquery';
import weatherData from '../../../data/weatherData';
import initWeatherPage from '../weatherPage';
import authHelpers from '../../../Helpers/authHelpers';
// import weatherApiData from '../../../../db/weatherApiKey.json';


const formBuilder = (location) => {
  const form = `
  <div class="text-center">
    <h2><label for="form-zip-code">Zip Code</label></h2>
    <input type="text" class="form-control text-center" value="${location.zipcode}" id="form-zip-code" placeholder="Type zip code here...">
  </div>
  `;
  return form;
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
  // if ($('#add-edit-location').style.display === '') {
  //   $('#show-location-form').textContent = '+';
  // } else {
  //   $('#show-location-form').textContent = '-';
  // }
};

// const logicForAddLocationToggle = () => {
//   if ($('#add-edit-location').style.display === '') {
//     $('#show-location-form').textContent = '+';
//   } else {
//     $('#show-location-form').textContent = '-';
//   }
// };

const gettingZipFromForm = () => {
  weatherData.getSingleWeatherData($('#form-zip-code').val())
    .then((result) => {
      const name = result[0].city_name;
      console.log(name);
      const location = {
        '':
    {
      isCurrent: false,
      userUid: authHelpers.getCurrentUid(),
      zipcode: $('#form-zip-code').val(),
    },
      };
      Object.city_name = name;
      return location;
    });
};

const addNewLocation = () => {
  const newLocation = gettingZipFromForm();
  weatherData.addNewLocation(newLocation)
    .then(() => {
      $('#add-edit-location').html('').show();
      // $('#weather').hide();
      initWeatherPage.initWeatherPage();
    })
    .catch((error) => {
      console.error('error', error);
    });
};

// const updateIsCurrent = (e) => {
//   const updatedIsCurrent = gettingZipFromForm();
//   const locationId = e.target.dataset.dropdownId;
//   weatherData.updateFriend(updatedIsCurrent, locationId)
//     .then(() => {

//       initializeWeatherPage.initializeWeatherPage();
//     })
//     .catch((error) => {
//       console.error('error', error);
//     });
// };

$('body').on('click', '#add-location', addNewLocation);
$('body').on('click', '#get-sing', addNewLocation);
// $('#show-location-form').on('click', logicForAddLocationToggle);

export default printFormToDom;
