import $ from 'jquery';
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

const msgInput = () => {
  const domString = `<div id="chatbox"></div>
  <div>
    <input id="msg-input" type="text" placeholder="message..."/>
  </div>`;
  $('#messages').append(domString);
};

const initMsgPage = () => {
  msgInput();
  getMessages();
};

export default { initMsgPage };
