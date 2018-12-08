import $ from 'jquery';


const initDashEvents = () => {
  $('.message-card').on('click', () => {
    $('#navbar-button-messages').trigger('click');
  });
  $('.event-card').on('click', () => {
    $('#navbar-button-events').trigger('click');
  });
  $('.article-card').on('click', () => {
    $('#navbar-button-articles').trigger('click');
  });
};

export default { initDashEvents };
