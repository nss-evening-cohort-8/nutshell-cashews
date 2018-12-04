import $ from 'jquery';
import messages from './messages';

const showMsg = () => {
  $('#navbar-button-messages').on('click', () => {
    messages.getMessages();
  });
};

export default { showMsg };
