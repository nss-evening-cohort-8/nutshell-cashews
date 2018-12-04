import $ from 'jquery';
import weatherData from '../../../data/weatherData';
import initializeWeatherPage from '../weatherPage';
// import weatherApiData from '../../../../db/weatherApiKey.json';


const formBuilder = (location) => {
  const form = `
  <div class="">
    <label for="form-zip-code">Zip Code</label>
    <input type="text" class="form-control" value="${location.zipcode}" id="form-zip-code" placeholder="Type zip code here...">
  </div>
  `;
  return form;
};

const printFormToDom = () => {
  const emptyLocation = {
    zipcode: '',
  };

  let domString = '<h2 Add New Location</h2>';
  domString += formBuilder(emptyLocation);
  domString += '<button class="btn btn-primary" id="add-location">Save Location</button>';
  $('#add-edit-location').html(domString).show();
};

const gettingZipFromForm = () => {
  const location = {
    zipcode: $('#form-zip-code').val(),
  };
  // const zip = $('#form-zip-code').val();
  return location;
};

const addNewLocation = () => {
  const newLocation = gettingZipFromForm();
  weatherData.addNewLocation(newLocation)
    .then(() => {
      $('#add-edit-location').html('').show();
      $('#locations').hide();
      initializeWeatherPage();
    })
    .catch((error) => {
      console.error('error', error);
    });
};

$('component-here').on('click', '#add-location', addNewLocation);

export default printFormToDom;
