import $ from 'jquery';

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

printFormToDom();

export default printFormToDom;
