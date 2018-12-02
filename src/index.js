import 'bootstrap';
import $ from 'jquery';
import navbar from './components/navbar/navbar';
import showAddForm from './components/AddEditLocations/addEditLocations';
import './index.scss';

const initialize = () => {
  navbar.navBuilder();
  $('#show-location-form').on('click', showAddForm);
};

initialize();
