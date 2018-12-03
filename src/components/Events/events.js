import $ from 'jquery';
import eventsData from './eventsData';

const eventsPrinter = (eventsArray) => {
  let eventsCards = '';
  eventsArray.forEach((event) => {
    eventsCards += `
        <h3>${event.event}</h3>
        <h3>${event.startDate}</h3>
        <h3>${event.location}</h3>
        `;
  });
  $('#event-div').html(eventsCards);
};

const eventsPage = () => {
  eventsData.getAllEvents()
    .then((eventsArray) => {
      eventsPrinter(eventsArray);
    })
    .catch((error) => {
      console.log('error in getting events', error);
    });
};

const intializeEventsPage = () => {
  eventsPage();
};

export default intializeEventsPage;
