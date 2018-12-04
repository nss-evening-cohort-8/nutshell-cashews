import $ from 'jquery';
import authHelpers from '../../Helpers/authHelpers';
import msgFactory from '../../Helpers/data/messageData/msgFactory';
import './messages.scss';

const printMessages = (msgObj) => {
  let domString = '<div>';
  $.each(msgObj, (key, value) => {
    const time = new Date(value.timestamp);
    domString += `<p>${value.message}</p>
    <p>${time}</p>`;
  });
  domString += '</div>';
  $('#chatbox').append(domString);
};

const getMessages = () => {
  msgFactory.msgGetter()
    .then((data) => {
      printMessages(data);
    })
    .catch((error) => {
      console.error(error);
    });
};

const newMsg = () => {
  const msgObject = {
    userUid: authHelpers.getCurrentUid(),
    message: $('#msg-input').val(),
    timestamp: Date.now(),
    isEdited: false,
  };
  return msgObject;
};

const msgInput = () => {
  const domString = `<div id="chatbox"></div>
  <div>
    <input id="msg-input" type="text" placeholder="message..."/>
    <button id="submit-message">Submit</button>
  </div>`;
  $('#messages').append(domString);
  $('#submit-message').on('click', () => {
    msgFactory.msgPoster(newMsg());
    getMessages();
  });
};

const initMsgPage = () => {
  msgInput();
  getMessages();
};

export default { initMsgPage };
