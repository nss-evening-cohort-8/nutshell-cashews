import $ from 'jquery';
// import locationData from '../../data/weatherData';

const formBuilder = (location) => {
  const form = `
  <div class="">
    <label for="form-zip-code">Zip Code</label>
    <input type="text" class="form-control" value="${location.zip_code}" id="form-zip-code" placeholder="Type zip code here...">
  </div>
  `;
  return form;
};

const printFormToDom = () => {
  const emptyLocation = {
    zip_code: '',
  };

  let domString = '<h2 Add New Location</h2>';
  domString += formBuilder(emptyLocation);
  domString += '<button class="btn btn-primary" id="add-location">Save Location</button>';
  $('#add-edit-location').html(domString).show();
};

// const getttingZipFromForm = () => {
//   const location = {
//     zip_code: $('#form-zip-code').val(),
//   };
//   return location;
// };

// const addNewLocation = () => {
//   const newLocation = getttingZipFromForm();
//   locationData.addNewLocation(newLocation)
//     .then(() => {
//       $('#add-edit-location').html('').show();
//       $('#friends').hide();

//     })
//     .catch((error) => {
//       console.error('error', error);
//     });
// };

export default printFormToDom;
