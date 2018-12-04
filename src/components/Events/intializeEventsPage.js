import bindEvents from './addEditEvents';
import eventsPage from './events';

const intializeEvents = () => {
  eventsPage();
  bindEvents();
};

export default intializeEvents;
